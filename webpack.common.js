const path = require('path');
const { VueLoaderPlugin } = require('vue-loader')
const version = require('./package.json').version;
const name = require('./package.json').name;
const webpack = require('webpack')
const SvgSpritePlugin = require('svg-sprite-loader/plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const spriteIconsPath = path.resolve(__dirname, 'src/assets/img/icons')

module.exports = (mode) => ({
  mode,
  context: path.resolve(__dirname, 'src'),
  entry: {
    env: './env.js',
    'warn-es6': './warn-es6.js',
    main: './index.ts' // Main should come after env
  },
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: [
          'vue-style-loader',
          'css-loader',
          'sass-loader'
        ]
      },
      {
        test: /\.css$/,
        use: [
          'vue-style-loader',
          'css-loader'
        ]
      },
      // Babel loader in dev/prod
      {
        test: /\.(md|txt)$/,
        use: 'raw-loader'
      },
      {
        test: /\.svg$/,
        include: [spriteIconsPath],
        loader: 'svg-sprite-loader',
        options: {
          extract: true,
          symbolId: filePath => {
            /** @type {string} */
            const pathRelative = filePath.slice(spriteIconsPath.length + 1, -4)
            const svgName = pathRelative.split('/').join('-')
            return `svg-sprite-${svgName}`
          }
          // symbolId: 'svg-sprite-[name]'
        }
      },
      {
        test: /\.svg$/,
        exclude: [spriteIconsPath],
        type: 'asset/resource'
      },
    ]
  },
  resolve: {
    extensions: [ '.tsx', '.ts', '.js', '.vue' ],
    alias: {
      '@': path.resolve(__dirname, "src"),
      '~': path.resolve(__dirname),
      'vue': "vue/dist/vue.esm-bundler.js"
    }
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: "bundle/[name].bundle.js",
    chunkFilename: "bundle/[name].chunk.js",
  },
  plugins: [
    new VueLoaderPlugin(),
    new SvgSpritePlugin({
      plainSprite: true
    }),
    new webpack.DefinePlugin({
      TEST: JSON.stringify('value goes here'),
      BUILD_INFO: {
        name: JSON.stringify(name),
        version: JSON.stringify(version),
        mode: JSON.stringify(mode)
      },
      __VUE_PROD_DEVTOOLS__: false,
      __VUE_OPTIONS_API__: false
    }),
    new HtmlWebpackPlugin({
      template: 'index.ejs',
      filename: 'index.html',
      inject: 'body',
      scriptLoading: 'blocking'
    }),
    {
      apply (compiler) {
        compiler.hooks.compilation.tap('HtmlWebpackESM', (compilation) => {    
          const hooks = HtmlWebpackPlugin.getHooks(compilation)
          hooks.alterAssetTags.tapAsync(
            'HtmlWebpackESM',
            (data, cb) => {
              for (const script of data.assetTags.scripts) {
                const src = script.attributes['src']
                if (src.includes('warn-es6')) {
                  script.attributes['nomodule'] = ''
                } else {
                  script.attributes['type'] = 'module'
                  if ((src.includes('main'))) {
                    script.attributes['defer'] = 'defer'
                  }
                }
              }
              cb(null, data)
            }
          )
        })
      }
    }
  ]
});
