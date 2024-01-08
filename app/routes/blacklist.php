<?php

use SSR\Route;

Route::blacklist('/wp-admin/*');
Route::blacklist('/wp-content/*');

Route::blacklistByQuery('customize_changeset_uuid');
