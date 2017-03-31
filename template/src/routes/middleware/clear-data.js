export default {
  handleBefore (app) {
    return (to, from, next) => {
      return next()
    }
  },
  handleAfter (app) {

  }
}
