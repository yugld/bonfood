<?php

namespace SSR\Helpers\Interfaces;

interface ClientResponse
{
  public function getCode(): int;
  public function getResponse();
}
