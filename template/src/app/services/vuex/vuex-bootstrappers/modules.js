/**
* Bootstrap vuex modules using the available bootstrappers
* @param  {object} modules  The modules to be bootstrapped
* @return {undefined}
*/
export function modules (modules) {
  Object.keys(modules).forEach(key => {
    module(modules[key])
  })

  return modules
}

/**
 * Bootstrap the module using the module.bootstrap array for which types to bootstrap.
 * @param  {object} module each module in the store
 * @return {undefined}
 */
export function module (module) {
  debugger

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
    modules(module.modules)
  }
}

export default { modules, module }
