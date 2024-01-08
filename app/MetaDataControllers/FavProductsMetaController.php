<?php

declare(strict_types=1);

namespace App\MetaDataControllers;

use App\Controller;
use App\Repositories\ProductsRepository;

class FavProductsMetaController extends Controller
{
  public function index()
  {
    $favorite = $_SESSION['fav'] ?? [];
    $ids = implode(',', array_column($favorite, 'id'));

    if (!empty($ids)) {
      return ProductsRepository::getProductsData($ids);
    }

    return [];
  }
}
