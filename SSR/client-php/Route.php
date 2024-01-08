<?php

namespace SSR;

use SSR\Helpers\Routes\PathMatcher;
use SSR\Helpers\Routes\RouteItem;

class BlacklistItem
{
  public function __construct(
    public string $pattern,
    public ?string $method
  ) {
  }
}

class QueryBlacklistItem
{
  public function __construct(
    public string $key,
    public $predicate,
    public ?string $method
  ) {
  }
  public function executeCallback($value)
  {
    if (is_array($this->predicate) && count($this->predicate) === 2) {
      $className = $this->predicate[0];
      $methodName = $this->predicate[1];
      if (class_exists($className) && method_exists($className, $methodName)) {
        $instance = new $className();
        return call_user_func([$instance, $methodName], $value, $this);
      }
    } elseif (is_callable($this->predicate)) {
      return call_user_func($this->predicate, $value, $this);
    }
    return true;
  }
}

final class Route
{
  public const GET = "get";
  public const POST = "post";
  public const DELETE = "delete";
  public const PATCH = "patch";
  public const PUT = "put";
  public const HEAD = "head";
  public const OPTIONS = "options";
  public const TRACE = "trace";
  public const CONNECT = "connect";
  public const INDEX_PAGE = "index-page";

  protected static string $prefix = "";

  protected static ?RouteItem $route = null;
  /**
   * @var BlacklistItem[] $blacklist Array of BlacklistItem objects
   */
  private static array $blacklist = [];

  /**
   * @var QueryBlacklistItem[] $blacklist Array of BlacklistItem objects
   */
  private static array $blacklistQuery = [];

  private static bool $isCustomPagesChecked = false;

  public static function isRouteSetted()
  {
    return !is_null(self::$route);
  }

  /**
   * This property is for internal use only and should not be accessed directly.
   *
   * @return mixed
   */
  public static function executeRoute()
  {
    return static::$route->executeCallback();
  }

  /**
   * This property is for internal use only and should not be accessed directly.
   *
   * @return mixed
   */
  public static function getRoutePattern()
  {
    return self::$route->match->pattern;
  }

  /**
   * This property is for internal use only and should not be accessed directly.
   *
   * @return mixed
   */
  public static function getRoute()
  {
    return self::$route;
  }

  public static function prefix(string $prefix)
  {
    $prefix = trim($prefix, ' /');
    self::$prefix = '/' . $prefix;
  }

  static public function group($prefix, $callback = null)
  {
    if (is_callable($prefix)) {
      return $prefix();
    }

    $oldPrefix = self::$prefix;

    self::$prefix = trim(self::$prefix, ' /');

    $prefix = trim($prefix, ' /');
    self::$prefix .= ($prefix ? '/' . $prefix : '');

    if ($callback && is_callable($callback)) {
      $callback();
    }

    self::$prefix = $oldPrefix;
  }

  public static function getParsedUrl()
  {
    return parse_url(static::getUrl());
  }

  public static function getUrl()
  {
    return isset($_SERVER['REQUEST_URI']) ? $_SERVER['REQUEST_URI'] : '';
  }

  private static function getParentsRoute(int $id, array $pages)
  {
    foreach ($pages as $page) {
      if ($page->ID === $id) {
        $route = "/" . $page->post_name;

        if ($page->post_parent !== 0) {
          $route = static::getParentsRoute($page->post_parent, $pages) . $route;
        }

        return $route;
        break;
      }
    }

    return "";
  }

  public static function getCustomPages(): array
  {
    $pages = get_posts([
      "post_type" => "page",
      "post_status" => "publish",
    ]);

    $result = [];

    foreach ($pages as $page) {
      if ($page->post_name === "home") {
        continue;
      }

      $route = '/' . $page->post_name;

      if ($page->post_parent !== 0) {
        $route = static::getParentsRoute($page->post_parent, $pages) . $route;
      }

      $result[] = [
        'ID' => $page->ID,
        'content' => preg_replace('/<!--.*?-->/', '', $page->post_content),
        'title' => $page->post_title,
        'route' => $route,
      ];
    }

    return $result;
  }

  private static function checkCustomPages()
  {
    self::$isCustomPagesChecked = true;

    $pages = static::getCustomPages();

    $requestMethod = strtolower(trim($_SERVER['REQUEST_METHOD']));
    $parsedUrl = static::getParsedUrl();

    if ($requestMethod !== static::GET) return null;

    foreach ($pages as $page) {
      $pattern = "/:lng?" . $page['route'];
      $pathMatch = PathMatcher::matchPath($pattern, $parsedUrl['path']);

      if ($pathMatch) {
        self::$route = new RouteItem(function () use ($page) {
          return render(
            [
              'title' => $page['title'],
              'content' => $page['content'],
              'page_id' => $page['ID']
            ],
            options: ['handleLanguage' => false]
          );
        }, $pathMatch);
        return;
      }
    }
  }

  public static function route(string $pattern, callable|array $handler, string $method = null)
  {
    if (!static::$isCustomPagesChecked) static::checkCustomPages();
    if (!is_null(self::$route)) return;

    $isIndex = false;
    if ($pattern === self::INDEX_PAGE) {
      $pattern = "/";
      $isIndex = true;
    }

    $pattern = "/" . trim(self::$prefix, " /") . "/" . trim($pattern, " /");
    $parsedUrl = static::getParsedUrl();

    $requestMethod = strtolower(trim($_SERVER['REQUEST_METHOD']));

    foreach (self::$blacklist as $item) {
      $pathMatch = PathMatcher::matchPath($item->pattern, $parsedUrl['path']);
      if (!is_null($pathMatch)) {
        if ($item->method === null || $item->method === $requestMethod) return;
      }
    }

    foreach (self::$blacklistQuery as $item) {
      $value = $_GET[$item->key] ?? null;
      if (is_null($value)) continue;
      if ($item->executeCallback($value)) {
        if ($item->method === null || $item->method === $requestMethod) return;
      }
    }

    $pathMatch = PathMatcher::matchPath($pattern, $parsedUrl['path']);
    if (is_null($pathMatch)) return;

    if ($isIndex) {
      $lng = $pathMatch->params["lng"] ?? null;

      if (!empty($lng)) {
        if (!in_array($lng, Config::getValidLanguages())) {
          return;
        }
      }

      if ($method === null || $requestMethod === $method) {
        self::$route = new RouteItem($handler, $pathMatch);
      }
    } else {
      if ($method === null || $requestMethod === $method) {
        self::$route = new RouteItem($handler, $pathMatch);
      }
    }
  }

  public static function blacklist(string $pattern, string $method = null)
  {
    self::$blacklist[] = new BlacklistItem($pattern, $method);
  }

  public static function blacklistByQuery(string $queryKey, callable $predicate = null, string $method = null)
  {
    self::$blacklistQuery[] = new QueryBlacklistItem($queryKey, $predicate ?? fn () => true, $method);
  }

  public static function get(string $pattern, callable|array $handler)
  {
    return self::route($pattern, $handler, self::GET);
  }

  public static function post(string $pattern, callable|array $handler)
  {
    return self::route($pattern, $handler, self::POST);
  }

  public static function patch(string $pattern, callable|array $handler)
  {
    return self::route($pattern, $handler, self::PATCH);
  }

  public static function put(string $pattern, callable|array $handler)
  {
    return self::route($pattern, $handler, self::PUT);
  }

  public static function delete(string $pattern, callable|array $handler)
  {
    return self::route($pattern, $handler, self::DELETE);
  }

  public static function head(string $pattern, callable|array $handler)
  {
    return self::route($pattern, $handler, self::HEAD);
  }

  public static function options(string $pattern, callable|array $handler)
  {
    return self::route($pattern, $handler, self::OPTIONS);
  }

  public static function trace(string $pattern, callable|array $handler)
  {
    return self::route($pattern, $handler, self::TRACE);
  }

  public static function connect(string $pattern, callable|array $handler)
  {
    return self::route($pattern, $handler, self::CONNECT);
  }
}
