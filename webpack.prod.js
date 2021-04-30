const { merge } = require('webpack-merge')
const common = require('./webpack.common.js')

const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin');
const HtmlInlineScriptPlugin = require('html-inline-script-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const path = require('path')

module.exports = merge(common('production'), {
  output: {
    publicPath: '/'
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader'
      },
      {
        test: /\.(ts|js)$/,
        exclude: file => (
          /node_modules/.test(file) &&
          !/\.vue\.js/.test(file)
        ),
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              ["@babel/preset-env", {
                "targets": {
                  'esmodules': true
                }
              }],
              "@babel/typescript"
            ],
            plugins: [
              "@babel/proposal-object-rest-spread",
              "@babel/plugin-transform-typescript",
              "@babel/plugin-syntax-dynamic-import",
              ["@babel/plugin-transform-runtime", {
                "corejs": 3
              }]
            ]
          }
        }
      }
    ]
  },
  plugins: [
    new HtmlInlineScriptPlugin([
      /\.bundle\.js$/,
    ]),
    new CopyPlugin({
      patterns: [
        { from: path.resolve(__dirname, 'public/content'), to: 'content' },
        { from: 'assets', to: 'assets' },
        { from: 'site.webmanifest' },
        { from: 'browserconfig.xml' },
        { from: 'dev.html', to: 'dev/index.html' },
      ]
    }),
    new CleanWebpackPlugin()
  ]
})
