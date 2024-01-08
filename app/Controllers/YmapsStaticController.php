<?php

namespace App\Controllers;

use SSR\Helpers\Routes\Request;

class YmapsStaticController
{
  public function index(Request $request)
  {
    $apikey = getenv("YMAPS_API_KEY");

    if (empty($apikey)) {
      return ["res-type" => "scripts", "content" => "throw new Error('API KEY FOR YMAPS IS NOT DEFINED IN PHP! $apikey')"];
    }

    if (!wp_verify_nonce($request->query('csrf'), 'init')) {
      return ["res-type" => "scripts", "content" => "console.warn(\"CSRF TOKEN MISSMATCH FOR YMAPS!\")"];
    }

    $lng = $_COOKIE['lang'] ?? 'ru';
    $lang = $request->param("lng", $lng) === "en" ? "en_US" : "ru_RU";

    $res = file_get_contents("https://api-maps.yandex.ru/v3/?lang=$lang&apikey=$apikey");

    if ($res) {
      header('Content-Type: application/javascript');
      return ["res-type" => "scripts", "content" => $res];
    }

    return jsonResponse([], 500);
  }
}
