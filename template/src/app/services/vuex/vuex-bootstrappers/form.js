export default function bootstrapForm (module) {
  /**
   * Filters state for properties with `isValid` and reduces
   * a final boolean to see if the entire `state` is valid.
   * If a single attribute is invalid on the state, it will
   * return false.
   * @param  {object} state takes modified state
   * @return {boolean} boolean to see if the entire `state` is valid.
   */
  if (module.getters['isValid'] === undefined) {
    module.getters['isValid'] = function (state) {
      return Object.keys(module.form).filter(property => {
        return state[property].hasOwnProperty('isValid')
      }).reduce((isValid, property) => {
        return !isValid ? false : isValid === state[property].isValid
      }, true)
    }
  }

  /**
   * Filters state for properties with `isModified` and reduces
   * a final boolean to see if any part of the `state` is modified.
   * If a single attribute is modified on the state, it will
   * return true.
   * @param  {object} state takes modified state
   * @return {boolean} boolean to see if any part of the `state` is modified.
   */
  if (module.getters['isModified'] === undefined) {
    module.getters['isModified'] = function (state) {
      return Object.keys(module.form).reduce((isModified, property) => {
        return isModified ? true : isModified !== state[property].isModified
      }, false)
    }
  }

  /**
   * Filters state for properties with `isDirty` and reduces
   * a final boolean to see if any part of the `state` is modified.
   * If a single attribute is modified on the state, it will
   * return true.
   * @param  {object} state takes modified state
   * @return {boolean} boolean to see if any part of the `state` is modified.
   */
  if (module.getters['isDirty'] === undefined) {
    module.getters['isDirty'] = function (state) {
      return Object.keys(module.form).reduce((isDirty, property) => {
        return isDirty ? true : isDirty !== state[property].isDirty
      }, false)
    }
  }

  /**
   * namespaces the module's actions with the corresponding state for isModified, isDirty and originalValue
   * @param  {object} store global state
   * @return {undefined} undefined
   */
  if (module.actions['mapForm'] === undefined) {
    module.actions['mapForm'] = function ({ state, commit }, data) {
      Object.keys(module.form).forEach(key => {
        if (data[key] !== undefined) {
          commit(`${key}`, data[key])
          commit(`${key}.isModified`, false)
          commit(`${key}.isDirty`, false)
          commit(`${key}.originalValue`, data[key])
        }

        if (module.form[key].schema) {
          module.form[key].schema.validate(state[key]).then(() => {
            commit(`${key}.isValid`, true)
          }).catch(invalid => {
            if (invalid) {
              commit(`${key}.isValid`, false)
            }
          })
        } else {
          commit(`${key}.isValid`, true)
        }
      })
    }

    if (module.actions['saved'] === undefined) {
      module.actions['saved'] = function ({ state, commit }, data) {
        commit('saved', true)
        commit('resolving', false)
        setTimeout(() => {
          commit('saved', false)
        }, 1000)
      }
    }

    if (module.actions['resolving'] === undefined) {
      module.actions['resolving'] = function ({ state, commit }, boolean) {
        commit('resolving', boolean === undefined ? true : boolean)
      }
    }

    if (module.actions['failed'] === undefined) {
      module.actions['failed'] = function ({ state, commit }, data) {
        commit('failed', true)
        commit('resolving', false)
        setTimeout(() => {
          commit('failed', false)
        }, 1000)
      }
    }
  }

  /**
   * Reset the modified / dirty state of the form
   * @param  {object} options.state  The state object.
   * @param  {function} options.commit  The funcation for commiting a mutation.
   * @return {undefined}
   */
  if (module.actions['resetForm'] === undefined) {
    module.actions['resetForm'] = function ({ state, commit }) {
      Object.keys(module.form).forEach(key => {
        commit(`${key}.isModified`, false)
        commit(`${key}.isDirty`, false)
        commit(`${key}.originalValue`, state[key].value)
      })
    }
  }

  /**
   * Set the state, getter and mutation for each of the following.
   */
  ['resolving', 'saved', 'failed'].forEach(key => {
    if (module.state[key] === undefined) {
      module.state[key] = false
    }

    if (module.getters[key] === undefined) {
      module.getters[key] = function (state) {
        return state[key]
      }
    }

    if (module.mutations[key] === undefined) {
      module.mutations[key] = function (state, value) {
        state[key] = value
      }
    }
  })

  /**
   * Set the state / mutations / getters for each key
   * @param  {[type]} state [description]
   * @return {[type]}       [description]
   */
  Object.keys(module.form).forEach(key => {
    /**
     * Set the state for the key on the module.
     */
    module.state[key] = {
      value: module.form[key].default,
      originalValue: module.form[key].default,
      isModified: false,
      isDirty: false,
      isValid: false,
      errorMessage: module.form[key].errorMessage || ''
    }

    /**
     * Set a getter for accessing the key.
     * @param  {object} state
     * @return {mixed}
     */
    module.getters[key] = function (state) {
      return state[key].value
    }

    /**
     * namespaces the module's getters with the corresponding state for originalValue
     * @param  {object} state local state
     * @return {boolean} returns originalValue
     */
    module.getters[`${key}.originalValue`] = function (state) {
      return state[key].originalValue
    }

    /**
     * namespaces the module's getters with the corresponding state for isModified
     * @param  {object} state local state
     * @return {boolean} returns isModified as a boolean
     */
    module.getters[`${key}.isModified`] = function (state) {
      return state[key].isModified
    }

    /**
     * namespaces the module's getters with the corresponding state for isDirty
     * @param  {object} state local state
     * @return {boolean} returns isDirty as a boolean
     */
    module.getters[`${key}.isDirty`] = function (state) {
      return state[key].isDirty
    }

    /**
     * modifies getter with namespaced keys to return isValid
     * @param  {object} state of namespaced module
     * @return {boolean} returns isValid as a boolean
     */
    module.getters[`${key}.isValid`] = function (state) {
      return state[key].isValid
    }

    /**
     * modifies getter with namespaced keys to return errorMessage
     * @param  {object} state of namespaced module
     * @return {string} returns errorMessage as a string
     */
    module.getters[`${key}.errorMessage`] = function (state) {
      return state[key].errorMessage
    }

    /**
     * Mutation for setting the value
     * @param  {object} state
     * @param  {mixed} value
     * @return {undefined}
     */
    module.mutations[key] = function (state, value) {
      state[key].value = value
    }

    /**
     * Mutation for setting originalValue
     * @param  {object} state local state
     * @param {mixed} value The value to be set.
     * @return {undefined}
     */
    module.mutations[`${key}.originalValue`] = function (state, value) {
      state[key].originalValue = value
    }

    /**
     * Mutation for setting isModified
     * @param  {object} state local state
     * @param {mixed} value The value to be set.
     * @return {undefined}
     */
    module.mutations[`${key}.isModified`] = function (state, value) {
      state[key].isModified = value
    }

    /**
     * Mutation for setting isDirty
     * @param  {object} state local state
     * @param {mixed} value The value to be set.
     * @return {undefined}
     */
    module.mutations[`${key}.isDirty`] = function (state, value) {
      state[key].isDirty = value
    }

    /**
     * Mutation for setting isValid
     * @param  {object} state of namespaced module
     * @param {mixed} value The value to be set.
     * @return {undefined}
     */
    module.mutations[`${key}.isValid`] = function (state, value) {
      state[key].isValid = value
    }

    /**
     * Mutation for setting errorMessage
     * @param  {object} state of namespaced module
     * @param {mixed} value The value to be set.
     * @return {undefined}
     */
    module.mutations[`${key}.errorMessage`] = function (state, value) {
      state[key].errorMessage = value
    }

    /**
     * Set the key value / modified / dirty / valid
     * @param  {object} state
     * @param  {mixed} value
     * @return {undefined}
     */
    module.actions[key] = function ({ state, commit }, value) {
      commit(`${key}`, value)
      commit(`${key}.isModified`, value !== state[key].originalValue)
      if (!state[key].isDirty) {
        commit(`${key}.isDirty`, true)
      }
      if (module.form[key].schema) {
        module.form[key].schema.validate(value).then(() => {
          commit(`${key}.isValid`, true)
        }).catch(invalid => {
          if (invalid) {
            commit(`${key}.isValid`, false)
          }
        })
      } else {
        commit(`${key}.isValid`, true)
      }
    }

    /**
     * Validate the key
     * @param  {object} options.state
     * @param  {function} options.commit
     * @param  {mixed} value
     * @return {undefined}
     */
    module.actions[`${key}.validate`] = function ({ state, commit }) {
      if (module.form[key].schema) {
        module.form[key].schema.validate(state[key].value).then(() => {
          commit(`${key}.isValid`, true)
        }).catch(invalid => {
          if (invalid) {
            commit(`${key}.isValid`, false)
          }
        })
      } else {
        commit(`${key}.isValid`, true)
      }
    }
  })
}
