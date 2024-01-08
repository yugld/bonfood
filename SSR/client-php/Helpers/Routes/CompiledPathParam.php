<?php

namespace SSR\Helpers\Routes;

class CompiledPathParam
{
  public string $paramName;
  public bool $isOptional;

  public function __construct(string $paramName, bool $isOptional = false)
  {
    $this->paramName = $paramName;
    $this->isOptional = $isOptional;
  }
}
