const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin')
const VueLoaderPlugin = require('vue-loader/lib/plugin')

module.exports = {
  mode: 'production',
  entry: './src/index.ts',
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
        exclude: /tests/,
        use: {
          loader: 'ts-loader',
          options: {
            appendTsSuffixTo: [/\.vue$/],
            appendTsxSuffixTo: [/\.vue$/]
          }
        }
      },
      {
        test: /\.vue$/,
        use: ['vue-loader']
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
        test: /\.md$/,
        use: 'raw-loader'
      }
    ]
  },
  resolve: {
    extensions: [ '.tsx', '.ts', '.js', '.vue' ],
    alias: {
      'vue$': 'vue/dist/vue.esm.js'
    }
  },
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: 'bundle.js',
    publicPath: "/",
  },
  plugins: [
    new CopyWebpackPlugin([
      { from: 'src/index.html', to: '../index.html'},
      { from: 'src/index.html', to: '../404.html'} // For vue history mode
    ]),
    new VueLoaderPlugin()
  ]
};