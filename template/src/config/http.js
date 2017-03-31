export default {
  /**
   * Default settings for the http service
   * @type {Object}
   */
  defaults: {

    /**
     * Duration before timing out
     * @type {Number}
     */
    timeout: 2500,

    /**
     * Headers
     * @type {Object}
     */
    headers: {

      /**
       * Common headers on all requests
       * @type {Object}
       */
      common: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    }
  }
}
