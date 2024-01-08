<?php

use Intervention\Image\Gd\Font;
use Intervention\Image\ImageManagerStatic;
use SSR\Route;

$file = WORDPRESS_ROOT . trim(parse_url(Route::getUrl())['path'], ' \n\r\t\v\0/');

$extension = strtolower(pathinfo($file, PATHINFO_EXTENSION));

$allowedExtensions = ['png', 'jpeg', 'jpg', 'webp'];
$allowedTypes = ['lg', 'md', 'sm', 'ph-sm', 'ph', 'ph-lg'];

function getImageAndCache($file, $type): void
{
  $pathParts = pathinfo($file);
  $fileWithTypes = $pathParts['filename'] . '-' . $type . '.' . $pathParts['extension'];
  $fileDir = $pathParts['dirname'] . DIRECTORY_SEPARATOR;
  $pathToFile = $fileDir . $fileWithTypes;

  $contentType = 'image/' . $pathParts['extension'];
  header('Content-Type: ' . $contentType);
  header('Content-Disposition: inline; filename="' . $fileWithTypes . '"');
  header("Cache-Control: public, max-age=2592000");
  header("Expires: " . gmdate("D, d M Y H:i:s", time() + 2592000) . " GMT");

  if (file_exists($pathToFile)) {
    readfile($pathToFile);
    exit;
  }

  $image = ImageManagerStatic::make($file);
  $imgW = $image->width();
  $imgH = $image->height();

  $quality = 100;

  switch ($type) {
    case 'lg':
      $image->resize($imgW * .9, $imgH * .9);
      break;

    case 'md':
      $image->resize($imgW * .6, $imgH * .6);
      break;

    case 'sm':
      $image->resize($imgW * .3, $imgH * .3);
      break;

    case 'ph-lg':
      $width = 300;
      $quality = 50;
      $image->resize($width, $width / $imgW * $imgH);
      break;

    case 'ph':
      $width = 200;
      $quality = 50;
      $image->resize($width, $width / $imgW * $imgH);
      break;

    case 'ph-sm':
      $width = 100;
      $quality = 50;
      $image->resize($width, $width / $imgW * $imgH);
      break;
  }

  $image->save($pathToFile, $quality);
  readfile($pathToFile);
  exit;
}

if (in_array($extension, $allowedExtensions)) {
  if (!file_exists($file)) {
    status_header(404);
    exit;
  }

  $type = $_GET['type'] ?? null;

  if (!is_null($type)) {
    if (in_array($type, $allowedTypes)) {
      getImageAndCache($file, $type);
    } else {
      status_header(422);

      $img = ImageManagerStatic::canvas(600, 300, '#cccccc');
      $img->text("Invalid type '{$type}'. \n\nAvailable types:\n[" . implode(', ', $allowedTypes) . ']', 300, 150, static function (Font $font): void {
        $font->file(__DIR__ . '/hedvig.ttf');
        $font->size(18);
        $font->align('center');
        $font->valign('center');
        $font->color('ff0000');
      });

      header('Content-Type: image/png');
      echo $img->stream('png', 100);
      exit;
    }
  }

  $image = ImageManagerStatic::make($file);
  $width = isset($_GET['w']) ? intval($_GET['w']) : null;
  $height = isset($_GET['h']) ? intval($_GET['h']) : null;
  $quality = isset($_GET['q']) ? intval($_GET['q']) : 90;

  // Keep the aspect ratio if only one dimension is set
  if ($width && !$height) {
    $height = intval($width / $image->width() * $image->height());
  } elseif (!$width && $height) {
    $width = intval($height / $image->height() * $image->width());
  } else {
    $width = $image->width();
    $height = $image->height();
  }

  $image->resize($width, $height);

  $contentType = 'image/' . $extension;
  header('Content-Type: ' . $contentType);
  header("Cache-Control: public, max-age=2592000");
  header("Expires: " . gmdate("D, d M Y H:i:s", time() + 2592000) . " GMT");
  echo $image->stream($extension, $quality);
  exit;
}
