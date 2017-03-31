export default function defaults (module) {
  if (!module.state) {
    module.state = {}
  }

  if (!module.getters) {
    module.getters = {}
  }

  if (!module.mutations) {
    module.mutations = {}
  }

  if (!module.actions) {
    module.actions = {}
  }
}
