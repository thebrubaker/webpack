export default {

  /**
   * The name of your application.
   */
  'name': 'Lantern',

  /**
   * The dev environment
   * @type {String}
   */
  environment: env('APP_ENV', 'local'),

  /**
   * Enable debugging for your application and services.
   * @type {Boolean}
   */
  debug: env('APP_DEBUG', true),

  /**
   * Register aliases for the application. Each alias will access that service from the application container.
   * @type {array}
   */
  aliases: [

    'api',
    'auth',
    'events',
    'firebase',
    'http',
    'model',
    'router',
    'search',
    'store',
    'view'

  ]
}
