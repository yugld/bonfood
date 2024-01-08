<?php

declare(strict_types=1);

namespace App\Controllers;

use App\Controller;
use App\Repositories\ProductsRepository;
use SSR\Helpers\Routes\Request;

class FavoritesController extends Controller
{
  public function index()
  {
    return render($this->indexApi());
  }

  public function indexApi()
  {
    $favorite = $_SESSION['fav'] ?? [];
    $ids = implode(',', array_column($favorite, 'id'));

    if (empty($ids)) {
      return ['products' => [], 'title' => get_the_title()];
    }

    $products = ProductsRepository::getProductsData($ids);

    return ['favProducts' => $products, 'title' => get_the_title()];
  }

  public function update(Request $request)
  {
    [$id, $item] = $request->body(['id', 'item'], [null, []]);

    $favorite = $_SESSION['fav'] ?? [];
    $existingItemKey = array_search($id, array_column($favorite, 'id'));

    if ($existingItemKey !== false) {
      $favorite[$existingItemKey] = array_merge($favorite[$existingItemKey], $item);
    }

    write_session('fav', $favorite);

    return ['success' => true];
  }

  public function create(Request $request)
  {
    $id = $request->body('id', null);
    $favorite = $_SESSION['fav'] ?? [];

    $existingItemKey = array_search($id, array_column($favorite, 'id'));

    if ($existingItemKey === false) {
      $favorite[] = ['id' => $id];
    }

    write_session('fav', $favorite);

    $product = ProductsRepository::getProductsData((string) $id);

    if (count($product) > 0) {
      $product = $product[0];
    }

    return ['success' => true, 'item' => $product];
  }

  public function clear()
  {
    write_session('fav', []);
    return ['success' => true];
  }

  public function delete(Request $request)
  {
    $id = $request->param('id', null);

    if (!$id) {
      return ['success' => false];
    }

    $favorite = $_SESSION['fav'] ?? [];

    $favIndex = array_search($id, array_column($favorite, 'id'));

    if ($favIndex !== false) {
      array_splice($favorite, $favIndex, 1);

      write_session('fav', $favorite);

      return ['success' => true];
    }
    return ['success' => false, 'message' => 'Favorite not found'];
  }
}
