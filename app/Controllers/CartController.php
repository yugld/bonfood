<?php

declare(strict_types=1);

namespace App\Controllers;

use App\Controller;
use App\Repositories\ProductsRepository;
use SSR\Helpers\Routes\Request;

class CartController extends Controller
{
  public function index()
  {
    return render($this->indexApi());
  }

  public function indexApi()
  {
    $cart = $_SESSION['cart'] ?? [];
    $ids = implode(',', array_column($cart, 'id'));

    if (empty($ids)) {
      return ['products' => [], 'title' => get_the_title()];
    }

    $products = ProductsRepository::getProductsData($ids);

    $count = count($products);
    for ($i = 0; $i < $count; $i++) {
      $index = array_search($products[$i]['id'], array_column($cart, 'id'));
      $products[$i]['quantity'] = $cart[$index]['quantity'];
    }

    return ['cartProducts' => $products, 'title' => get_the_title()];
  }

  public function update(Request $request)
  {
    [$id, $item] = $request->body(['id', 'item'], [null, []]);

    $cart = $_SESSION['cart'] ?? [];
    $existingItemKey = array_search($id, array_column($cart, 'id'));

    if ($existingItemKey !== false) {
      $cart[$existingItemKey] = array_merge($cart[$existingItemKey], $item);
    }

    write_session('cart', $cart);

    return ['success' => true];
  }

  public function create(Request $request)
  {
    $id = $request->body('id', null);
    $quantity = $request->body('quantity', 1);

    $cart = $_SESSION['cart'] ?? [];

    $existingItemKey = array_search($id, array_column($cart, 'id'));

    if ($existingItemKey === false) {
      $cart[] = ['id' => $id, 'quantity' => $quantity];
    } else {
      $quantity = $cart[$existingItemKey]['quantity'] + 1;
      $cart[$existingItemKey]['quantity'] = $quantity;
    }

    write_session('cart', $cart);

    $product = ProductsRepository::getProductsData((string) $id);

    if (count($product) > 0) {
      $product = $product[0];
      $product['quantity'] = $quantity;
    }

    return ['success' => true, 'item' => $product];
  }

  public function clear()
  {
    write_session('cart', []);
    return ['success' => true];
  }

  public function delete(Request $request)
  {
    $id = $request->param('id', null);

    if (!$id) {
      return ['success' => false];
    }

    $cart = $_SESSION['cart'] ?? [];

    $cartIndex = array_search($id, array_column($cart, 'id'));

    if ($cartIndex !== false) {
      array_splice($cart, $cartIndex, 1);

      write_session('cart', $cart);

      return ['success' => true];
    }
    return ['success' => false, 'message' => 'Cart not found'];
  }
}
