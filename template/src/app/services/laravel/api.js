/**
 * An implementation of the API service. This service handles
 * all requests to and responses from the configured API.
 */
export default class LaravelApiService {

  /**
   * The constructor for the API service.
   * @param  {ApiHttpDriver|ApiMockDriver} driver The driver for making requests to the application. Accepts
   * both an HTTP driver or a Mock driver for mocking responses.
   * @param  {object} config The configuration for the API, including the resources available on the api.
   * @return {ApiService} The API service.
   */
  constructor (http, config) {
    this.http = http.create(config)
    this.auth_path = config.auth_path
    this.config = config
  }

  /**
   * Send a put request. with the current pathList and parameters.
   * @param  {object} data The data to be sent with the request.
   * @param {object} config Optional configuration for the request.
   * @return {Promise} A promise that resolves / rejects with an HTTP response.
   */
  put (path, data, config = {}) {
    return this.http.put(path, data, config)
  }

  /**
   * Send a patch request with the current pathList and parameters.
   * @param  {object} data The data to be sent with the request.
   * @param {object} config Optional configuration for the request.
   * @return {Promise} A promise that resolves / rejects with an HTTP response.
   */
  patch (path, data, config = {}) {
    return this.http.patch(path, data, config)
  }

  /**
   * Send a post request with the current pathList and parameters.
   * @param  {object} data The data to be sent with the request.
   * @param {object} config Optional configuration for the request.
   * @return {Promise} A promise that resolves / rejects with an HTTP response.
   */
  post (path, data, config = {}) {
    return this.http.post(path, data, config)
  }

  /**
   * Send a delete request with the current pathList and parameters.
   * @param {object} config Optional configuration for the request.
   * @return {Promise} A promise that resolves / rejects with an HTTP response.
   */
  delete (path, config = {}) {
    return this.http.delete(path, config)
  }

  /**
   * Send a get request with the current pathList and parameters.
   * @param {object} config Optional configuration for the request.
   * @return {Promise} A promise that resolves / rejects with an HTTP response.
   */
  get (path, config = {}) {
    return this.http.get(path, config)
  }

  /**
   * Add a request interceptor
   * @param  {function} callback The middleware to be executed before the request.
   * @return {undefined}
   */
  addRequestMiddleware (callback) {
    return this.http.interceptors.request.use(callback)
  }

  /**
   * Add a response interceptor
   * @param  {function} callback The middleware to be executed before the response is returned.
   * @return {undefined}
   */
  addResponseMiddleware (callback) {
    return this.http.interceptors.response.use(callback)
  }
}
