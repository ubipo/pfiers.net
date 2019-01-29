const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin')
const VueLoaderPlugin = require('vue-loader/lib/plugin')

module.exports = {
  mode: 'development',
  entry: './src/index.ts',
  devtool: 'inline-source-map',
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
      }
    ]
  },
  resolve: {
    extensions: [ '.tsx', '.ts', '.js', '.vue' ]
  },
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: 'bundle.js',
    publicPath: "/",
  },
  devServer: {
    contentBase: __dirname,
    compress: true,
    historyApiFallback: true,
    publicPath: "/dist/"
  },
  plugins: [
    new CopyWebpackPlugin([
      // { from: 'src/res/**/*', transformPath: (targetPath, sourcePath) => targetPath.replace("src", "")},
      // { from: 'src/index.html', to: '../index.html'},
      // { from: 'src/index.html', to: '../404.html'} // For vue history mode
    ]),
    new VueLoaderPlugin()
  ]
};
