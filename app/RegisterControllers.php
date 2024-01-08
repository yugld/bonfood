<?php

declare(strict_types=1);

namespace App;

class RegisterControllers
{
  /** @var array<Controller> */
  private static array $controllers = [];

  public static function register(): void
  {
    foreach (self::$controllers as $controller) {
      new $controller();
    }
  }
}
