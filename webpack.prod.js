const merge = require('webpack-merge');
const { common, templateParameters } = require('./webpack.common.js');
const BabelMultiTargetPlugin = require('webpack-babel-multi-target-plugin').BabelMultiTargetPlugin;
const browserListQueries = require('./browserListQueries');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const HtmlWebpackInlineSourcePlugin = require('html-webpack-inline-source-plugin');

const BUILDMODE = 'production'

module.exports = merge(common, {
  mode: BUILDMODE,
  output: {
    publicPath: 'https://sh.pieterfiers.net/'
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: BabelMultiTargetPlugin.loader('vue-loader')
      },
      {
        test: /\.(tsx?|js)$/,
        use: [
          BabelMultiTargetPlugin.loader()
        ]
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: 'src/index.ejs',
      filename: 'index.html',
      chunks: ['inject.modern'],
      inlineSource: '.(js|css)$',
      templateParameters: templateParameters(BUILDMODE)
    }),
    new HtmlWebpackInlineSourcePlugin(),
    new BabelMultiTargetPlugin({
      babel: {
        presetOptions: {
          'corejs': 3,
          'useBuiltIns': 'entry'
        }
      },
      targets: {
        modern: {
          browsers: browserListQueries.modern
        },
        legacy: {
          browsers: browserListQueries.legacy
        }
      }
    })
  ]
});
