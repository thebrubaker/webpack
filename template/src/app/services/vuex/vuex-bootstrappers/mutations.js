export default function mutations (module) {
  Object.keys(module.state).forEach(key => {
    if (module.mutations[key] === undefined) {
      module.mutations[key] = function (state, value) {
        state[key] = value
      }
    }
  })
}
