import axios from 'axios'

/**
 * An implementation of the HTTP service using Axios. This service handles
 * all HTTP requests and responses to the application.
 */
export default class AxiosHttpService {

  /**
   * Set axios as the http service and configure default http options.
   * @param  {Object} config The configuration for the service.
   * @return {AxiosHttpService} A new axios http service.
   */
  constructor (config) {
    this.service = axios
    this.config = config
  }

  /**
   * Set the defaults on the http services.
   * @param {Object} defaults The default options for http requests.
   * @return {undefined}
   */
  setDefaults (defaults) {
    Object.assign(this.service.defaults, defaults)
  }

  /**
   * Send a request using configuration.
   * @param  {Object} config Configuration for the request.
   * @return {Promise} The http request as a promise.
   */
  request (config) {
    return this.service.request(config)
  }

  /**
   * Make a new configured request.
   * @param  {Object} config Configuration for the request.
   * @return {Promise} The http request as a promise.
   */
  create (config) {
    return this.service.create(config)
  }

  /**
   * An alias for the `create` method.
   * @param  {Object} config Configure a new axios request.
   * @return {Axios} A configured instance of axios.
   */
  configure (config) {
    return this.create(config)
  }

  /**
   * Send a request using the GET method.
   * @param  {string} url The url for the request.
   * @param  {Object} config Configuration for the request.
   * @return {Promise} A promise that resolves / rejects with an http response.
   */
  get (url, config) {
    return this.service.get(url, config)
  }

  /**
   * Send a request using the DELETE method.
   * @param  {string} url The url for the request.
   * @param  {Object} config Configuration for the request.
   * @return {Promise} A promise that resolves / rejects with an http response.
   */
  delete (url, config) {
    return this.service.delete(url, config)
  }

  /**
   * Send a request using the HEAD method.
   * @param  {string} url The url for the request.
   * @param  {Object} config Configuration for the request.
   * @return {Promise} A promise that resolves / rejects with an http response.
   */
  head (url, config) {
    return this.service.head(url, config)
  }

  /**
   * Send a request using the POST method.
   * @param  {string} url The url for the request.
   * @param  {Object} data The body sent in the request.
   * @param  {Object} config Configuration for the request.
   * @return {Promise} A promise that resolves / rejects with an http response.
   */
  post (url, data, config) {
    return this.service.post(url, data, config)
  }

  /**
   * Send a request using the PUT method.
   * @param  {string} url The url for the request.
   * @param  {Object} data The body sent in the request.
   * @param  {Object} config Configuration for the request.
   * @return {Promise} A promise that resolves / rejects with an http response.
   */
  put (url, data, config) {
    return this.service.put(url, data, config)
  }

  /**
   * Send a request using the PATCH method.
   * @param  {string} url The url for the request.
   * @param  {Object} data The body sent in the request.
   * @param  {Object} config Configuration for the request.
   * @return {Promise} A promise that resolves / rejects with an http response.
   */
  patch (url, data, config) {
    return this.service.patch(url, data, config)
  }

  /**
   * Helper function for dealing with concurrent requests.
   * @param  {array} iterable An array of promises to be resolved.
   * @return {Promise} A promise that resolves / rejects with an http response.
   */
  all (iterable) {
    return this.service.all(iterable)
  }

  /**
   * Add a request interceptor.
   * @param  {function} callback The function to execute before each request.
   * @return {undefined}
   */
  requestMiddleware (callback) {
    return this.service.interceptors.request.use(callback)
  }

  /**
   * Add a response interceptor.
   * @param  {function} callback The function to execute after each request.
   * @return {undefined}
   */
  responseMiddleware (callback) {
    return this.service.interceptors.response.use(callback)
  }
}
