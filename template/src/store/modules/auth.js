export default {
  namespaced: true,
  getters: {
    'user' (state) {
      return state.user
    },
    'guard' (state) {
      return state.guard
    }
  },
  modules: {
    user: {
      namespaced: true,
      bootstrap: [
        'getters',
        'mutations'
      ],
      state: {
        name: '',
        first_name: '',
        last_name: '',
        email: '',
        scopes: []
      }
    },
    guard: {
      namespaced: true,
      bootstrap: [
        'getters',
        'mutations'
      ],
      state: {
        token_type: '',
        expires_in: '',
        access_token: '',
        refresh_token: ''
      }
    }
  }
}
