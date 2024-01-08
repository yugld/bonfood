<?php

declare(strict_types=1);

use AppInit\Utils\Vite;

Vite::assetsLoader(
  ['app/src/scripts/main.ts', 'app_scripts'],
  ['app/src/styles/main.css', 'app_styles'],
  [],
  'app',
  'wp_enqueue_scripts'
);

Vite::tagLoader(['app_scripts']);

/**
 * Инициализация контроллеров
 */
App\RegisterControllers::register();
