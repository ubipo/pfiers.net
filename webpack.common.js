const path = require('path');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const version = require('./package.json').version;
const webpack = require('webpack')

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
        test: /\.(png|jp(e*)g|svg)$/,  
        use: [{
            loader: 'url-loader',
            options: { 
                limit: 8000,
                name: 'images/[hash]-[name].[ext]'
            } 
        }]
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
    filename: "dist/[name].bundle.js",
    chunkFilename: "dist/[name].bundle.js",
    path: __dirname,
  },
  plugins: [
    new VueLoaderPlugin(),
    new webpack.DefinePlugin({
      BUILD_INFO: {
        version: JSON.stringify(version),
        mode: JSON.stringify(mode)
      }
    })
  ]
});
