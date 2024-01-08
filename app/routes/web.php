<?php
/*
 WEB ROUTE RECOMENDATIONS

 Web routes maded to render initial ssr html. Here must be used only render routes.
 Every handler must return render($props) where props is array that will be passed to front.


 Handler  Methdod Route
 index    get     (/) -> render main page.
 show     get     (/:id or :slug) -> render item page
 edit     get     (/:id or :slug/edit) -> render item edit page

 Example:

 Route::group('product', function () {
  Route::get("/", [CartController::class, 'index']);
  Route::get("/:id", [CartController::class, 'show']);
  Route::get("/:id/edit", [CartController::class, 'edit']);
 });

*/

use App\Controllers\Auth\LoginController;
use App\Controllers\Auth\RegisterController;
use App\Controllers\Auth\RestoreController;
use App\Controllers\CartController;
use App\Controllers\Dashboard\DashboardController;
use App\Controllers\Dashboard\DashboardEditController;
use App\Controllers\FavoritesController;
use App\Controllers\IndexController;
use App\Controllers\NotFoundController;
use App\Controllers\Orders\OrdersController;
use App\Controllers\PageController;
use App\Controllers\ProductController;
use SSR\Helpers\Routes\PathMatch;
use SSR\Helpers\Routes\PathMatcher;
use SSR\Route;

Route::get(Route::INDEX_PAGE, [IndexController::class, 'index']);

Route::group(function (): void {
  Route::get('/login', [LoginController::class, 'show']);
  Route::get('/register', [RegisterController::class, 'show']);
  Route::get('/restore', [RestoreController::class, 'show']);
});

// TODO: Нет логики
Route::group(function (): void {
  Route::get('/orders', [OrdersController::class, 'index']);
  Route::get('/orders/:slug', [OrdersController::class, 'index']);
});

// TODO: Карта
Route::group('cart', function (): void {
  Route::get('/', [CartController::class, 'index']);
});

Route::get('/fav', [FavoritesController::class, 'index']);

Route::group('/dashboard', function (): void {
  Route::get('/', [DashboardController::class, 'index']);

  // TODO: Нет логики
  Route::get('/edit', [DashboardEditController::class, 'index']);
});

Route::group("/product", function () {
  Route::get('/', [ProductController::class, 'index']);
  Route::get('/:term', [ProductController::class, 'showTerm']);
  Route::get('/:term/:slug', [ProductController::class, 'showProduct']);
});

Route::route('*', [NotFoundController::class, 'notFound']);
