<?php

namespace SSR;

final class Config
{
  private static array $validLanguages = ['kz', 'ru'];
  private static string $defaultLanguage = 'ru';

  public static function setValidLanguages(array $validLanguages)
  {
    self::$validLanguages = $validLanguages;
  }

  public static function getValidLanguages()
  {
    return self::$validLanguages;
  }

  public static function setDefaultLanguage(string $lang)
  {
    self::$defaultLanguage = $lang;
  }

  public static function getDefaultLanguage()
  {
    return self::$defaultLanguage;
  }
}
