<?php

namespace SSR\Helpers;

use Exception;

class DecodeURI
{
  public static function safelyDecodeURI($value)
  {
    try {
      return urldecode($value);
    } catch (Exception $error) {
      throw new Exception(
        false,
        'The URL path "' . $value . '" could not be decoded because it is a ' .
          'malformed URL segment. This is probably due to a bad percent ' .
          'encoding (' . $error->getMessage() . ').'
      );

      return $value;
    }
  }

  public static function safelyDecodeURIComponent($value, $paramName)
  {
    try {
      return urldecode($value);
    } catch (Exception $error) {
      throw new Exception(
        false,
        'The value for the URL param "' . $paramName . '" will not be decoded because' .
          ' the string "' . $value . '" is a malformed URL segment. This is probably' .
          ' due to a bad percent encoding (' . $error->getMessage() . ').'
      );

      return $value;
    }
  }
}
