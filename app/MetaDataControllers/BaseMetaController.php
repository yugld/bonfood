<?php

declare(strict_types=1);

namespace App\MetaDataControllers;

use App\Controller;

class BaseMetaController extends Controller
{
  public function logo()
  {
    $logo = '';

    if (get_theme_mod('custom_logo')) {
      $logo = wp_get_attachment_image_src(get_theme_mod('custom_logo'), 'full')[0];
    } else {

      $logos = glob(get_theme_file_path() . '/img/logo.{png,jpg,jpeg,webp,svg}', GLOB_BRACE);

      if ($logos) {
        $logo = get_theme_file_uri() . '/img/' . basename($logos[0]);
      } else {
        $logo = get_bloginfo('name');
      }
    }

    return $logo;
  }

  public function siteName()
  {
    return get_bloginfo('name');
  }

  public function siteDescription()
  {
    return get_bloginfo('description');
  }

  public function themeUrl()
  {
    return get_theme_file_uri();
  }

  public function initUrl()
  {
    return dirname(get_theme_file_uri()) . '/init';
  }
}
