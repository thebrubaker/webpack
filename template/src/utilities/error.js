module.exports = function (message, type = false) {
  if (!type) {
    return console.error(`[App Warning] ${message}`)
  }

  return console.error(`[${type} Warning] ${message}`)
}
