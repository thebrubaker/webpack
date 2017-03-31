import ModelService from 'services/blueprint/model'
import directory from 'utilities/directory'

/**
 * These services are booted during app initialization.
 * @param  {Lantern} app The application.
 * @return {undefined}
 */
function boot (app) {
  app.bind('model', function (container) {
    let service = new ModelService(directory('src/models'))

    let model = namespace => service.load(namespace)
    model.all = service.all.bind(service)
    model.register = service.register.bind(service)
    model.boot = service.boot.bind(service)

    return model
  })
}

/**
 * You can now use services that have been booted on app initialization to
 * register additional services.
 * @param  {Lantern} app The application.
 * @return {undefined}
 */
function register (app) {
  app.model.boot()
}

export default { boot, register }
