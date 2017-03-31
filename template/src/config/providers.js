/**
 * List all service providers you want registered with the application. A service provider
 * should have two methods: bind(app) and register(app).
 * @type {Array}
 */
export default [
  require('src/app/providers/algolia'),
  require('src/app/providers/api'),
  require('src/app/providers/app'),
  require('src/app/providers/auth'),
  require('src/app/providers/events'),
  require('src/app/providers/firebase'),
  require('src/app/providers/http'),
  require('src/app/providers/model'),
  require('src/app/providers/router'),
  require('src/app/providers/search'),
  require('src/app/providers/store'),
  require('src/app/providers/view')
]
