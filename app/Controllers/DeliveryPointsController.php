<?php

namespace App\Controllers;

use SSR\Helpers\Routes\Request;

class DeliveryPointsController
{
  public function zones(Request $request)
  {
    if (!wp_verify_nonce($request->query('csrf'), 'init')) {
      return jsonResponse(["message" => "CSRF Token mismath"], 419);
    }

    return ["content" => json_decode(file_get_contents(storage("/delivery-zones.geojson")))];
  }
}
