/**
 * An implementation of the Search service using Algolia. This service handles
 * sending requests to search indices and returning results.
 */
export default class LaravelSearch {
  /**
   * Configure the algolia search service.
   * @param  {object} config The configuration for algolia.
   * @return {AlgoliaSearchService} The service.
   */
  constructor (config) {
    this.config = config
    this.api = app.make('api')
  }

  /**
   * Send a search query.
   * @param  {string} index The index to be searched.
   * @param  {string} query   The query to be searched.
   * @param  {object} params  An object of configuration for the search.
   * @return {Promise} A promise that resolves with the response.
   */
  search (index, query, config = {}) {
    return this.searchIndex(index, query, config)
  }

  /**
   * Send a custom-configured search.
   * @param  {object} config  Configuration for the search.
   * @return {Promise} A promise that resolves with the response from Algolia.
   */
  custom (config) {
    error('The laravel search driver does not support custom configuration yet.', 'LaravelSearch')
  }

  /**
   * Search many indices using a single query
   * @param  {array} indices An array of indices to search.
   * @param  {string} query   The query to be searched.
   * @param  {object} params  An object of configuration for the search.
   * @return {Promise} A promise that resolves with the response.
   */
  searchIndices (indices, query, params = {}) {
    error('The laravel search driver does not support searching multiple indices yet.', 'LaravelSearch')
  }

  /**
   * Search an index using a query.
   * @param  {string} index The index to be searched.
   * @param  {string} query   The query to be searched.
   * @param  {object} params  An object of configuration for the search.
   * @return {Promise} A promise that resolves with the response.
   */
  searchIndex (index, query, params = {}) {
    return new Promise((resolve, reject) => {
      this.api.get(index, { ...params, search: query }).then(response => {
        resolve(response.data)
      }).catch(response => {
        reject(response.data)
      })
    })
  }
}
