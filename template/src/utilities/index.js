/**
 * Return the filenames from a directory of files. Use webpacks `require.context`
 * to grab all files from a directory.
 * @param  {webpackEmptyContext|webpackContext} directory A webpack context function
 * @return {array} An array of filenames from the directory.
 */
export function getFilenames (directory) {
  return directory.keys().map(key => key.match(/([^/]+)(?=\.\w+$)/)[0])
}

/**
 * Create an object where each key is the name of the file from
 * the import, and the value is the default export from that import.
 * @param  {array} imports A list of imports
 * @param  {array} filenames An array of filenames to map the imports to
 * @return {object} Ab object that maps filenames to the imports
 */
export function mapImportsToFilenames (imports, filenames) {
  return imports.reduce((files, provider, index) => {
    files[filenames[index]] = provider.default
    return files
  }, {})
}

/**
 * Import an entire directory.
 * @param  {webpackEmptyContext|webpackContext} directory  The directory to import.
 * @return {object}
 */
export function importDirectory (directory) {
  const imports = directory.keys().map(directory)
  let filenames = getFilenames(directory)

  return mapImportsToFilenames(imports, filenames)
}

/**
 * Namespace the keys on an object with a string. Warning: this method will
 * replace the original keys with namespaced keys.
 * @param  {string} name The name to be prepended to each key
 * @param  {object} object The object to be crawled
 * @return {object} The object after the keys have been transformed
 */
export function namespaceKeys (name, object) {
  return Object.keys(object).reduce((newObject, key) => {
    newObject[`${name}.${key}`] = object[key]
    return newObject
  }, {})
}

// Similar to ES6's rest param (http://ariya.ofilabs.com/2013/03/es6-and-rest-parameter.html)
// This accumulates the arguments passed into an array, after a given index.
const restArgs = function (func, startIndex) {
  startIndex = startIndex == null
    ? func.length - 1
    : +startIndex
  return function () {
    var length = Math.max(arguments.length - startIndex, 0)
    var rest = Array(length)
    let index = 0
    for (; index < length; index++) {
      rest[index] = arguments[index + startIndex]
    }
    switch (startIndex) {
      case 0:
        return func.call(this, rest)
      case 1:
        return func.call(this, arguments[0], rest)
      case 2:
        return func.call(this, arguments[0], arguments[1], rest)
    }
    var args = Array(startIndex + 1)
    for (index = 0; index < startIndex; index++) {
      args[index] = arguments[index]
    }
    args[startIndex] = rest
    return func.apply(this, args)
  }
}

// Delays a function for the given number of milliseconds, and then calls
// it with the arguments supplied.
const delay = restArgs(function (func, wait, args) {
  return setTimeout(function () {
    return func.apply(null, args)
  }, wait)
})

/**
 * Returns a function, that, as long as it continues to be invoked, will not
 * be triggered. The function will be called after it stops being called for
 * N milliseconds. If `immediate` is passed, trigger the function on the
 * leading edge, instead of the trailing.
 * @param  {function} func      Callback function
 * @param  {number} wait        Timeout in ms
 * @param  {boolean} immediate  If `immediate` is passed, trigger the function on the
 *                              leading edge, instead of the trailing.
 * @return {function}           Callback function after elapsed timeout
 */
export function debounce (func, wait, immediate) {
  let timeout
  let result

  var later = function (context, args) {
    timeout = null
    if (args) {
      result = func.apply(context, args)
    }
  }

  var debounced = restArgs(function (args) {
    if (timeout) {
      clearTimeout(timeout)
    }
    if (immediate) {
      var callNow = !timeout
      timeout = setTimeout(later, wait)
      if (callNow) {
        result = func.apply(this, args)
      }
    } else {
      timeout = delay(later, wait, this, args)
    }

    return result
  })

  debounced.cancel = function () {
    clearTimeout(timeout)
    timeout = null
  }

  return debounced
}

export default {
  getFilenames,
  importDirectory,
  namespaceKeys,
  debounce
}
