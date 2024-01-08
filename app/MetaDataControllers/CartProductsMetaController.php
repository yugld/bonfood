<?php

declare(strict_types=1);

namespace App\MetaDataControllers;

use App\Controller;
use App\Repositories\ProductsRepository;

class CartProductsMetaController extends Controller
{
  public function index()
  {
    $cart = $_SESSION['cart'] ?? [];
    $ids = implode(',', array_column($cart, 'id'));

    if (! empty($ids)) {
      $products = ProductsRepository::getProductsData($ids);

      $productCount = count($products);

      for ($i = 0; $i < $productCount; $i++) {
        $index = array_search($products[$i]['id'], array_column($cart, 'id'));
        $products[$i]['quantity'] = $cart[$index]['quantity'];
      }

      return $products;
    }

    return [];
  }
}
