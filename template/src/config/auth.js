export default {

  /**
   * Where to redirect a guest user on an auth check.
   */
  'guest': '/login',

  /**
   * Where to redirect an authorized user.
   */
  'redirect': '/dashboard',

  /**
   * The namespace of the user object in the data store
   */
  'user_namespace': 'auth/user',

  /**
   * The namespace of the guard object in the data store
   */
  'guard_namespace': 'auth/guard',

  /**
   * The driver used for authentication.
   * @type {String}
   */
  driver: 'firebase'
}
