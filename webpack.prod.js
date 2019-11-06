const merge = require('webpack-merge');
const { common, templateParameters } = require('./webpack.common.js');
const BabelMultiTargetPlugin = require('webpack-babel-multi-target-plugin').BabelMultiTargetPlugin;
const HtmlWebpackPlugin = require('html-webpack-plugin');

const BUILDMODE = 'production'

module.exports = merge(common, {
  mode: BUILDMODE,
  output: {
    publicPath: 'https://vc.pieterfiers.net/'
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: BabelMultiTargetPlugin.loader('vue-loader')
      },
      {
        test: /\.(tsx?|js)$/,
        loader: BabelMultiTargetPlugin.loader()
      }
    ]
  },
  plugins: [
    new BabelMultiTargetPlugin({
      babel: {
        presetOptions: {
          'corejs': 3,
          'useBuiltIns': 'entry'
        }
      }
    }),
    new HtmlWebpackPlugin({
      template: 'src/index.ejs',
      filename: 'index.html',
      templateParameters: templateParameters(BUILDMODE)
    })
  ]
});
