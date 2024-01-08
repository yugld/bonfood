<?php

declare(strict_types=1);

namespace App\Controllers;

use App\Controller;
use SSR\Helpers\Routes\Request;

class PageController extends Controller
{
  public function index(Request $request)
  {
    $slug = $request->param('page', '');

    $pages = get_posts([
      'post_type' => 'page',
      'post_status' => 'publish',
      'name' => $slug,
      'posts_per_page' => 1,
    ]);

    $title = "";
    $content = "";

    if (!empty($pages)) {
      $page = $pages[0];
      $title = $page->post_title;
      $content = $page->post_content;
    }

    return render(['page' => '', 'title' => $title, 'content' => $content]);
  }
}
