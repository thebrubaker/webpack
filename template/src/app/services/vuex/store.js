import Vuex from 'vuex'
import Vue from 'vue'
import bootstrap from './vuex-bootstrappers'
import Cache from './cache'

Vue.use(Vuex)

export default class VuexStoreService {

  /**
   * Bootstraps modules and creates a new Vuex store
   * @param  {object} config  Store configuration.
   * @return {undefined}
   */
  constructor (config) {
    this.config = config
    this.vuex = new Vuex.Store(config)
  }

  /**
   * Load modules into the data store.
   * @param  {Object} modules  The modules.
   * @return {undefined}
   */
  init (modules) {
    this.modules = this.registerModules(modules)
    this.initialState = this.deepCopy(this.vuex.state)
    this.cachedData = this.bootCachedData()
  }

  /**
   * Deep copy an object, such as the state of the data store.
   * @param  {Object} object  The object to be copied
   * @return {Object}  The new, copied object.
   */
  deepCopy (object) {
    return JSON.parse(JSON.stringify(object))
  }

  /**
   * Mutates the module by bootstrapping state, mutations, getters and actions if
   * configured under module.bootstrap.
   * @param  {Object} module  Data store module.
   * @return {Object}  The bootstrapped module.
   */
  bootstrapModule (module) {
    return bootstrap.module(module)
  }

  /**
   * Reset the state of the data store module to the initial state.
   * @param  {string} namespace  The namespace of the module
   * @return {Cache}
   */
  reset (namespace) {
    return this.commit(`${namespace}`, namespace.split('/').reduce((carry, key) => {
      return carry[key]
    }, this.initialState))
  }

  /**
   * Load data from local storage into the data store.
   * @return {undefined}
   */
  bootCachedData () {
    return Object.keys(this.vuex['_mutations']).map(item => {
      return this.loadFromCache(item)
    })
  }

  /**
   * Load some data into the store from local storage
   * @param {string} key  The key in local storage.
   * @return {object}  The data loaded from local storage.
   */
  loadFromCache (key) {
    let value = Cache.load(key)
    if (value !== null) this.set(key, value)
    return { key, value }
  }

  /**
   * Commit a mutation
   * @param  {string} key  The name of the mutation.
   * @param  {any} value  The value for the mutation.
   * @return {Cache} Cache
   */
  commit (key, value) {
    this.vuex.commit(key, value)

    return new Cache(key, value)
  }

  /**
   * Dispatch an action
   * @param  {string} type Constant that gets captured by the store's reducer
   * @param  {any} payload Object store mutator
   * @return {object} dispatch
   */
  dispatch (type, payload) {
    return this.vuex.dispatch(type, payload)
  }

  /**
   * Replace the store's root state. Use this only for state
   * hydration / time-travel purposes.
   * @param {object} state as it currently exists
   * @return {object} state updated state
   */
  replaceState (state) {
    return this.vuex.replaceState(state)
  }

  /**
   * Reactively watch a getter function's return value, and call the callback
   * when the value changes. The getter receives the store's state as the
   * only argument. Accepts an optional options object that takes the same
   * options as Vue's vm.$watch method. To stop watching, call the returned
   * handle function.
   * @param  {Function} getter store's current state
   * @param  {Function} callback executes when change is detected
   * @param  {object}  options optional, i.e. vm.$watch method
   * @return {Function} $watch
   */
  watch (getter, callback, options) {
    return this.vuex.watch(getter, callback, options)
  }

  /**
   * Subscribe to store mutations. The handler is called after every mutation and
   * receives the mutation descriptor and post-mutation state as arguments.
   * @param  {Function} handler callback
   * @returns {Function} callback
   */
  subscribe (handler) {
    return this.vuex.subscribe(handler)
  }

  /**
   * Register modules with the data store.
   * @param  {Object} modules  An object of modules.
   * @return {undefined}
   */
  registerModules (modules) {
    return Object.keys(modules).map(key => {
      return this.registerModule(key, modules[key])
    })
  }

  /**
   * Register a dynamic module.
   * @param  {string|Array} path  The path to register the module.
   * @param  {Module} module  The module to be registered.
   * @return {Object}  The registered module.
   */
  registerModule (path, module) {
    this.bootstrapModule(module)
    this.vuex.registerModule(path, module)

    return module
  }

  /**
   * Unregister a dynamic module.
   * @param  {string|Array} path  The path to register the module.
   * @return {undefined}
   */
  unregisterModule (path) {
    return this.vuex.unregisterModule(path)
  }

  /**
   * Hot swap new actions and mutations.
   * @param  {Object} newOptions  The new options.
   * @return {undefined}
   */
  hotUpdate (newOptions) {
    return this.vuex.hotUpdate(newOptions)
  }

  /**
   * Get a property from the store using `getters`
   * @param  {string} key that needs to be updated
   * @return {mixed} returns the value of the updated key or an error log if key
   * is missing.
   */
  get (key) {
    if (typeof this.vuex.getters[key] === 'undefined') {
      return error(`You are trying to access an undefined getter "${key}" on your data store.`, 'VuexStoreService')
    }

    return this.vuex.getters[key]
  }

  /**
   * Set a property through an action on the store
   * @param {string} key that needs setting
   * @param {any} value the value passed
   * @return {Function} commit
   */
  set (key, value) {
    return this.commit(key, value)
  }

  /**
   * Map data to the data store through mutations
   * @param  {string} module  The name of the module namespace.
   * @param  {object} data  The data to be mapped.
   * @return {undefined}
   */
  mapDataToState (module, data) {
    Object.keys(data).forEach(key => {
      let name = `${module}/${key}`
      if (this.vuex['_mutations'][name] !== undefined) {
        this.set(name, data[key])
      }
    })
  }
}
