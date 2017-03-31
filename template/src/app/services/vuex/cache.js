/**
 * An object for caching value in storage using a key. Best when returned
 * from a function that sets the key / value in the data store.
 */
export default class Cache {

  /**
   * Constructor for the Cache class
   * @param  {string} key to check against cache to see if it exists
   * @param  {mixed} value ...if not, then associate with this value
   * @return {Cache} this Cache
   */
  constructor (key, value) {
    this.key = key
    this.value = value
  }

  /**
   * Cache a value to a given key
   * @param {string} key setting key
   * @param {any} value setting value
   * @return {Cache} this Cache
   */
  cache (key = null, value = null) {
    if (this.value === undefined || value === undefined) {
      throw new Error('CacheError: value undefined')
    }
    key === null
      ? window.localStorage.setItem(this.key, JSON.stringify(this.value))
      : window.localStorage.setItem(key, JSON.stringify(value))

    return this
  }

  /**
   * Clear the cache for a given key
   * @param  {string} key to clear
   * @return {Cache} this Cache
   */
  clearCache (key = null) {
    key === null
      ? window.localStorage.removeItem(this.key)
      : window.localStorage.removeItem(key)

    return this
  }

  /**
   * Load a key from storage and JSON parse it.
   * @param  {string} key  The key in local storage.
   * @return {mixed}  The returned value from local storage.
   */
  static load (key) {
    return JSON.parse(window.localStorage.getItem(key))
  }
}
