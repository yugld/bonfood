<?php

declare(strict_types=1);

namespace App\Controllers\Auth;

use App\Controller;

class RestoreController extends Controller
{
  public function show()
  {
    return render(["seo" => ['title' => "Restore", 'description' => "Restore page"]]);
  }

  public function restore()
  {
    return [];
  }
}
