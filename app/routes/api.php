<?php
/*
 API ROUTE RECOMENDATIONS

 API routes maded to get any kind of data through ajax.
 Every handler must return array or jsonResponse($prop) where props is array that will be passed to front.
 If returned variable is not jsonResponse it will automatically wrapped to jsonResponse.

 Handler  Methdod   Route
 indexApi get       (/) -> gets list of data. With any kind of processing like ordering pagination search etc.
 show     get       (/:id or :slug) -> return one item
 create   post      (/:id or :slug) -> creates item
 update   put/patch (/:id or :slug) -> updates/changes item
 delete   delete    (/:id or :slug/edit) -> deletes item

 This is basic recomendation. You free to add your custom naming for specific actions like in the example bellow.

 Example:

 Route::group("product", function () {
  Route::get('/', [CartController::class, "indexApi"]);
  Route::post('/', [CartController::class, "create"]);
  Route::put('/', [CartController::class, "update"]);
  Route::delete("/clear", [CartController::class, "clear"]);
  Route::delete("/:id", [CartController::class, 'delete']);
 });

*/

use App\Controllers\Auth\LoginController;
use App\Controllers\Auth\RegisterController;
use App\Controllers\CartController;
use App\Controllers\DeliveryPointsController;
use App\Controllers\FavoritesController;
use App\Controllers\ProductController;
use App\Controllers\TermsController;
use App\Controllers\YmapsStaticController;
use SSR\Route;

Route::group('auth', function (): void {
  Route::post("login", [LoginController::class, "login"]);
  Route::post('register', [RegisterController::class, 'register']);
  Route::get('logout', [LoginController::class, 'logout']);
  Route::get('me', [LoginController::class, 'me']);
});

Route::group('cart', static function (): void {
  Route::get('/', [CartController::class, 'indexApi']);
  Route::post('/', [CartController::class, 'create']);
  Route::put('/', [CartController::class, 'update']);
  Route::delete('/clear', [CartController::class, 'clear']);
  Route::delete('/:id', [CartController::class, 'delete']);
});

Route::group('fav', static function (): void {
  Route::get('/', [FavoritesController::class, 'indexApi']);
  Route::post('/', [FavoritesController::class, 'create']);
  Route::put('/', [FavoritesController::class, 'update']);
  Route::delete('/clear', [FavoritesController::class, 'clear']);
  Route::delete('/:id', [FavoritesController::class, 'delete']);
});

Route::get('/product/:slug', [ProductController::class, 'showApi']);
Route::post('/products', [ProductController::class, 'query']);

Route::post('/terms', [TermsController::class, 'show']);

Route::group('static', function () {
  Route::get('ymaps', [YmapsStaticController::class, "index"]);
  Route::get('delivery-zones', [DeliveryPointsController::class, "zones"]);
});
