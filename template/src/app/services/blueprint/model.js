import Blueprint from './blueprint'

export default class ModelService {

  /**
   * Construct the service.
   * @param  {Array} models  A list of models to be registered.
   * @return {ModelService}  The Model Service.
   */
  constructor (models) {
    this.config = models
    this.blueprints = this.createBlueprints(models)
  }

  /**
   * Return all models.
   * @return {Array}  An array of all models.
   */
  all () {
    return this.blueprints
  }

  /**
   * Loop through each model and execute a callback.
   * @param  {Function} callback  The callback for registration.
   * @return {undefined}
   */
  register (callback) {
    Object.keys(this.blueprints).forEach(key => {
      callback(this.blueprints[key])
    })
  }

  /**
   * Load a model by namespace.
   * @param  {string} namespace  The namespace of the model.
   * @return {Blueprint}  The requested model.
   */
  load (namespace) {
    if (this.blueprints[namespace] === undefined) {
      return error(`You are trying to access a model that does not exist: ${namespace}`, 'Model')
    }

    return this.blueprints[namespace]
  }

  /**
   * Boot the models configuration into an array of Blueprints.
   * @param  {object} models  The models configuration.
   * @return {object}  A models object.
   */
  createBlueprints (models) {
    return Object.keys(models).reduce((carry, key) => {
      carry[key] = new Blueprint({ namespace: key, ...models[key] })
      return carry
    }, {})
  }

  /**
   * Boot all models into the application.
   * @return {undefined}
   */
  boot () {
    Object.keys(this.blueprints).forEach(key => this.blueprints[key].boot())
  }
}
