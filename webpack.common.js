const path = require('path');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const version = require('./package.json').version;
const name = require('./package.json').name;
const webpack = require('webpack')
const SvgSpritePlugin = require('svg-sprite-loader/plugin')

module.exports = (mode) => ({
  mode,
  entry: {
    main: './src/index.ts',
    inject: './src/inject/index.ts'
  },
  module: {
    rules: [
      // Babel loader in dev/prod
      {
        test: /\.scss$/,
        use: [
          'vue-style-loader',
          'css-loader',
          'sass-loader'
        ]
      },
      {
        test: /\.(md|txt|jschema|html)$/,
        use: 'raw-loader'
      },
      {
        test: /\.(png|jp(e*)g)$/,
        use: [{
          loader: 'url-loader',
          options: {
            limit: 8000,
            name: 'images/[hash]-[name].[ext]'
          }
        }]
      },
      {
        test: /\.svg$/,
        loader: 'svg-sprite-loader',
        options: {
          extract: true
        }
      }
    ]
  },
  resolve: {
    extensions: [ '.tsx', '.ts', '.js', '.vue' ],
    alias: {
      'vue$': 'vue/dist/vue.esm.js',
      '@': path.resolve(__dirname, "src"),
      '~': path.resolve(__dirname)
    }
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: "bundle/[name].bundle.js",
    chunkFilename: "bundle/[name].chunk.js",
  },
  plugins: [
    new VueLoaderPlugin(),
    new webpack.DefinePlugin({
      BUILD_INFO: {
        name: JSON.stringify(name),
        version: JSON.stringify(version),
        mode: JSON.stringify(mode)
      }
    }),
    new SvgSpritePlugin()
  ]
});
