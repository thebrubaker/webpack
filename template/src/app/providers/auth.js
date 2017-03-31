import Auth from 'services/auth/auth'
import FirebaseDriver from 'services/auth/drivers/firebase-auth-driver'
import LaravelDriver from 'services/auth/drivers/laravel-auth-driver'
import services from 'src/config/services'
import config from 'src/config/auth'

/**
 * These services are booted during app initialization.
 * @param  {Lantern} app The application.
 * @return {undefined}
 */
function boot (app) {
  app.bind('firebase-auth-driver', function ({ firebase, store }) {
    return new FirebaseDriver(firebase, store, config)
  })
  app.bind('laravel-auth-driver', function ({ api, store }) {
    return new LaravelDriver(api, store, config, services.laravel)
  })
  app.bind('auth', function (container) {
    return new Auth(config)
  })
}

/**
 * You can now use services that have been booted on app initialization to
 * register additional services.
 * @param  {Lantern} app The application.
 * @return {undefined}
 */
function register (app) {

}

export default { boot, register }
