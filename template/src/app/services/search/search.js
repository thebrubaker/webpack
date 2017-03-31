import AlgoliaSearchDriver from './drivers/algolia-search-driver'
import LaravelSearchDriver from './drivers/laravel-search-driver'

export default class SearchService {

  /**
   * Configure the search service.
   * @param  {object} config The configuration for algolia.
   * @return {AlgoliaSearchService} The service.
   */
  constructor (config) {
    this.config = config
    this.drivers = {
      'algolia': new AlgoliaSearchDriver(config),
      'laravel': new LaravelSearchDriver(config)
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
        return error(`The driver selected is not valid: '${type}'`, 'SearchService')
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
      return error(`The driver selected is not valid: '${type}'`, 'SearchService')
    }

    this.selectedDriver = this.drivers[type]
  }

  /**
   * Send a search query to Algolia.
   * @param  {string} query The query to be searched.
   * @param  {array} config The indices to be searched.
   * @return {Promise} A promise that resolves with the response from Algolia.
   */
  search (query, config) {
    return this.selectedDriver.search(query, config)
  }

  /**
   * Search many indices using a single query
   * @param  {array} indices An array of indices to search.
   * @param  {string} query   The query to be searched.
   * @param  {object} params  An object of configuration for the search.
   * @return {Promise} A promise that resolves with the response from Algolia.
   */
  searchIndices (indices, query, params = {}) {
    return this.selectedDriver.searchIndices(indices, query, params)
  }

  /**
   * Search an index using a query.
   * @param  {string} index The index to be searched.
   * @param  {string} query   The query to be searched.
   * @param  {object} params  An object of configuration for the search.
   * @return {Promise} A promise that resolves with the response from Algolia.
   */
  searchIndex (index, query, params = {}) {
    return this.selectedDriver.searchIndex(index, query, params)
  }
}
