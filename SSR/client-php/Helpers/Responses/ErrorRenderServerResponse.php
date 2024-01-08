<?php

namespace SSR\Helpers\Responses;

use SSR\Helpers\Interfaces\Response;

class ErrorRenderServerResponse implements Response
{
    public function __construct(
        public string $message
    ) {
    }
}
