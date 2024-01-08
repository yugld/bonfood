<?php

use SSR\Helpers\Responses\JsonResponse;
use SSR\Helpers\Responses\RenderResponse;

if (!function_exists("render")) {
  function render(array $props = [], int $code = 200, string $view = null, array $options = [])
  {
    return new RenderResponse($view, $props, $code, $options);
  }
}

if (!function_exists("jsonResponse")) {
  function jsonResponse($response = [], int $code = 200)
  {
    return new JsonResponse($response, $code);
  }
}
