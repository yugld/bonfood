<?php

namespace SSR\Helpers\Routes;

use SSR\Helpers\Responses\JsonResponse;
use SSR\Helpers\Responses\RenderResponse;

class RouteItem
{
  public function __construct(
    public $handler,
    public PathMatch $match,
  ) {
  }

  public function executeCallback()
  {
    $params = $this->match->params;
    $request = new Request($params);

    if (is_array($this->handler) && count($this->handler) === 2) {
      $className = $this->handler[0];
      $methodName = $this->handler[1];

      if (class_exists($className) && method_exists($className, $methodName)) {
        $instance = new $className();
        $result = call_user_func([$instance, $methodName], $request);
      }
    } elseif (is_callable($this->handler)) {
      $result = call_user_func($this->handler, $request);
    } else {
      $result = $this->handler;
    }

    if ($result instanceof JsonResponse || $result instanceof RenderResponse) {
      return $result;
    }

    return new JsonResponse($result);
  }
}
