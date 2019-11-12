const merge = require('webpack-merge');
const common = require('./webpack.common.js');
const BabelMultiTargetPlugin = require('webpack-babel-multi-target-plugin').BabelMultiTargetPlugin;
const HtmlWebpackPlugin = require('html-webpack-plugin');
const HtmlWebpackInlineSourcePlugin = require('html-webpack-inline-source-plugin');

module.exports = merge(common('production'), {
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
      chunks: ['inject'],
      excludeChunks: ['inject.modern'],
      inlineSource: '.(js|css)$'
    }),
    new HtmlWebpackInlineSourcePlugin()
  ]
});
