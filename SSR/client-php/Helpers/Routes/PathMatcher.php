<?php

namespace SSR\Helpers\Routes;

use SSR\Helpers\DecodeURI;

class PathMatcher
{
  public static function matchPath(string $pattern, string $pathname): ?PathMatch
  {
    if (is_string($pattern)) {
      $pattern = ['path' => $pattern, 'caseSensitive' => false, 'end' => true];
    }

    [$matcher, $compiledParams] = PathCompiler::compilePath($pattern['path'], $pattern['caseSensitive'], $pattern['end']);

    mb_regex_encoding('UTF-8');
    mb_regex_set_options($matcher->flags ?? "");
    if (!mb_ereg($matcher->pattern, $pathname, $match)) {
      return null;
    }

    $matchedPathname = $match[0];
    $pathnameBase = mb_ereg_replace('(.)\/+$', '\\1', $matchedPathname);
    $captureGroups = array_slice($match, 1);

    $params = [];

    foreach ($compiledParams as $index => $param) {
      if ($param->paramName === "*") {
        $splatValue = $captureGroups[$index] ?? "";
        $pathnameBase = mb_ereg_replace('(.)\/+$', '\\1', mb_substr($matchedPathname, 0, mb_strlen($matchedPathname) - mb_strlen($splatValue)));
      }

      $value = $captureGroups[$index] ?? null;

      if ($param->isOptional && !$value) {
        $params[$param->paramName] = null;
      } else {
        $params[$param->paramName] = DecodeURI::safelyDecodeURIComponent($value ?: "", $param->paramName);
      }
    }

    return new PathMatch($params, $matchedPathname, $pathnameBase, $pattern);
  }
}
