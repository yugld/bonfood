<?php

namespace App\Repositories;

class ProductsRepository
{
  public static function getProductsData(
    string $ids = '',
    string $term = '',
    string $query = '',
    string $slug = '',
    string $taxonomy = 'catalog',
    string $orderBy = 'ID',
    string $order = 'ASC',
    int $posts_per_page = 10,
  ) {

    $products = [
      'post_type' => 'product',
      'posts_per_page' => $posts_per_page,
      'orderby' => $orderBy,
      'order' => $order,
    ];

    if (!empty($term)) {
      $products['tax_query'] = [
        [
          'taxonomy' => $taxonomy,
          'field' => 'slug',
          'terms' => $term,
        ],
      ];
    }

    if (!empty($query)) {
      $products['s'] = $query;
    }

    if (!empty($ids)) {
      $products['include'] = $ids;
    }

    if (!empty($slug)) {
      $products['name'] = $slug;
    }

    $products = get_posts($products);

    $product_details = [];

    foreach ($products as $product) {

      $product_id = $product->ID;
      $post_type = $product->post_type;
      $post_title = $product->post_title;

      $image_id = get_post_thumbnail_id($product_id);
      $image_url = get_the_post_thumbnail_url($product_id, 'large') ?: get_template_directory_uri() . '/img/no-image.png';
      $image_alt = get_post_meta($image_id, '_wp_attachment_image_alt', true) ?: $post_title;

      $price = get_post_meta($product_id, 'price', true);

      $get_gallery = get_post_meta($product_id, 'gallery', true);

      $gallery = [];

      if ($get_gallery) {
        foreach ($get_gallery as $gallery_img_id) {
          $gallery[$gallery_img_id]['url'] = wp_get_attachment_image_url($gallery_img_id, "large");
          $gallery[$gallery_img_id]['alt'] = get_post_meta($gallery_img_id, '_wp_attachment_image_alt', true) ?: $post_title;
        }
      }

      $terms = get_the_terms($product_id, $taxonomy);

      $product_details[] = [
        'id' => $product_id,
        'post_title' => $post_title,
        'post_content' => $product->post_content,
        'post_name' => $product->post_name,
        'post_type' => $post_type,
        'link' => $product->guid,
        'image' => ['alt' => $image_alt, 'src' => $image_url],
        'gallery' => $gallery,
        'terms' => $terms,
        'price' => $price,
      ];
    }

    return $product_details;
  }
}
