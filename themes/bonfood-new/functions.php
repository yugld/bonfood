<?php

use SSR\Route;

$initPath = dirname(__DIR__) . "/init/initializer.php";

if (file_exists($initPath)) {
  require_once $initPath;
  require_once SERVER_ROOT . '/app/index.php';
}

$pathToChildVite = __DIR__ . '/inc/vite.php';

if (Route::isRouteSetted()) {
  if (file_exists($pathToChildVite)) {
    require_once $pathToChildVite;
  }
}
