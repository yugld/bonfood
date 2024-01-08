<?php
spl_autoload_register(function ($className) {
  $baseDir = __DIR__ . '/';
  $className = str_replace('\\', DIRECTORY_SEPARATOR, $className);
  $className = preg_replace('/^SSR\//', '', $className);
  $file = $baseDir . $className . '.php';

  if (file_exists($file)) {
    require $file;
  }
});

require_once __DIR__ . DIRECTORY_SEPARATOR . "helpers.php";
