const merge = require('webpack-merge');
const prod = require('./webpack.prod.js');

module.exports = merge(prod, {
  output: {
    publicPath: 'http://sh.pieterfiers.net:8000/'
  }
});
