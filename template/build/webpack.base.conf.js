require('dotenv').config()
var path = require('path')
var utils = require('./utils')
var config = require('../config')
var vueLoaderConfig = require('./vue-loader.conf')
var webpack = require("webpack")

function resolve (dir) {
  return path.join(__dirname, '..', dir)
}

module.exports = {
  entry: {
    app: './src/main.js'
  },
  output: {
    path: config.build.assetsRoot,
    filename: '[name].js',
    publicPath: process.env.NODE_ENV === 'production'
      ? config.build.assetsPublicPath
      : config.dev.assetsPublicPath
  },
  resolve: {
    extensions: ['.js', '.vue', '.json'],
    alias: {
      {{#if_eq build "standalone"}}
      'vue$': 'vue/dist/vue.esm.js',
      {{/if_eq}}
      '@': resolve('src')
    }
  },
  alias: {
    'app': resolve('src/bootstrap/app'),
    'assets': resolve('src/assets'),
    'bootstrap': resolve('src/bootstrap'),
    'drivers': resolve('src/app/drivers'),
    'components': resolve('src/components'),
    'layouts': resolve('src/components/layouts'),
    'pages': resolve('src/pages'),
    'services': resolve('src/app/services'),
    'src': resolve('src'),
    'store': resolve('src/store'),
    'routes': resolve('src/routes'),
    'utilities': resolve('src/utilities'),
    'vue$': 'vue/dist/vue.esm.js'
  },
  plugins: [
    new webpack.ProvidePlugin({
      'app': resolve('src/bootstrap/app'),
      'error': resolve('src/utilities/error'),
      'env': resolve('src/utilities/env'),
      'process.env': resolve('.env.json')
    })
  ],
  module: {
    rules: [
      {{#lint}}
      {
        test: /\.(js|vue)$/,
        loader: 'eslint-loader',
        enforce: 'pre',
        include: [resolve('src'), resolve('test')],
        options: {
          formatter: require('eslint-friendly-formatter')
        }
      },
      {{/lint}}
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: vueLoaderConfig
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        include: [resolve('src'), resolve('test')]
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('img/[name].[hash:7].[ext]')
        }
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('fonts/[name].[hash:7].[ext]')
        }
      }
    ]
  }
}
