import FirebaseAuthDriver from './drivers/firebase-auth-driver'
import LaravelSearchDriver from './drivers/laravel-auth-driver'

export default class AuthService {

  /**
   * The constructor for the auth service.
   * @param  {HttpService} http The service for making http requests.
   * @param  {DataStoreService} store  The service for storing and retrieving data.
   * @param  {object} config Configuration for the auth service.
   * @return {AuthService} The authentication service.
   */
  constructor (config) {
    this.config = config
    this.drivers = {
      firebase: app.make('firebase-auth-driver'),
      laravel: app.make('laravel-auth-driver')
    }
    this.driver = config.driver || 'no driver provided'
  }

  /**
   * Change the driver for the search service.
   * @param  {string} type  The type of driver.
   * @return {AlgoliaSearchDriver|LaravelSearchDriver}  The selected driver.
   */
  get driver () {
    return function (type) {
      if (this.drivers[type] === undefined) {
        return error(`The driver selected is not valid: '${type}'`, 'AuthService')
      }

      return this.drivers[type]
    }
  }

  /**
   * Set the selected driver from those that are available.
   * @param  {string} type  The driver to select.
   * @return {AlgoliaSearchDriver|LaravelSearchDriver}  The driver implementation.
   */
  set driver (type) {
    if (this.drivers[type] === undefined) {
      return error(`The driver selected is not valid: '${type}'`, 'AuthService')
    }

    this.selectedDriver = this.drivers[type]
  }

  /**
   * Returns the user's authentication status.
   * @return {Boolean} Returns true if the user is authenticated, otherwise false.
   */
  authenticated () {
    return this.selectedDriver.authenticated()
  }

  /**
   * Determine if the user is allowed to access a given route.
   * @param  {object} guard  The guard object
   * @return {boolean}  Returns true if the user is authorized, otherwise false.
   */
  allowed (guard) {
    return this.selectedDriver.allowed(guard)
  }

  /**
   * Return the current user's scopes
   * @return {array}  An array of the user's scopes.
   */
  scopes () {
    return this.selectedDriver.scopes()
  }

  /**
   * Determine if the user is allowed to access a given route.
   * @param  {Route} to The route the user is trying to access.
   * @return {Boolean} Returns true if the user is authorized, otherwise false.
   */
  routeGuard (route) {
    return this.selectedDriver.routeGuard(route)
  }

  /**
   * Return the current user.
   * @return {object} The authenticated user.
   */
  user () {
    return this.selectedDriver.user()
  }

  /**
   * Clear the data and cache for the user and the authentication guard.
   * @return {undefined}
   */
  logout () {
    return this.selectedDriver.logout()
  }

  /**
   * Send a login request with given credentials.
   * @param  {string} email  The username.
   * @param  {string} password  The password.
   * @return {Promise} Resolves with the authorized user.
   */
  attempt (email, password) {
    return this.selectedDriver.attempt(email, password)
  }

  /**
   * Refresh the user's access token.
   * @return {undefined}
   */
  refreshToken () {
    return this.selectedDriver.refreshToken()
  }
}
