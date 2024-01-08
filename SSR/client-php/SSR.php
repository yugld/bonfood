<?php

namespace SSR;

use Exception;
use SSR\Helpers\HTTP\HttpGateway;
use SSR\Helpers\Interfaces\Response;
use SSR\Helpers\RedirectIfLanguageNotValid;
use SSR\Helpers\Responses\ErrorRenderServerResponse;
use SSR\Helpers\Responses\JsonResponse;
use SSR\Helpers\Responses\RenderResponse;
use SSR\Helpers\Responses\RenderServerResponse;

final class SSR
{
  private static ?RenderServerResponse $response = null;
  private static ?string $page = null;
  private static ?array $data = null;
  private static ?array $headTags = [];
  private static ?string $csrf = null;

  public static function setPage(string $page)
  {
    self::$page = $page;
  }

  public static function getCSRF()
  {
    if (is_null(static::$csrf)) static::$csrf = wp_create_nonce("init");

    return self::$csrf;
  }

  public static function ensureRouteInitialized()
  {
    if (!is_null(self::$response)) return;
    if (!Route::isRouteSetted()) return;

    $response = Route::executeRoute();

    if ($response instanceof JsonResponse) {
      status_header($response->getCode());
      header('Init: success');

      $res = $response->getResponse();

      if (isset($res['res-type']) && $res['res-type'] === "scripts") {
        header('Content-Type: application/javascript');
        echo $res['content'];
        die();
      } else {
        header('Content-Type: application/json');
        echo json_encode($res);
        die();
      }
    }

    if ($response instanceof RenderResponse) {
      status_header($response->getCode());
      self::render($response->getResponse(), $response->getPage(), $response->getOptions());
      return;
    }

    $pattern = Route::getRoutePattern();

    if (is_array($pattern)) $pattern = $pattern['path'] ?? "\"Not Found\"";
    if (is_null(self::$response)) throw new Exception("Route for pattern {$pattern} is not initialized! Make sure you returned render or response in handler for this route!");
  }

  public static function getHead(): string
  {
    static::ensureRouteInitialized();
    return self::$response->head . implode("\n", static::$headTags);
  }

  public static function addHeadTag(string $headTag)
  {
    static::$headTags[] = $headTag;
  }

  public static function getBody(): string
  {
    static::ensureRouteInitialized();
    return self::$response->body;
  }

  private static function render(array $props, ?string $page, ?array $options = [])
  {
    if (empty($page) && empty(self::$page)) {
      throw new Exception("Before render you need to initialize page in SSR class! Or just pass page as second prop to render!");
    }

    $code = null;

    if ($options['handleLanguage'] ?? true) {
      $code = RedirectIfLanguageNotValid::check(Route::getRoute());
    }

    if (is_numeric($code)) {
      status_header($code);
    }

    MetaData::initializeMetaItems();

    self::$data = [
      "component" => $page ?? self::$page,
      "props" => $props,
      "location" => self::getLocation(),
      "csrfToken" => wp_create_nonce("init"),
      "origin" => get_site_url(),
      "meta" => MetaData::getMetaData(),
    ];

    if (function_exists("getallheaders")) {
      $InitHeader = getallheaders()['Init'] ?? null;
      if ($InitHeader == "raw") {
        status_header(200);
        header('Init: success');
        header('Content-Type: application/json');
        echo json_encode([
          'props' => $props,
          "component" => $page ?? self::$page,
          "location" => self::getLocation(),
        ]);
        die();
      }
    }

    $response = HttpGateway::dispatch(self::$data);

    if (is_null($response) || $response instanceof ErrorRenderServerResponse) {
      if ($response instanceof ErrorRenderServerResponse) {
        self::$data['errorMessage'] = $response->message;
      }

      self::$response = self::getDefaultResponse(self::$data);
    } else {
      self::$response = $response;
    }
  }

  public static function getReactRefresh(): void
  {
    $vitePort = getenv('VITE_PORT') ?: 5173;

    $prepended = "
    <script type=\"module\" defer>
      import RefreshRuntime from \"http://localhost:{$vitePort}/@react-refresh\"
      RefreshRuntime.injectIntoGlobalHook(window)
        window.\$RefreshReg$ = () => {}
        window.\$RefreshSig$ = () => (type) => type
        window.__vite_plugin_react_preamble_installed__ = true
    </script>
    ";

    $isWatch = getenv('WATCH') === 'true' && is_array(wp_remote_get('http://localhost:5173/'));
    echo $isWatch ? $prepended : '';
  }

  private static function getDefaultResponse(array $data): Response
  {
    $initialPage = htmlspecialchars(json_encode($data), ENT_QUOTES, 'UTF-8');
    $page = $data['page'] ?? "Init";
    return new RenderServerResponse(
      "<title init>{$page}</title>",
      "<init-app data-page=\"{$initialPage}\"></init-app>"
    );
  }

  private static function getLocation()
  {
    $parsedUrl = Route::getParsedUrl();

    $path = isset($parsedUrl['path']) ? $parsedUrl['path'] : '';
    $queryString = isset($parsedUrl['query']) ? $parsedUrl['query'] : '';

    $location = $path;
    if ($queryString) {
      $location .= '?' . $queryString;
    }

    return $location;
  }
}
