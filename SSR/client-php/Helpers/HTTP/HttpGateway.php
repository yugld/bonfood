<?php

namespace SSR\Helpers\HTTP;

use Exception;
use SSR\Helpers\Responses\ErrorRenderServerResponse;
use SSR\Helpers\Interfaces\Response;
use SSR\Helpers\Responses\RenderServerResponse;

class HttpGateway implements Gateway
{
    private static function getCookieString(): string
    {
        $clientCookies = $_COOKIE;

        $cookieString = '';

        foreach ($clientCookies as $name => $value) {
            $cookieString .= $name . '=' . $value . '; ';
        }

        return rtrim($cookieString, '; ');
    }
    public static function dispatch(array $page): ?Response
    {
        $port = getenv('SSR_PORT') ?: 1450;
        $url = "http://127.0.0.1:$port/render";

        $data = json_encode($page);

        try {
            $ch = curl_init($url);
            curl_setopt($ch, CURLOPT_CUSTOMREQUEST, 'POST');
            curl_setopt($ch, CURLOPT_POSTFIELDS, $data);
            curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);

            curl_setopt($ch, CURLOPT_HTTPHEADER, [
                'Content-Type: application/json',
                'Cookie: ' . static::getCookieString(),
            ]);

            $response = curl_exec($ch);

            if ($response === false) {
                return null;
            }

            $httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);

            curl_close($ch);

            if ($httpCode === 500) {
                $responseData = json_decode($response, true);

                if (json_last_error() === JSON_ERROR_NONE && isset($responseData['error'], $responseData['message'])) {
                    return new ErrorRenderServerResponse($responseData['message']);
                } else {
                    return null;
                }
            }

            $responseData = json_decode($response, true);

            if (json_last_error() !== JSON_ERROR_NONE) {
                return null;
            }

            return new RenderServerResponse(
                implode("\n", $responseData['head']),
                $responseData['body']
            );
        } catch (Exception $e) {
            return null;
        }
    }
}
