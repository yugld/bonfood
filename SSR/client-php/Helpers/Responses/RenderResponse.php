<?php

namespace SSR\Helpers\Responses;

use SSR\Helpers\Interfaces\ClientResponse;

class RenderResponse implements ClientResponse
{
    public function __construct(
        private ?string $view,
        private array $response,
        private int $code = 200,
        private array $options = []
    ) {
    }

    public function getCode(): int
    {
        return $this->code;
    }

    public function getResponse(): array
    {
        return $this->response;
    }

    public function getPage(): ?string
    {
        return $this->view;
    }

    public function getOptions(): ?array
    {
        return $this->options;
    }
}
