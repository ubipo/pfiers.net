const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');
const HtmlWebpackPlugin = require('html-webpack-plugin');


const config = merge(common('development'), {
  output: {
    publicPath: '/'
  },
  devtool: 'inline-source-map',
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
  plugins: [
    new HtmlWebpackPlugin({
      template: 'index.ejs',
      filename: 'index.html',
      chunks: ['main']
    })
  ],
  devServer: {
    // contentBase: __dirname,
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
    overlay: true,
    // publicPath: "/"
  }
});

module.exports = config
