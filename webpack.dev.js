const { merge } = require('webpack-merge')
const common = require('./webpack.common.js')
const path = require('path')

module.exports = merge(common('development'), {
  entry: {
    main: './index.ts',
  },
  output: {
    publicPath: '/'
  },
  devtool: 'eval-source-map',
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader'
      },
      {
        test: /\.(tsx?|js)$/,
        exclude: [/node_modules/, /tests/],
        use: {
          loader: 'ts-loader',
          options: {
            appendTsSuffixTo: [/\.vue$/]
          }
        }
      }
    ]
  },
  plugins: [],
  devServer: {
    port: 8080,
    historyApiFallback: {
      index: 'index.html',
      rewrites: [
        { from: /\/*/, to: '/index.html' }
      ]
    },
    proxy: {
      '/assets': {
        target: 'http://127.0.0.1:8080',
        pathRewrite: {'^/assets' : '/src/assets'}
      }
    },
    static: path.resolve(__dirname, 'public')
  }
})
