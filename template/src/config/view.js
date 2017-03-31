export default {

  /**
   * Provide the CSS selector string for mounting the root application
   */
  selector: '#app',

  /**
   * The name of your application
   */
  name: 'Lantern',

  /**
   * Suppress all Vue logs and warnings.
   */
  silent: env('APP_ENV', 'local') === 'production',

  /**
   * Configure whether to allow vue-devtools inspection.
   */
  devtools: env('APP_DEBUG', true),

  /**
   * Plugins to be registered with the view service.
   * @type {array}
   */
  plugins: [
    require('services/vue/plugins/guard'),
    require('services/vue/plugins/responsive'),
    require('services/vue/plugins/events')
  ],

  /**
   * Global components for the view service.
   * @type {array}
   */
  globalComponents: []
}
