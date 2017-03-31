export default function bootstrapTable (module) {
  if (module.state.searching === undefined) {
    module.state.searching = false
  }
  if (module.state.query === undefined) {
    module.state.query = ''
  }
  if (module.state.index === undefined) {
    throw new Error('[Vuex Bootstrap] The index must be defined when boostrapping a table.')
  }
  if (module.state.facets === undefined) {
    module.state.facets = '*'
  }
  if (module.state.perPage === undefined) {
    module.state.perPage = 15
  }
  if (module.state.filters === undefined) {
    module.state.filters = {}
  }
  if (module.state.results === undefined) {
    module.state.results = []
  }
  if (module.state.total === undefined) {
    module.state.total = 0
  }
  if (module.state.pages === undefined) {
    module.state.pages = 0
  }
  if (module.state.page === undefined) {
    module.state.page = 1
  }
  if (module.state.sort === undefined) {
    module.state.sort = ''
  }
  if (module.getters.newSearch === undefined) {
    module.getters.newSearch = ({ index, query, perPage, facets, filters, sort }) => {
      return { index, query, perPage, filters, sort, facets }
    }
  }
  if (module.mutations.filter === undefined) {
    module.mutations.filter = (state, filter) => {
      state.filters = Object.assign({}, state.filters, filter)
    }
  }
}
