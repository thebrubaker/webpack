/**
 * Access an environment variable, or a fallback if none is provided.
 * @param  {string} key  The name of the env variable.
 * @param  {mixed} fallback  The fallback value if no env variable exists.
 * @return {mixed}  The requested env variable.
 */
module.exports = function env (key, fallback) {
  if (process.env[key] === undefined && fallback === undefined) {
    return error(`The environment variable you are trying to access does not exist: ${key}`, 'Env')
  }

  if (process.env[key] === undefined) {
    return fallback
  }

  return process.env[key]
}
