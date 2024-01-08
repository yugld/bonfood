<?php

declare(strict_types=1);
/**
 * Автозагрузка классов
 */
spl_autoload_register(static function ($class): void {
  $prefixes = [
    'App\\' => __DIR__ . '/',
    'AppInit\\' => __DIR__ . '/init/',
  ];

  foreach ($prefixes as $prefix => $base_dir) {
    if (strpos($class, $prefix) === 0) {
      $relative_class = substr($class, strlen($prefix));
      $file = $base_dir . str_replace('\\', '/', $relative_class) . '.php';

      if (file_exists($file)) {
        require $file;
        return;
      }
    }
  }
});

require_once 'libs/intervention-image/autoload.php';
