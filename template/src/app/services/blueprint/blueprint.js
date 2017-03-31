import FirebaseDriver from './drivers/firebase-driver'
import AlgoliaDriver from './drivers/algolia-driver'
import LaravelDriver from './drivers/laravel-driver'
import { namespaceKeys } from 'utilities'

export default class Blueprint {

  /**
   * Constructor for the Blueprint model.
   * @param  {object} options  The options for the blueprint.
   * @return {Blueprint}  The Blueprint model.
   */
  constructor (config, driver) {
    this.config = config
    this.drivers = {
      'firebase': new FirebaseDriver(this),
      'algolia': new AlgoliaDriver(this),
      'laravel': new LaravelDriver(this)
    }
    this.driver = driver || config.driver || 'no driver provided'
  }

  /**
   * Set the configuration of the blueprint, with some defaults added.
   * @param  {Model} config  The model configuration for the blueprint.
   * @return {undefined}
   */
  set config (config) {
    this.model = config
    this.namespace = config.namespace
    this.name = config.name || config.namespace.split('/').pop()
    this.location = config.location || this.name
  }

  /**
   * Return the configuration for the blueprint.
   * @return {Object}  The model configuration.
   */
  get config () {
    return this.model
  }

  /**
   * Change the driver for the blueprint.
   * @param  {string} type  The type of driver.
   * @return {Blueprint}  A new instance of the current blueprint with the newly selected driver.
   */
  get driver () {
    return function (type) {
      if (this.drivers[type] === undefined) {
        return error(`The driver selected is not valid: '${type}'`, 'Blueprint')
      }

      return new Blueprint(this.config, type)
    }
  }

  /**
   * Set the selected driver from those that are available.
   * @param  {string} type  The driver to select.
   * @return {FirebaseDriver|AlgoliaDriver}  The driver implementation.
   */
  set driver (type) {
    if (this.drivers[type] === undefined) {
      return error(`The driver selected is not valid: '${type}'`, 'Blueprint')
    }

    this.selectedDriver = this.drivers[type]
  }

  /**
   * Fetch a specific model by it's id.
   * @param  {string} id  The model's id.
   * @return {Promise}  A promise that resolves with the model.
   */
  fetch (id) {
    return new Promise((resolve, reject) => {
      this.selectedDriver.fetch(id).then(data => {
        app.events.fire(`${this.name}.fetched`, data) && resolve(data)
      }).catch(error => {
        reject(error)
      })
    })
  }

  /**
   * Create a new model.
   * @param  {object} data  The data to write.
   * @return {Promise}  A promise that resolves with the model.
   */
  create (data) {
    return new Promise((resolve, reject) => {
      this.selectedDriver.create(data).then(data => {
        app.events.fire(`${this.name}.created`, data) && resolve(data)
      }).catch(error => {
        reject(error)
      })
    })
  }

  /**
   * Create a new model.
   * @param  {string} id  The model's id.
   * @param  {object} data  The data to write.
   * @return {Promise}  A promise that resolves with the model.
   */
  update (id, data) {
    return new Promise((resolve, reject) => {
      this.selectedDriver.update(id, data).then(data => {
        app.events.fire(`${this.name}.updated`, data) && resolve(data)
      }).catch(error => {
        reject(error)
      })
    })
  }

  /**
   * Delete a model.
   * @param  {string} id  The model's id.
   * @return {Promise}  A promise that resolves with true.
   */
  delete (id) {
    return new Promise((resolve, reject) => {
      this.selectedDriver.delete(id).then(data => {
        app.events.fire(`${this.name}.deleted`, id) && resolve(data)
      }).catch(error => {
        reject(error)
      })
    })
  }

  /**
   * Boot the blueprint into the application.
   * @return {undefined}
   */
  boot () {
    if (this.config.events) this.registerEvents(this.config.events)
    if (this.config.module) this.registerModule(this.config.module)
    if (this.config.form) this.registerForm(this.config.form)
  }

  /**
   * Register all events configured on the model.
   * @return {undefined}
   */
  registerEvents (events) {
    app.events.registerChannel(namespaceKeys(this.name, events), this)
  }

  /**
   * Register a module with the data store service.
   * @param  {Object} module  The configuration for the module.
   * @return {undefined}
   */
  registerModule (module) {
    try {
      this.createStoreModule(module)
    } catch (exception) {
      this.throwNamespaceError(module, exception)
    }
  }

  /**
   * Register a module with the data store service.
   * @param  {Object} module  The configuration for the module.
   * @return {undefined}
   */
  registerForm (form) {
    let module = { namespace: form.namespace, bootstrap: ['form'], form: form.fields }
    try {
      this.createStoreModule(module)
    } catch (exception) {
      this.throwNamespaceError(module, exception)
    }
  }

  /**
   * Create a module in the data store.
   * @param  {Object} module  The configuration for the module.
   * @return {undefined}
   */
  createStoreModule (module) {
    module.namespaced = true

    if (module.namespace === undefined) {
      module.namespace = this.namespace
    }

    if (module.namespace && Array.isArray(module.namespace)) {
      return app.store.registerModule(module.namespace, module)
    }

    return app.store.registerModule(module.namespace.split('/'), module)
  }

  /**
   * Throw an error if the user tries to register under a namespace that doesn't exist.
   * @param  {string} exception  Stack trace exception.
   * @return {undefined}
   */
  throwNamespaceError (module, exception) {
    error(`You may be trying to register a model in the store under a module that does not exist: ${module.namespace}`, 'Blueprint')
    throw new Error(exception)
  }
}
