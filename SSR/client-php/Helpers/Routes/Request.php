<?php

namespace SSR\Helpers\Routes;

use Exception;

class Request
{
  function __construct(
    public array $params,
    private ?array $body = null,
    private ?array $query = null,
  ) {
    $this->body = $_POST;
    $this->query = $_GET;

    $contentType = $_SERVER['CONTENT_TYPE'] ?? '';

    if (strpos($contentType, 'application/json') !== false) {
      try {
        $jsonBody = file_get_contents('php://input');
        $this->body = json_decode($jsonBody, true);

        if (json_last_error() !== JSON_ERROR_NONE) {
          throw new Exception('Error parsing JSON data');
        }
      } catch (Exception $e) {
        return null;
      }
    }
  }

  public function getRequestMethod()
  {
    return strtoupper(trim($_SERVER['REQUEST_METHOD']));
  }

  /**
   * @return array{scheme:string, host:string, port:int, user:string, pass:string, query:string, path:string, fragment:string}|string|int|null|false
   */
  public function getRequestURLParsed()
  {
    return parse_url($this->getRequestURL());
  }

  public function getRequestURL()
  {
    return isset($_SERVER['REQUEST_URI']) ? $_SERVER['REQUEST_URI'] : '';
  }

  public function body(string|array|null $keys = null, $defaults = null)
  {
    return $this->getValuesFromArray($this->body, $keys, $defaults);
  }

  public function query(string|array|null $keys = null, $defaults = null)
  {
    return $this->getValuesFromArray($this->query, $keys, $defaults);
  }

  public function param(string|array|null $keys = null, $defaults = null)
  {
    return $this->getValuesFromArray($this->params, $keys, $defaults);
  }

  private function getValuesFromArray(array $array, string|array|null $keys, $defaults = null)
  {
    if ($keys === null) {
      return $array;
    }

    if (is_array($keys)) {
      return array_map(function ($key, $i) use ($array, $defaults) {
        return $array[$key] ?? (is_array($defaults) ? ($defaults[$i] ?? null) : $defaults);
      }, $keys, array_keys($keys));
    }

    return $array[$keys] ?? (is_array($defaults) ? ($defaults[$keys] ?? null) : $defaults);
  }
}
