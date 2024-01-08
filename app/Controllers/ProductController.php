<?php

declare(strict_types=1);

namespace App\Controllers;

use App\Controller;
use App\Repositories\ProductsRepository;
use SSR\Helpers\Routes\Request;

class ProductController extends Controller
{
  public function index()
  {
    return render(['products' => ProductsRepository::getProductsData()]);
  }

  public function showTerm(Request $request)
  {
    $term = $this->getTerm($request);
    return render($term, $term['status'] ?? 200);
  }

  public function showTermApi(Request $request)
  {
    $term = $this->getTerm($request);
    return jsonResponse($term, $term['status'] ?? 200);
  }

  private function getTerm(Request $request)
  {
    $slug = $request->param('term', '');
    $term = get_term_by('slug', $slug, 'catalog');
    if (empty($term)) return ['title' => null, 'items' => null, "status" => 404];

    $products = ProductsRepository::getProductsData(term: $slug);

    $cart = $_SESSION['cart'] ?? [];

    $productCount = count($products);

    for ($i = 0; $i < $productCount; $i++) {
      $existingItemKey = array_search($products[$i]['id'], array_column($cart, 'id'));
      $quantity = 1;

      if ($existingItemKey !== false) {
        $quantity = $cart[$existingItemKey]['quantity'];
      }

      $products[$i]['quantity'] = $quantity;
    }

    return ['title' => $term->name, 'items' => $products, 'paramTranslations' => [
      "term" => $term->name
    ]];
  }

  public function showProduct(Request $request)
  {
    $product = $this->getProduct($request);
    $term = $this->getTerm($request);

    if (empty($product)) return render(['title' => get_the_title(), 'item' => null, 'status' => 404], 404);
    return render(['product' => $product, 'products_term' => $term, "paramTranslations" => [
      "term" => $term["title"],
      "slug" => $product["title"]
    ]]);
  }

  public function showProductApi(Request $request)
  {
    $product = $this->getProduct($request);
    if (empty($product)) return jsonResponse(['title' => get_the_title(), 'item' => null, 'status' => 404], 404);
    return jsonResponse($product);
  }

  public function getProduct(Request $request)
  {

    $slug = $request->param('slug', '');
    $term = get_term_by('slug', $request->param('term', ''), 'catalog');
    if (empty($term)) return null;

    $products = ProductsRepository::getProductsData(slug: $slug);
    if (empty($products)) return null;
    $product = $products[0];

    $cart = $_SESSION['cart'] ?? [];

    $existingItemKey = array_search($product['id'], array_column($cart, 'id'));
    $quantity = 1;

    if ($existingItemKey !== false) {
      $quantity = $cart[$existingItemKey]['quantity'];
    }

    $product['quantity'] = $quantity;

    return ['title' => get_the_title($product['id']), 'item' => $product, 'paramTranslations' => [
      "slug" => get_the_title($product['id']),
      "term" => $term->name
    ]];
  }

  public function query(Request $request)
  {
    $term = $request->body('term', null);
    $query = $request->body('query', null);

    return ['products' => ProductsRepository::getProductsData(term: $term, query: $query)];
  }
}
