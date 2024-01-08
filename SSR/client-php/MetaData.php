<?php

namespace SSR;

class MetaItem
{
  public function __construct(
    public string $key,
    public $value,
  ) {
  }
  public function executeCallback()
  {
    if (is_array($this->value) && count($this->value) === 2) {
      $className = $this->value[0] ?? "";
      $methodName = $this->value[1] ?? "";
      if (class_exists($className) && method_exists($className, $methodName)) {
        $instance = new $className();
        return call_user_func([$instance, $methodName]);
      }
    } elseif (is_callable($this->value)) {
      return call_user_func($this->value);
    }
    return $this->value;
  }
}

final class MetaData
{
  protected static array $meta = [];
  private static array $metasToIgnore = [];
  /**
   * @var MetaItem[] $blacklist Array of BlacklistItem objects
   */
  private static array $metaItems = [];

  public static function meta(string $key, mixed $value)
  {
    self::$metaItems[] = new MetaItem($key, $value);
  }

  public static function ignoreMeta(string $key)
  {
    self::$metasToIgnore[] = $key;
  }

  /**
   * This property is for internal use only and should not be accessed directly.
   *
   * @return mixed
   */
  public static function initializeMetaItems()
  {
    foreach (self::$metaItems as $item) {
      if (in_array($item->key, self::$metasToIgnore)) continue;
      self::$meta[$item->key] = $item->executeCallback();
    }

    self::$meta["customPages"] = array_map(function ($item) {
      unset($item['content']);
      return $item;
    }, Route::getCustomPages());
  }

  /**
   * This property is for internal use only and should not be accessed directly.
   *
   * @return mixed
   */
  public static function getMetaData()
  {
    return self::$meta;
  }
}
