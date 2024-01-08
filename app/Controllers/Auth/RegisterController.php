<?php

declare(strict_types=1);

namespace App\Controllers\Auth;

use App\Controller;
use SSR\Helpers\Routes\Request;

class RegisterController extends Controller
{
  public function show()
  {
    return render(["seo" => ['title' => "Register", 'description' => "Register page"]]);
  }

  public function register(Request $request)
  {
    global $wpdb;

    if (!wp_verify_nonce($request->body('csrfToken', ''), 'init')) {
      return jsonResponse(['message' => 'Invalid CSRF token'], 419);
    }

    $phone = sanitize_text_field($request->body('phone', ''));

    $table_name = $wpdb->prefix . 'users';

    if ($phone) {
      $phone = preg_replace('/[^0-9]/', '', $phone);

      if (mb_substr($phone, 0, 1) === '8') {
        $phone = '7' . mb_substr($phone, 1);
      } elseif (strlen($phone) === 10) {
        $phone = '7' . $phone;
      }

      if (strlen($phone) !== 11) {
        return jsonResponse(['message' => 'Phone number entered incorrectly'], 422);
      }

      $checkPhone = $wpdb->get_var($wpdb->prepare("SELECT ID FROM {$table_name} WHERE user_login = %s", $phone));

      if ($checkPhone) {
        return jsonResponse(['message' => 'Phone number already registered'], 422);
      }
    }

    $first_name = sanitize_text_field($request->body('first-name'));
    $last_name = sanitize_text_field($request->body('last-name'));
    $full_name = $first_name . ' ' . $last_name;

    $email = strtolower(sanitize_email($request->body('email')));
    $password = sanitize_text_field($request->body('password'));

    $checkEmail = $wpdb->get_var($wpdb->prepare("SELECT ID FROM {$table_name} WHERE user_email = %s", $email));

    if ($checkEmail) {
      return jsonResponse(['message' => 'Email already registered'], 422);
    }

    $userdata = [
      'user_login' => $phone,
      'user_email' => $email,
      'display_name' => $full_name,
      'first_name' => $first_name,
      'last_name' => $last_name,
      'user_pass' => $password,
    ];

    $user_id = wp_insert_user($userdata);

    if (is_wp_error($user_id)) {
      return jsonResponse(['message' => $user_id->get_error_message()], 500);
    }

    wp_set_current_user($user_id, $email);
    wp_set_auth_cookie($user_id);
    do_action('wp_login', $email);

    return [
      'message' => 'You have successfully registered',
      'redirect' => 'dashboard',
    ];
  }
}
