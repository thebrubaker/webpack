import Router from 'services/vue-router/router'
import directory from 'utilities/directory'
import config from 'src/config/router'
import routes from 'routes'

/**
 * These services are booted during app initialization.
 * @param  {Lantern} app The application.
 * @return {undefined}
 */
function boot (app) {
  app.bind('router', function (container) {
    return new Router(config, routes)
  })
}

/**
 * You can now use services that have been booted on app initialization to
 * register additional services.
 * @param  {Lantern} app The application.
 * @return {undefined}
 */
function register (app) {
  app.router.registerMiddleware(app, directory('routes/middleware'))
}

export default { boot, register }
