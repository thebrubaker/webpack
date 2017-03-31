import intersect from 'utilities/intersect'

/**
 * An implementation of the Auth service. This service handles
 * authentication and authorization for users.
 */
export default class FirebaseAuth {

  /**
   * The constructor for the auth service.
   * @param  {Firebase} firebase The service for making firebase requests.
   * @param  {object} config Configuration for the auth service.
   * @return {FirebaseAuth} The authentication service.
   */
  constructor (firebase, store, config) {
    this.firebase = firebase
    this.store = store
    this.config = config
  }

  /**
   * Returns the user's authentication status.
   * @return {Boolean} Returns true if the user is authenticated, otherwise false.
   */
  authenticated () {
    return this.token() !== ''
  }

  /**
   * Return the API access token.
   * @return {string} The api auth token.
   */
  token () {
    return this.store.get('auth/guard/access_token')
  }

  /**
   * Return the current user's scopes
   * @return {array}  An array of the user's scopes.
   */
  scopes () {
    return this.store.get('auth/user/scopes')
  }

  /**
   * Determine if the user is allowed to access a given route.
   * @param  {Route} to The route the user is trying to access.
   * @return {Boolean} Returns true if the user is authorized, otherwise false.
   */
  routeGuard ({ meta }) {
    if (meta && meta.guard) {
      return this.allowed(meta.guard)
    }

    return true
  }

  /**
   * Determine if the user is allowed to access a given route.
   * @param  {object} guard  The guard object
   * @return {boolean}  Returns true if the user is authorized, otherwise false.
   */
  allowed (guard) {
    if (guard && guard.allow) {
      return !!intersect(this.scopes(), guard.allow).length
    }

    if (guard && guard.deny) {
      return !intersect(this.scopes(), guard.allowed).length
    }

    return true
  }

  /**
   * Return the current user.
   * @return {object} The authenticated user.
   */
  user () {
    return this.store.get('auth/user')
  }

  /**
   * Clear the data and cache for the user and the authentication guard.
   * @return {Promise}
   */
  logout () {
    return new Promise((resolve, reject) => {
      this.firebase.auth().signOut().then(() => {
        this.store.reset('auth/user/name').clearCache()
        this.store.reset('auth/user/email').clearCache()
        this.store.reset('auth/guard/access_token').clearCache()
        resolve()
      }).catch(response => {
        error(response.message, 'FirebaseAuth')
        reject(response)
      })
    })
  }

  /**
   * Send a login request with given credentials.
   * @param  {string} credentials.username The username.
   * @param  {string} credentials.password The password.
   * @return {Promise} Resolves with the authorized user.
   */
  attempt (email, password) {
    return new Promise((resolve, reject) => {
      this.firebase.auth().signInWithEmailAndPassword(email, password).then(() => {
        this.fetchUser().getToken().then(token => {
          this.store.set('auth/guard/access_token', token).cache()
          resolve(this.store.get('auth/user'))
        }).catch(() => {
          error('Failed to retrieve user access token after attemping auth.', 'FirebaseAuth')
        })
      }).catch(response => {
        error(response.message, 'FirebaseAuth')
        reject(response)
      })
    })
  }

  /**
   * Fetch the current user.
   * @return {User}  The current user.
   */
  fetchUser () {
    let user = this.firebase.auth().currentUser

    if (user === null) return error('Failed to get user after authentication attempt.', 'FirebaseAuth')

    this.store.set('auth/user/name', user.displayName).cache()
    this.store.set('auth/user/email', user.email).cache()

    return user
  }

  /**
   * Refresh the user's access token.
   * @return {undefined}
   */
  refreshToken () {
    error('Token refresh hasn\'t been implemented yet.', 'FirebaseAuth')
  }
}
