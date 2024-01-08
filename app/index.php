<?php

declare(strict_types=1);

require_once 'session.php';

require_once 'autoloader.php';

use AppInit\Utils\InitOptions;
use AppInit\Utils\Vite;
use SSR\Config;
use SSR\Route;
use SSR\SSR;

$pathToWPFromRoot = 'www';

define('WORDPRESS_ROOT', SERVER_ROOT . $pathToWPFromRoot . DIRECTORY_SEPARATOR);
define('APP_ROOT', __DIR__);

function storage(string $path)
{
  return APP_ROOT . DIRECTORY_SEPARATOR . "storage" . DIRECTORY_SEPARATOR . trim($path, " " . DIRECTORY_SEPARATOR);
}

require_once 'image-loader.php';

// use AppInit\Admin\Controllers\ProductController;

$excludeControllers = InitOptions::getInstance()->getExcludeList();
$excludeControllers->excludeController([
  // ProductController::class => [
  //   ProductController::$TAXONOMY,
  // ],
]);

function scriptReloader(): void
{
  Vite::getViteReloader();
}

add_action('admin_head', 'scriptReloader', 0);

add_action('init', 'custom_login');
function custom_login(): void
{
  global $pagenow;
  if ($pagenow === 'wp-login.php') {
    wp_redirect('/login');
    exit;
  }
}

function customize_admin_bar(): void
{
  global $wp_admin_bar;

  $logout_url = home_url('/api/auth/logout?from=wp&csrf=' . wp_create_nonce('init'));
  $logout = $wp_admin_bar->get_node('logout');
  $logout->href = $logout_url;
  $wp_admin_bar->remove_node($logout->id);
  $wp_admin_bar->add_node($logout);
}

add_action('wp_before_admin_bar_render', 'customize_admin_bar');

require_once 'init/index.php';
// other
require_once 'functions.php';

Config::setValidLanguages(['kz', 'ru']);

/*========REQUIRE BLACKLIST========*/

$pathToAppSSRBlacklist = __DIR__ . '/routes/blacklist.php';

if (file_exists($pathToAppSSRBlacklist)) {
  require $pathToAppSSRBlacklist;
}

/*========REQUIRE META DATA========*/
$pathToAppSSRMeta = __DIR__ . '/routes/meta.php';

if (file_exists($pathToAppSSRMeta)) {
  require $pathToAppSSRMeta;
}

/*========REQUIRE ROUTES========*/
$pathToApiRoutes = __DIR__ . '/routes/api.php';
$pathToWebRoutes = __DIR__ . '/routes/web.php';

if (file_exists($pathToApiRoutes)) {
  Route::group('api', function () use ($pathToApiRoutes): void {
    require $pathToApiRoutes;
  });
}

if (file_exists($pathToWebRoutes)) {
  Route::group('/:lng?', function () use ($pathToWebRoutes): void {
    require $pathToWebRoutes;
  });
}

if (Route::isRouteSetted()) {
  remove_action('template_redirect', 'redirect_canonical');
}
