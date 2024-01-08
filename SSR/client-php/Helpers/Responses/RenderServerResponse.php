<?php

namespace SSR\Helpers\Responses;

use SSR\Helpers\Interfaces\Response;

class RenderServerResponse implements Response
{
    public function __construct(
        public string $head,
        public string $body
    ) {
    }
}
