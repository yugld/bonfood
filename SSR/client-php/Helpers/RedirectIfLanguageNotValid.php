<?php

namespace SSR\Helpers;

use SSR\Config;
use SSR\Helpers\Routes\RouteItem;

class RedirectIfLanguageNotValid
{
  public static function check(RouteItem $route)
  {
    /*========CHECK FOR LANGUAGE IN ROUTE========*/
    if (PHP_SAPI !== 'cli') {
      $isValidLanguage = function (?string $lang) {
        return in_array($lang,  Config::getValidLanguages());
      };

      $pathMatch = $route->match;

      if (strpos($pathMatch->pattern['path'], '/:lng?') !== 0) {
        return;
      }

      $defaultLanguage = Config::getDefaultLanguage();

      $lng = $pathMatch->params['lng'];
      $pattern = $pathMatch->pattern['path'];
      $rest = preg_replace('/^\/:lng\?/', '', $pattern);
      if (!$isValidLanguage($lng)) {
        $lng = $_COOKIE['lang'] ?? $defaultLanguage;
        if (!isset($_COOKIE['lang'])) {
          setcookie('lang', $defaultLanguage, time() + 365 * 24 * 60 * 60, '/');
        }
      }
      if ($pathMatch->params['lng'] === $defaultLanguage) {
        setcookie('lang', $defaultLanguage, time() + 365 * 24 * 60 * 60, '/');
        $toRedirect = $rest;
        $toRedirect .= isset($parsedUrl['query']) ? '?' . $parsedUrl['query'] : '';
        header("Location: {$toRedirect}");
        exit;
      }

      if (!$isValidLanguage($pathMatch->params['lng'] ?? $defaultLanguage) && $pathMatch->params['lng'] !== "not-found") {
        return 404;
      }

      if (($pathMatch->params['lng'] ?? $defaultLanguage) !== $lng && $pathMatch->params['lng'] !== "not-found") {
        $toRedirect = "/" . $lng . ($rest);
        $toRedirect .= isset($parsedUrl['query']) ? '?' . $parsedUrl['query'] : '';
        header("Location: {$toRedirect}");
        exit;
      }
    }
  }
}
