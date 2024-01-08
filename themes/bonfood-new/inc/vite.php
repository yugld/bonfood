<?php

declare(strict_types=1);

/**
 * Vite - загружает активы темы
 */

$PROJECT = 'bonfood-new';

add_action('wp_enqueue_scripts', function () use ($PROJECT): void {

  // Получить путь к файлу манифеста в папке темы.
  $manifestPath = get_theme_file_path('bundle/manifest.json');

  // Если среда разработки является локальной и запущен Vite.js, подключаем ресурсы с локального сервера.
  if (wp_get_environment_type() === 'local' && getenv('WATCH') === 'true' && is_array(wp_remote_get('http://localhost:5173/'))) {
    $vitePort = getenv('VITE_PORT') ?: 5173;
    wp_enqueue_script('vite', "http://localhost:{$vitePort}/@vite/client", [], null);
    wp_enqueue_script('main_' . $PROJECT, "http://localhost:{$vitePort}/themes/{$PROJECT}/src/main.ts", [], null);
    wp_enqueue_style('maincss_' . $PROJECT, "http://localhost:{$vitePort}/themes/{$PROJECT}/src/main.css", [], null);

    // Если существует файл манифеста, загружаем ресурсы, используя данные из манифеста.
  } elseif (file_exists($manifestPath)) {
    // Прочитать и разобрать содержимое манифеста в массив.
    $manifest = json_decode(file_get_contents($manifestPath), true);

    // Если существует ключ 'src/js/main.ts' в манифесте.
    if (isset($manifest["themes/{$PROJECT}/src/main.ts"]['file'])) {
      $mainScriptPath = get_theme_file_uri('bundle/' . $manifest["themes/{$PROJECT}/src/main.ts"]['file']);
      wp_enqueue_script('main_' . $PROJECT, $mainScriptPath, [], null);
    }

    // Если существует ключ 'src/styles/main.css' в манифесте.
    if (isset($manifest["themes/{$PROJECT}/src/main.css"]['file'])) {
      $mainCssPath = get_theme_file_uri('bundle/' . $manifest["themes/{$PROJECT}/src/main.css"]['file']);
      wp_enqueue_style('maincss_' . $PROJECT, $mainCssPath, [], null);
    }
  }
});

/**
 * Фильтр для изменения тегов скриптов 'vite' и 'main' на модульные скрипты с отложенной загрузкой.
 *
 * @param string $tag       Текущий тег скрипта.
 * @param string $handle    Идентификатор скрипта.
 * @param string $src       Источник скрипта.
 *
 * @return string           Измененный тег скрипта.
 */
add_filter('script_loader_tag', function (string $tag, string $handle, string $src) use ($PROJECT) {

  // Проверяем, является ли скрипт 'vite' или 'main'.
  if (in_array($handle, ['vite', 'main_' . $PROJECT])) {
    // Если да, создаем новый тег скрипта с модульным типом и отложенной загрузкой.
    return '<script type="module" src="' . esc_url($src) . '" defer></script>';
  }

  // Возвращаем исходный тег скрипта для других скриптов.
  return $tag;
}, 10, 3);
