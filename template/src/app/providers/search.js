import Search from 'services/search/search'
import config from 'src/config/search'

/**
 * These services are booted during app initialization.
 * @param  {Lantern} app The application.
 * @return {undefined}
 */
function boot (app) {
  app.bind('search', function (container) {
    let service = new Search(config)

    // Let's pull out the search function from the service, so it's easy to use for basic search queries,
    // but we'll also alias the more in-depth methods for complicated search queries.
    let search = service.search.bind(service)
    search.driver = service.driver.bind(service)
    search.index = service.searchIndex.bind(service)
    search.indices = service.searchIndices.bind(service)
    search.service = service

    return search
  })
}

/**
 * You can now use services that have been booted on app initialization to
 * register additional services.
 * @param  {Lantern} app The application.
 * @return {undefined}
 */
function register (app) {

}

export default { boot, register }
