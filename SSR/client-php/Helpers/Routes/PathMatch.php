<?php

namespace SSR\Helpers\Routes;


class PathMatch
{
  public function __construct(
    public array $params,
    public string $matchedPathname,
    public mixed $pathnameBase,
    public mixed $pattern,
  ) {
  }
}
