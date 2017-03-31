export default {

  /**
   * The driver used to retrieve the model.
   * @type {String}
   */
  driver: 'firebase',

  /**
   * The name of the model.
   * @type {String}
   */
  name: 'example',

  /**
   * The location of the model.
   * @type {String}
   */
  location: 'examples',

  /**
   * If the driver supports loading relationships, define which
   * relationships you want loaded with the model.
   * @type {Array}
   */
  with: [
    'children'
  ],

  /**
   * Transform the request before it is sent.
   * @param  {object} data
   * @return {object}
   */
  transformRequest (data) {
    return data
  },

  /**
   * Transform the response before it hits the app.
   * @param  {object} data
   * @return {object}
   */
  transformResponse (data) {
    return data
  },

  /**
   * Register events for the model.
   * @type {Object}
   */
  events: {

    /**
     * Fired when the model is fetched.
     * @var {string}  message  The event name.
     * @var {object}  data  The newly created product.
     */
    'fetched' (event, data) {
      console.log(`[Event Fired: ${event}] ${this.name} was fetched.`, data)
    },

    /**
     * Fired when the model is created.
     * @var {string}  message  The event name.
     * @var {object}  data  The newly created product.
     */
    'created' (event, data) {
      console.log(` [Event Fired: ${event}] ${this.name} was created.`, data)
    },

    /**
     * Fired when the model is created.
     * @var {string}  message  The event name.
     * @var {object}  data  The updated product.
     */
    'updated' (event, data) {
      console.log(`[Event Fired: ${event}] ${this.name} was updated.`, data)
    },

    /**
     * Fired when the model is created.
     * @var {string}  message  The event name.
     * @var {object}  data  The updated product.
     */
    'deleted' (event, id) {
      console.log(`[Event Fired: ${event}] ${this.name} was deleted.`, id)
    }
  },

  /**
   * The configuration for creating a data store form module.
   * @type {Object}
   */
  form: {
    namespace: 'example/form',
    fields: {
      name: {
        default: '',
        validation: 'required|string',
        error: 'A name is required.'
      },
      message: {
        default: '',
        validation: 'required|string',
        error: 'A message is required.'
      }
    }
  },

  /**
   * The configuration for creating a data store module.
   * @type {Object}
   */
  module: {
    namespace: 'example',
    bootstrap: [ 'getters', 'mutations' ],
    state: {
      'name': '',
      'message': ''
    }
  }
}
