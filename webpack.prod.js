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

const flattenSvgDir = require('./scripts/flattenSvgDir')

module.exports = merge(common('production'), {
  output: {
    publicPath: 'https://pfiers.net/'
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
        args: [
          '--disable-web-security',
        ],
      }),
      postProcess (context) {
        // GH pages serves dirs with slash
        if (!context.route.endsWith('/')) {
          context.outputPath = path.join(__dirname, 'dist', `${context.route}.html`)
        }

        // Remove all webpack bundle scripts (injected manually by embedded inject script)
        //    anything except path or end of src \/                \/ no more path segements
        const re = /<script.*? src="https?:\/\/[^\/"]*?\/bundle\/[^\/"]*?\.(?:chunk|bundle)\.js".*?<\/script>/gm
        context.html = context.html.split(re).join('')
          .replace('http://content.local:8000', 'https://pfiers.net')
          .replace('http://dist.local:8000', 'https://pfiers.net')
          .replace('http://localhost:8000', 'https://pfiers.net')
        return context
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
    new CleanWebpackPlugin(),
    // {
    //   apply(compiler) {
    //     compiler.hooks.emit.tapPromise(
    //       'FlattenSvgPlugin',
    //       () => {
    //         console.log('flattening')
    //         svgDirPath = path.resolve(__dirname, "dist/static/tech-icons")
    //         return flattenSvgDir(svgDirPath)
    //       }
    //     );
    //   }
    // },
    new CopyPlugin([
      { from: 'content', to: 'content' },
      { from: 'static', to: 'static' },
      { from: 'CNAME' },
    ])
  ]
});
