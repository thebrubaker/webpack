export default {

  /**
   * Base URL for the API.
   * @type {string}
   */
  'base_url': env('LARAVEL_BASE_URL', ''),

  /**
   * The authorization path for the API.
   */
  'auth_path': env('LARAVEL_AUTH_PATH', 'oauth/token'),

  /**
   * Rows per page for paginated results.
   * @type {Number}
   */
  'perPage': 15
}
