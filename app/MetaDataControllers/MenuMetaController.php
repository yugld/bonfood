<?php

declare(strict_types=1);

namespace App\MetaDataControllers;

use App\Controller;

class MenuMetaController extends Controller
{
  public function menu()
  {
    $menu_array = [];
    $locations = get_nav_menu_locations();
    if ($locations && isset($locations['primary'])) {
      $menu = wp_get_nav_menu_object($locations['primary']);
      $menu_items = wp_get_nav_menu_items($menu->term_id);
      foreach ($menu_items as $menu_item) {
        $menu_array[] = [
            'url' => $menu_item->url,
            'title' => $menu_item->title,
        ];
      }
    }
    return $menu_array;
  }
}
