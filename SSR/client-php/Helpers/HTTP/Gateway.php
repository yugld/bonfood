<?php

namespace SSR\Helpers\HTTP;

use SSR\Helpers\Interfaces\Response;

interface Gateway
{
    /**
     * Dispatch the Inertia page to the Server Side Rendering engine.
     */
    public static function dispatch(array $page): ?Response;
}
