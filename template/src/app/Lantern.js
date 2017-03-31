import Bottle from 'bottlejs'

/**
 * The application class. We use this container to hold and access all services
 * within the application. Lantern uses bottle.js as a dependency injection engine
 * and wraps many of it's methods, while providing a convenient way to register
 * service providers and access core services.
 */
export default class Lantern {

  /**
   * The constructor for the class. Creates a new instance of Bottle.js and
   * configures the application.
   * @param  {string} config the application configuration
   * @return {Lantern} the application
   */
  constructor (config) {
    this.bottle = new Bottle()
    this.config = config
    if (config.debug) window.app = this
  }

  /**
   * Boots and registers all service providers for the application. Each provider should
   * include a boot and register method that takes the application as it's only
   * argument.
   * @param  {Array} providers  A list of providers to boot/register.
   * @return {Lantern}  The application
   */
  boot (providers = []) {
    providers.forEach(provider => {
      provider.default.boot(this)
    })

    this.config.aliases.forEach(key => {
      this[key] = this.make(key)
    })

    providers.forEach(provider => {
      provider.default.register(this)
    })

    return this
  }

  /**
   * Render the root view instance for the application.
   * @param  {VueComponent} rootViewInstance  The root Vue instance.
   * @return {Lantern} The application.
   */
  render (rootViewInstance) {
    this.view.init(rootViewInstance)

    return this
  }

  /**
   * Load modules into the data store.
   * @param  {Object} modules  The modules.
   * @return {Lantern} The application.
   */
  load (modules) {
    this.store.init(modules)

    return this
  }

  /**
   * Bind the implementation of a service to a name. You can either pass a function
   * with the `container` as the only argument or an object you want constructed.
   * @param  {string} name the name of the service
   * @param  {any} implementation the implementation of the service
   * @return {Lantern} The application
   */
  bind (name, implementation) {
    if (typeof implementation === 'function') {
      this.bottle.factory(name, implementation)
    } else {
      this.bottle.service(name, implementation)
    }

    return this
  }

  /**
   * Used to register a service instance factory that will return an
   * instance when called.
   * @param  {string} name the name of the service
   * @param  {any} implementation the implementation of the service
   * @return {Lantern} The application
   */
  instance (name, implementation) {
    this.bottle.instanceFactory(name, implementation)

    return this
  }

  /**
   * Return a service from the container.
   * @param  {[type]} service [description]
   * @return {[type]}         [description]
   */
  make (service) {
    if (this.bottle.container[service] === undefined) {
      return error(`The service you requested has not been bound to the container: ${service}`, 'App')
    }

    return this.bottle.container[service]
  }

  /**
   * Get the environment of the application
   * @return {String} The name of the environment, such as production, develop, or testing.
   */
  get environment () {
    return this.config.environment
  }

  /**
   * Get the debug setting of the application
   * @return {true}  True if debugging is enabled.
   */
  get debug () {
    return this.config.debug
  }
}
