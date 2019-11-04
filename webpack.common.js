const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const version = require('./package.json').version;
const BrowserslistUseragentRegexp = require('browserslist-useragent-regexp');
const browserListQueries = require('./browserListQueries');

function browserslistQueryToUseragentRegexp(query) {
  return BrowserslistUseragentRegexp.getUserAgentRegExp({
    browsers: query,
    allowHigherVersions: true
  });
}

exports.templateParameters = function(buildMode) {
  return {
    buildInfo: {
      version: version,
      buildMode: buildMode,
      browserRegexps: {
        modern: browserslistQueryToUseragentRegexp(browserListQueries.modern).source,
        legacy: browserslistQueryToUseragentRegexp(browserListQueries.legacy).source
      }
    }
  }
}

exports.common = {
  entry: {
    main: './src/index.ts',
    inject: './inject/index.js'
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
        test: /\.(md|txt|jschema)$/,
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
    new VueLoaderPlugin()
  ]
}
