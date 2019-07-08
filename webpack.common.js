const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin')
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const fs = require('fs');
const version = require('./package.json').version;

module.exports = {
  entry: './src/index.ts',
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader'
      },
      {
        test: /\.(tsx?|js)$/,
        loader: 'babel-loader'
      },
      {
        test: /\.scss$/,
        use: [
          'vue-style-loader',
          'css-loader',
          'sass-loader'
        ]
      },
      {
        test: /\.(md|txt|jschema)$/,
        use: 'raw-loader'
      }
    ]
  },
  resolve: {
    extensions: [ '.tsx', '.ts', '.js', '.vue' ],
    alias: {
      'vue$': 'vue/dist/vue.esm.js',
      '@': path.resolve(__dirname, "src")
    }
  },
  output: {
    filename: 'bundle.js',
    chunkFilename: "[name].bundle.js",
    path: path.resolve(__dirname, "dist"),
    publicPath: "/dist/"
  },
  plugins: [
    new VueLoaderPlugin(),
    {
      apply: (compiler) => {
        compiler.hooks.afterPlugins.tap('setVersionInfo', (compilation) => {
          const versionInfo = `${version}/${compilation.options.mode}`;
          fs.writeFileSync('version-info.txt', versionInfo);
        })
      }
    }
  ]
}
