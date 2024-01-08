<?php

namespace SSR\Helpers\Routes;

class Regex
{
  public string $pattern;
  public ?string $flags;

  public function __construct(string $pattern, ?string $flags)
  {
    $this->pattern = $pattern;
    $this->flags = $flags;
  }
}

class PathCompiler
{
  public static function compilePath(string $path, bool $caseSensitive = false, bool $end = true): array
  {
    mb_regex_encoding('UTF-8');
    // Warning message
    // if ($path === "*" || !self::endsWith($path, "*") || self::endsWith($path, "/*")) {
    //   echo "Warning: ";
    //   echo 'Route path "' . $path . '" will be treated as if it were "' .
    //     str_replace("*$", "/*", $path) . '" because the `*` character must ' .
    //     'always follow a `/` in the pattern. To get rid of this warning, ' .
    //     'please change the route path to "' . str_replace("*$", "/*", $path) . '".';
    //   echo "\n";
    // }

    // Initialize params array and regexpSource
    $params = [];
    $regexpSource = "^" . self::mbEregReplace(
      [
        '\/*\*?$', // Ignore trailing / and /*, we'll handle it below
        '^\/+', // Make sure it has a leading /
        '[\\\\\\.\\*\\+\\^\\$\\{\\}\\|\\(\\)\\[\\]]', // Escape special regex chars
        '\/:(\w+)(\?)?',
      ],
      [
        '',
        '/',
        '\\\\0',
        function ($matches) use (&$params) {
          $paramName = $matches[1];
          $isOptional = isset($matches[2]) && $matches[2] === "?";
          $params[] = new CompiledPathParam($paramName, $isOptional);
          return $isOptional ? '/?([^\\/]+)?' : '/([^\\/]+)';
        },
      ],
      $path
    );

    // Handle path ending with '*'
    if (self::endsWith($path, "*")) {
      $params[] = new CompiledPathParam("*");
      $regexpSource .=
        $path === "*" || $path === "/*"
        ? "(.*)$" // Already matched the initial /, just match the rest
        : "(?:\\/(.+)|\\/*)$"; // Don't include the / in params["*"]
    } elseif ($end) {
      // When matching to the end, ignore trailing slashes
      $regexpSource .= "\\/*$";
    } elseif ($path !== "" && $path !== "/") {
      // If our path is non-empty and contains anything beyond an initial slash,
      // then we have _some_ form of path in our regex, so we should expect to
      // match only if we find the end of this path segment.
      $regexpSource .= "(?:(?=\\/|$))";
    } else {
      // Nothing to match for "" or "/"
    }

    // Create and return the matcher and params array
    $matcher = new Regex($regexpSource, $caseSensitive ? null : "i");
    return [$matcher, $params];
  }

  // Helper function to check if a string ends with a specific substring
  private static function endsWith(string $haystack, string $needle): bool
  {
    return mb_substr($haystack, -mb_strlen($needle)) === $needle;
  }

  // Helper function to replace using mb_ereg_replace
  private static function mbEregReplace(array $patterns, array $replacements, string $subject): string
  {
    foreach ($patterns as $index => $pattern) {

      $subject = is_callable($replacements[$index])
        ? mb_ereg_replace_callback($pattern, $replacements[$index], $subject)
        : mb_ereg_replace($pattern, $replacements[$index], $subject); // line 91
    }
    return $subject;
  }

  public static function stripBasename($pathname, $basename)
  {
    if ($basename === "/") {
      return $pathname;
    }

    if (strtolower(substr($pathname, 0, strlen($basename))) !== strtolower($basename)) {
      return null;
    }

    // We want to leave trailing slash behavior in the user's control, so if they
    // specify a basename with a trailing slash, we should support it
    $startIndex = $basename[strlen($basename) - 1] === "/" ? strlen($basename) - 1 : strlen($basename);
    $nextChar = $pathname[$startIndex] ?? null;

    if ($nextChar && $nextChar !== "/") {
      // pathname does not start with basename/
      return null;
    }

    return substr($pathname, $startIndex) ?: "/";
  }
}
