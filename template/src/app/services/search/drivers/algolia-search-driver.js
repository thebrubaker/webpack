/**
 * An implementation of the Search service using Algolia. This service handles
 * sending requests to search indices and returning results.
 */
export default class AlgoliaSearch {
  /**
   * Configure the algolia search service.
   * @param  {object} config The configuration for algolia.
   * @return {AlgoliaSearchService} The service.
   */
  constructor (config) {
    this.config = config
    this.algolia = app.make('algolia')
  }

  /**
   * Send a search query to Algolia.
   * @param  {string} index The index to be searched.
   * @param  {string} query   The query to be searched.
   * @param  {object} params  An object of configuration for the search.
   * @return {Promise} A promise that resolves with the response from Algolia.
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
    return new Promise((resolve, reject) => {
      this.algolia.search(config, this.searchCallback.bind(this, resolve, reject))
    })
  }

  /**
   * Search many indices using a single query
   * @param  {array} indices An array of indices to search.
   * @param  {string} query   The query to be searched.
   * @param  {object} params  An object of configuration for the search.
   * @return {Promise} A promise that resolves with the response from Algolia.
   */
  searchIndices (indices, query, params = {}) {
    return new Promise((resolve, reject) => {
      let queries = this.mapIndices(indices, query, params)
      this.algolia.search(queries, this.searchCallback.bind(this, resolve, reject))
    })
  }

  /**
   * Search an index using a query.
   * @param  {string} index The index to be searched.
   * @param  {string} query   The query to be searched.
   * @param  {object} params  An object of configuration for the search.
   * @return {Promise} A promise that resolves with the response from Algolia.
   */
  searchIndex (index, query, params = {}) {
    return new Promise((resolve, reject) => {
      params = this.prepareParams(params)
      this.algolia.initIndex(index).search(query, params, this.searchCallback.bind(this, resolve, reject))
    })
  }

  /**
   * The callback for resolving / rejecting a search response from Algolia.
   * @param  {function} resolve The function to resolve a successful response.
   * @param  {function} reject The function to reject with an error response.
   * @param  {object} error The error if present.
   * @param  {object} response The response from Algolia.
   * @return {undefined}
   */
  searchCallback (resolve, reject, error, response) {
    error ? reject(error) : resolve(response)
  }

  /**
   * Map an array of indices to the payload Algolia needs.
   * @param  {array} indices An array of strings.
   * @param  {string} query The query to be searched across indices.
   * @param  {object} params The parameters to be sent with the request.
   * @return {array} The mapped array, ready to send to Algolia.
   */
  mapIndices (indices, query, params = {}) {
    return indices.map(indexName => {
      params = this.prepareParams(params)
      return { indexName, query, params }
    })
  }

  /**
   * Prepare a query using algolia search configuration
   * @param  {string} query The query to be searched.
   * @param  {array} config The configuration to search.
   * @return {object} The search payload and response mappings.
   */
  prepareQuery (query, config) {
    return config.map(({ indexName, params }) => {
      params = this.prepareParams(params)
      return { indexName, params, query }
    })
  }

  /**
   * Prepare parameters to be sent to Algolia.
   * @param  {object} params The parameters to be sent to Algolia.
   * @return {params}
   */
  prepareParams (params) {
    return Object.assign({}, params, {
      // Algolia uses a zero index for pages. That means when we ask for page (1),
      // we need to request page (0) from Algolia.
      page: params.page || 1 - 1,
      // We need to convert the filters {Object} into a string (see Algolia docs on filters)
      filters: params.filters ? this.parseFilters(params.filters) : ''
    })
  }

  /**
   * Convert filters into a string for Algolia filtering.
   * @param  {object} filters The filters to be converted into a string.
   * @return {string}  The filters string.
   */
  parseFilters (filters) {
    // Retrieve only relevant filters that aren't just empty strings
    return this.filterKeys(filters)
      // Convert the filters to strings so they can be sent to Algolia.
      .map(key => {
        if (typeof filters[key] === 'string') {
          return this.convertFilterExact(key, filters[key])
        }

        return this.convertFilterMinMax(key, filters[key])
      })
      // Wrap each filter in parenthesis so we can join them together
      .map(filter => {
        return `(${filter})`
      })
      // Join with `AND`
      .join(' AND ')
  }

  /**
   * Get the filter keys that are relevant. Exclude empty string values
   * @param  {[type]} filters [description]
   * @return {[type]}         [description]
   */
  filterKeys (filters) {
    return Object.keys(filters).filter(key => {
      if (typeof filters[key] === 'string') {
        return filters[key] !== ''
      }

      return (filters[key].min !== undefined && filters[key].min !== '') ||
        (filters[key].max !== undefined && filters[key].max !== '')
    })
  }

  /**
   * Convert an `exact` filter to a string
   * @param  {string} name  The name of the attribute to filter.
   * @param  {string} value  The value to filter.
   * @return {string} The filter as a string.
   */
  convertFilterExact (name, value) {
    if (value) {
      return `${name}:${value}`
    }

    return null
  }

  /**
   * Convert a min / max filter to a string.
   * @param  {string} name The name of the attribute to filter.
   * @param  {object} filter  The min / max object.
   * @return {string}  The filter as a string.
   */
  convertFilterMinMax (name, filter) {
    if (filter.min !== '' && filter.max !== '') {
      return `${name}: ${filter.min} TO ${filter.max}`
    }

    if (filter.min !== '' && filter.max === '') {
      return `${name} >= ${filter.min}`
    }

    if (filter.min === '' && filter.max !== '') {
      return `${name} <= ${filter.max}`
    }

    return null
  }
}
