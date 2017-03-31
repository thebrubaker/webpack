import Vue from 'vue'

/**
 * A wrapper around vue's view layer to allow for easy extension
 * of custom attributes and delegation of various services
 */
export default class VueViewService {

  /**
   * Bootstraps modules and creates a new Vuex store
   * @param  {object} events Global events object
   * @param  {object} store Global store object
   * @param  {object} router Global router object
   * @param  {object} layout Global store object
   * @param  {object} config custom vue configurations
   * @return {undefined}
   */
  constructor ({ events, store, router, search, api, auth, http }, config) {
    this.store = store
    this.router = router
    this.selector = config.selector
  }

  /**
   * Register a plugin with Vue.
   * @param  {function|object} plugin  The plugin to install.
   * @return {undefined}
   */
  use (plugin) {
    Vue.use(plugin)
  }

  /**
   * Initialize the selected Vue Layout
   * @return {undefined} Returns nothing.
   */
  init (root) {
    let Root = Vue.extend(root)
    // eslint-disable-next-line
    return new Root({
      el: this.selector,
      router: this.router.service,
      store: this.store.vuex
    })
  }

  /**
   * Upgrade all components.
   * @param  {array} components  The components to be upgraded.
   * @return {undefined}
   */
  upgradeComponents (components) {
    components.forEach(component => {
      if (component.store) {
        Object.keys(component.store).forEach(namespace => {
          let computed = this.getComputedProperties(namespace, component.store[namespace].computed)
          Object.assign(component.computed, computed)
          let methods = this.getActionMethods(namespace, component.store[namespace].actions)
          Object.assign(component.methods, methods)
        })
      }
    })
  }

  /**
   * Get the computed properties for a namespace
   * @param {string} namespace  The namespace in the data store.
   * @param {array} properties  An array of strings that are the properties
   */
  getComputedProperties (namespace, properties) {
    let store = this.store
    return properties.reduce((carry, property) => {
      carry[property] = {
        get () {
          return store.get(`${namespace}/${property}`)
        },
        set (value) {
          store.set(`${namespace}/${property}`, value)
        }
      }

      return carry
    }, {})
  }

  getActionMethods (namespace, actions) {
    let store = this.store
    return actions.reduce((methods, action) => {
      methods[action] = function (argument) {
        store.dispatch(`${namespace}/${action}`, argument)
      }

      return methods
    }, {})
  }
}
