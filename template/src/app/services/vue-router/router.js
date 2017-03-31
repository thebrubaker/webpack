import Router from 'vue-router'
import Vue from 'vue'

Vue.use(Router)

/**
 * An implementation of the Router service using VueRouter. This service handles
 * route management.
 */
export default class VueRouterService {
  /**
   * Constructs the router service.
   * @param  {object} config The configuration for the router.
   * @return {VueRouterService} The router service.
   */
  constructor (config, routes) {
    this.service = new Router({ ...config, routes })
  }

  /**
   * Register a middleware with the router service.
   * @param  {Lantern} app The global application
   * @param  {array} middlewares The middleswares to be registered.
   * @return {undefined}
   */
  registerMiddleware (app, middlewares) {
    Object.keys(middlewares).forEach(key => {
      this.beforeEach(middlewares[key].handleBefore(app))
      this.afterEach(middlewares[key].handleAfter(app))
    })
  }

  /**
   * Register a guard before each route.
   * @param  {object} guard The guard to run before each route
   * @return {undefined}
   */
  beforeEach (guard) {
    return this.service.beforeEach(guard)
  }

  /**
   * Register a hook after each route.
   * @param  {object} hook The hook to run after each route
   * @return {undefined}
   */
  afterEach (hook) {
    return this.service.afterEach(hook)
  }

  /**
   * Push a new route.
   * @param  {string} location The location to push onto the route.
   * @return {undefined}
   */
  push (location) {
    return this.service.push(location)
  }

  /**
   * Replace the current route.
   * @param  {string} location The location to replace.
   * @return {undefined}
   */
  replace (location) {
    return this.service.replace(location)
  }

  /**
   * Get matched components for a location
   * @param  {string} location The location to get matched components for.
   * @return {array} The matched components.
   */
  getMatchedComponents (location) {
    return this.service.getMatchedComponents(location)
  }

  /**
   * Reverse URL resolving.
   * @param  {string} location The location to resolve.
   * @param  {object} current  The current route.
   * @param  {string} append No idea.
   * @return {Object} Router link object.
   */
  resolve (location, current, append) {
    return this.service.resolve(location, current, append)
  }

  /**
   * Go forward n steps in browser history.
   * @param  {number} n Number to go forward
   * @return {undefined}
   */
  go (n) {
    return this.service.go(n)
  }

  /**
   * Go back in history.
   * @return {undefined}
   */
  back () {
    return this.service.back()
  }

  /**
   * Go forward in history.
   * @return {undefined}
   */
  forward () {
    return this.service.forward()
  }

  /**
   * Return the router application
   * @return {object} The application.
   */
  get app () {
    return this.service.app
  }

  /**
   * Get the mode of the service
   * @return {object} The mode.
   */
  get mode () {
    return this.service.mode
  }

  /**
   * The current route.
   * @return {string} The current route.
   */
  get currentRoute () {
    return this.service.currentRoute
  }
}

