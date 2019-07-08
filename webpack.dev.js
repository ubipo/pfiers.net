const merge = require('webpack-merge');
const common = require('./webpack.common.js');

module.exports = merge(common, {
  mode: 'development',
  devtool: 'inline-source-map',
  devServer: {
    contentBase: __dirname,
    compress: true,
    historyApiFallback: {
      index: 'index.html',
      rewrites: [
        { from: /\/*/, to: '/index.html' }
      ]
    },    
    publicPath: "/dist/",
    overlay: true
  }
});