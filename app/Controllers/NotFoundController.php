<?php

declare(strict_types=1);

namespace App\Controllers;

use App\Controller;
use SSR\Helpers\Routes\Request;

class NotFoundController extends Controller
{
  public function notFound(Request $request)
  {
    $route = $request->param('*');
    $requestMethod = $request->getRequestMethod();

    return render([
        'message' => "Route \"{$route}\" is not defined for {$requestMethod} method!",
    ], 404);
  }
}
