export default function getters (module) {
  Object.keys(module.state).forEach(key => {
    if (module.getters[key] === undefined) {
      module.getters[key] = function (state) {
        return state[key]
      }
    }
  })
}
