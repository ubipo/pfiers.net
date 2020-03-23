const merge = require('webpack-merge');
const common = require('./webpack.common.js');
const generatePaths = require('./scripts/generate-paths');
const path = require('path')

const BabelMultiTargetPlugin = require('webpack-babel-multi-target-plugin').BabelMultiTargetPlugin;
const HtmlWebpackPlugin = require('html-webpack-plugin');
const HtmlWebpackInlineSourcePlugin = require('html-webpack-inline-source-plugin');
const PrerenderSPAPlugin = require('prerender-spa-plugin');
const Renderer = PrerenderSPAPlugin.PuppeteerRenderer;
const CopyPlugin = require('copy-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

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
    new PrerenderSPAPlugin({
      staticDir: path.join(__dirname, 'dist'),
      routes: generatePaths(),
      renderer: new Renderer({
        injectProperty: '__PRERENDER_INJECTED',
        inject: {
          prerender: String(true)
        },
        headless: false,
        //renderAfterDocumentEvent: 'app-loaded',
        renderAfterTime: 5000,
      }),
      postProcess (renderedRoute) {
        // Remove all webpack bundle scripts (injected manually by embedded inject script)
        //    anything except path or end of src \/                \/ no more path segements
        const re = /<script.*? src="https?:\/\/[^\/"]*?\/bundle\/[^\/"]*?\.(?:chunk|bundle)\.js".*?<\/script>/gm
        renderedRoute.html = renderedRoute.html.split(re).join('')
        return renderedRoute
      },
    }),
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
    new HtmlWebpackInlineSourcePlugin(),
    new CopyPlugin([
      { from: 'content', to: 'content' },
    ]),
    new CleanWebpackPlugin()
  ]
});
