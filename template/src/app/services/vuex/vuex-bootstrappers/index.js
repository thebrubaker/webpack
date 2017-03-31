import defaults from './defaults'
import form from './form'
import getters from './getters'
import mutations from './mutations'
import table from './table'

export default {
  /**
  * Bootstrap vuex modules using the available bootstrappers
  * @param  {object} modules  The modules to be bootstrapped
  * @return {undefined}
  */
  modules (modules) {
    Object.keys(modules).forEach(key => {
      this.module(modules[key])
    })

    return modules
  },

  /**
   * Bootstrap the module using the module.bootstrap array for which types to bootstrap.
   * @param  {object} module each module in the store
   * @return {undefined}
   */
  module (module) {
    if (module.bootstrap) {
      this.defaults(module)
      module.bootstrap.forEach(type => {
        switch (type) {
          case 'form':
            return this.form(module)
          case 'table':
            return this.table(module)
          case 'getters':
            return this.getters(module)
          case 'mutations':
            return this.mutations(module)
          default: throw new Error('[Vuex Bootstrappers] Bootstrap type does not exist: ' + type)
        }
      })
    }

    if (module.modules) {
      this.modules(module.modules)
    }
  },
  defaults,
  form,
  getters,
  mutations,
  table
}
