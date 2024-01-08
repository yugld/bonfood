<?php

declare(strict_types=1);

namespace App\Controllers\Auth;

use App\Controller;
use SSR\Helpers\Routes\Request;

class LoginController extends Controller
{
  public function show()
  {
    return render(["seo" => ['title' => "Login", 'description' => "Login page"]]);
  }

  public function login(Request $request)
  {
    global $wpdb;
    [$credential, $password, $remember, $csrfToken] =
      $request->body(['credential', 'password', 'remember', 'csrfToken']);

    if (is_null($credential)) {
      return jsonResponse(['message' => 'CredentialRequired'], 422);
    }
    if (is_null($password)) {
      return jsonResponse(['message' => 'PasswordRequired'], 422);
    }
    if (is_null($csrfToken)) {
      return jsonResponse(['message' => 'CsrfTokenRequired'], 422);
    }

    if (!wp_verify_nonce($csrfToken, 'init')) {
      return jsonResponse(['message' => 'Invalid CSRF token'], 419);
    }

    $credential = $this->sanitizeCredential($credential);
    $remember = (bool) $remember;

    $table_name = $wpdb->prefix . 'users';

    $user_data = $wpdb->get_row($wpdb->prepare(
      "SELECT ID, user_email FROM {$table_name} WHERE user_login = %s OR user_email = %s",
      $credential,
      $credential
    ));

    if (empty($user_data)) {
      return jsonResponse(['message' => 'Invalid number or email address'], 401);
    }

    $sign = wp_signon([
      'user_login' => $credential,
      'user_password' => $password,
      'remember' => $remember,
    ]);

    if (is_wp_error($sign)) {
      return jsonResponse(['message' => 'Неверный пароль'], 401);
    }

    return [
      'user' => $user_data,
      'redirect' => 'dashboard',
    ];
  }

  public function logout(Request $request)
  {
    $csrf = $request->body('csrfToken', $request->param('csrf'));
    $isWordpress = $request->query('from', false) === 'wp';

    if (!is_null($csrf) && !wp_verify_nonce($csrf, 'init')) {
      if ($isWordpress) {
        header('Location: /csrf-mismatch', true, 302);
        exit;
      }

      return jsonResponse(['message' => 'Invalid CSRF token'], 419);
    }

    wp_logout();

    if ($isWordpress) {
      header('Location: /login', true, 302);
      exit;
    }

    return [];
  }

  public function user()
  {
    $wpUser = wp_get_current_user();
    $user = (array) $wpUser;
    $user["data"] = (array) $user["data"];

    $user["data"]['user_first_name'] = $wpUser->user_firstname;
    $user["data"]['user_last_name'] = $wpUser->user_lastname;
    $user["data"]['user_full_name'] = $wpUser->user_firstname . " " . $wpUser->user_lastname;

    unset($user["data"]["user_activation_key"]);
    unset($user["data"]["user_status"]);
    unset($user["data"]["user_url"]);
    unset($user["data"]["user_pass"]);

    return $user;
  }

  private function sanitizeCredential($credential)
  {
    // Очищаем логин от недопустимых символов
    $credential = preg_replace('/[^a-z0-9-_@.]/m', '', strtolower($credential));

    // Проверяем, является логин - номером телефона
    if (!strpos($credential, '@')) {
      // Очищаем номер телефона от недопустимых символов
      $credential = preg_replace('/[^0-9]/m', '', $credential);

      // Если первый символ "8", заменяем его на "7"
      if (substr($credential, 0, 1) === '8') {
        $credential = '7' . substr($credential, 1);
      } elseif (strlen($credential) === 10) {
        $credential = '7' . $credential;
      }
    }

    return $credential;
  }
}
