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
      template: 'src/index.ejs',
      filename: 'index.html',
      chunks: ['main']
    })
  ],
  devServer: {
    // contentBase: __dirname,
    compress: true,
    historyApiFallback: {
      index: 'index.html',
      rewrites: [
        { from: /\/*/, to: '/index.html' }
      ]
    },    
    overlay: true,
    // publicPath: "/"
  }
});

module.exports = config
