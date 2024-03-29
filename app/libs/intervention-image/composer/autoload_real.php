<?php

// autoload_real.php @generated by Composer

class ComposerAutoloaderInit2570db3dfba7d0d338c2c44087483f42
{
    private static $loader;

    public static function loadClassLoader($class): void
    {
        if ($class === 'Composer\Autoload\ClassLoader') {
            require __DIR__ . '/ClassLoader.php';
        }
    }

    /**
     * @return \Composer\Autoload\ClassLoader
     */
    public static function getLoader()
    {
        if (self::$loader !== null) {
            return self::$loader;
        }

        require __DIR__ . '/platform_check.php';

        spl_autoload_register(['ComposerAutoloaderInit2570db3dfba7d0d338c2c44087483f42', 'loadClassLoader'], true, true);
        self::$loader = $loader = new \Composer\Autoload\ClassLoader(\dirname(__DIR__));
        spl_autoload_unregister(['ComposerAutoloaderInit2570db3dfba7d0d338c2c44087483f42', 'loadClassLoader']);

        require __DIR__ . '/autoload_static.php';
        call_user_func(\Composer\Autoload\ComposerStaticInit2570db3dfba7d0d338c2c44087483f42::getInitializer($loader));

        $loader->register(true);

        $filesToLoad = \Composer\Autoload\ComposerStaticInit2570db3dfba7d0d338c2c44087483f42::$files;
        $requireFile = \Closure::bind(static function ($fileIdentifier, $file): void {
            if (empty($GLOBALS['__composer_autoload_files'][$fileIdentifier])) {
                $GLOBALS['__composer_autoload_files'][$fileIdentifier] = true;

                require $file;
            }
        }, null, null);
        foreach ($filesToLoad as $fileIdentifier => $file) {
            $requireFile($fileIdentifier, $file);
        }

        return $loader;
    }
}
