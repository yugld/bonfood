<?php

declare(strict_types=1);

namespace App\Controllers;

use App\Controller;
use App\Repositories\ProductsRepository;

class IndexController extends Controller
{
  public function index()
  {
    return render(['products' => ProductsRepository::getProductsData(), "seo" => ['title' => get_the_title()]]);
  }
}
