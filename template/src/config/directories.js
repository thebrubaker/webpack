/**
 * Register each directory you would like to be able to import
 * with the src/utilities/directory function.
 */
export default {
  'src/config': require.context('src/config', false, /\.js$/),
  'store/modules': require.context('store/modules', false, /\.js$/),
  'src/models': require.context('src/models', true, /\.js$/),
  'routes/middleware': require.context('routes/middleware', false, /\.js$/),
  'src/events': require.context('src/events', false, /\.js$/)
}
