import View from 'services/vue/view'
import config from 'src/config/view'

/**
 * These services are booted during app initialization.
 * @param  {Lantern} app The application.
 * @return {undefined}
 */
function boot (app) {
  app.bind('view', function (container) {
    return new View(container, config)
  })
}

/**
 * You can now use services that have been booted on app initialization to
 * register additional services.
 * @param  {Lantern} app The application.
 * @return {undefined}
 */
function register (app) {
  config.plugins.forEach(plugin => {
    app.view.use(plugin)
  })
}

export default { boot, register }
