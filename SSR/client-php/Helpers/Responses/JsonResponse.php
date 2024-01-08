<?php

namespace SSR\Helpers\Responses;

use SSR\Helpers\Interfaces\ClientResponse;

class JsonResponse implements ClientResponse
{
  public function __construct(
    private $response,
    private int $code = 200
  ) {
  }

  public function getCode(): int
  {
    return $this->code;
  }

  public function getResponse()
  {
    return $this->response;
  }
}
