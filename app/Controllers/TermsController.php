<?php

declare(strict_types=1);

namespace App\Controllers;

use App\Controller;

class TermsController extends Controller
{
  public function show()
  {
    $terms = get_terms([
        'taxonomy' => 'catalog',
        'hide_empty' => false,
    ]);

    $result = [];

    foreach ($terms as $term) {
      $image_id = get_term_meta($term->term_id, '_thumbnail_id', true);
      $image_url = wp_get_attachment_image_url($image_id, 'large');

      $termData = (array) $term;
      $termData['image'] = $image_url;

      $result[] = (object) $termData;
    }

    return [
        'terms' => $result,
    ];
  }
}
