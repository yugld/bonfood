<?php

use App\Controllers\Auth\LoginController;
use App\MetaDataControllers\BaseMetaController;
use App\MetaDataControllers\CartProductsMetaController;
use App\MetaDataControllers\FavProductsMetaController;
use App\MetaDataControllers\MenuMetaController;
use App\MetaDataControllers\TermsMetaController;
use SSR\MetaData;

MetaData::meta('logo', [BaseMetaController::class, 'logo']);
MetaData::meta('siteName', [BaseMetaController::class, 'siteName']);
MetaData::meta('siteDescription', [BaseMetaController::class, 'siteDescription']);
MetaData::meta('themeUrl', [BaseMetaController::class, 'themeUrl']);
MetaData::meta('initUrl', [BaseMetaController::class, 'initUrl']);

MetaData::meta('minPriceToDelivery', 2500);

MetaData::meta('terms', [TermsMetaController::class, 'terms']);
MetaData::meta('menu', [MenuMetaController::class, 'menu']);

MetaData::meta('cartProducts', [CartProductsMetaController::class, 'index']);
MetaData::meta('favProducts', [FavProductsMetaController::class, 'index']);

MetaData::meta('user', [LoginController::class, 'user']);
