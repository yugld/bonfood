<?php

declare(strict_types=1);

namespace App\Controllers\Dashboard;

use App\Controller;

class DashboardEditController extends Controller
{
  public function index()
  {
    $user = wp_get_current_user();
    if (!!$user && $user->ID === 0) {
      header('Location: /login', false, 302);
      die;
    }

    return render(['dashboard' => '']);
  }
}
