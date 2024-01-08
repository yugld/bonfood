<?php

declare(strict_types=1);

namespace App\MetaDataControllers;

use App\Controller;

class TermsMetaController extends Controller
{
  public function terms()
  {

    $terms = get_terms([
      'taxonomy' => 'catalog',
      'hide_empty' => false,
    ]);

    $result = [];

    if ($terms && !is_wp_error($terms)) {
      foreach ($terms as $term) {
        $term_link = get_term_link($term, $term->taxonomy);
        $image_id = get_term_meta($term->term_id, '_thumbnail_id', true);
        $image_url = wp_get_attachment_image_url($image_id, 'large');

        $termData = (array) $term; // Преобразуем объект term в массив
        $termData['image'] = $image_url;
        $termData['link'] = $term_link;

        $result[] = (object) $termData; // Преобразуем массив обратно в объект term
      }
    }

    return $result;
  }
}
