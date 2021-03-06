const resolve = require('path').resolve
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const url = require('url')
const axios = require('axios')
const publicPath = ''
/*----------------jsonServer---------*/
/*引入json-server*/
const jsonServer = require('json-server')
/*搭建一个server*/
const apiServer = jsonServer.create()
/*将db.json关联到server*/
const apiRouter = jsonServer.router('db.json')
const middlewares = jsonServer.defaults()
apiServer.use(middlewares)
apiServer.use(apiRouter)
/*监听端口*/
apiServer.listen(8080, () => {
    console.log('JSON Server is running')
})
/*----------------jsonServer---------*/
module.exports = (options = {}) => ({
  entry: {
    vendor: './src/vendor',
    index: './src/main.js'
  },
  output: {
    path: resolve(__dirname, 'dist'),
    filename: options.dev ? '[name].js' : '[name].js?[chunkhash]',
    chunkFilename: '[id].js?[chunkhash]',
    publicPath: options.dev ? '/assets/' : publicPath
  },
  module: {
    rules: [{
        test: /\.vue$/,
        use: ['vue-loader']
      },
      {
        test: /\.js$/,
        use: ['babel-loader'],
        exclude: /node_modules/
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader', 'postcss-loader']
      },
      {
        test: /\.(png|jpg|jpeg|gif|eot|ttf|woff|woff2|svg|svgz)(\?.+)?$/,
        use: [{
          loader: 'url-loader',
          options: {
            limit: 10000
          }
        }]
      }
    ]
  },
  plugins: [
    new webpack.optimize.CommonsChunkPlugin({
      names: ['vendor', 'manifest']
    }),
    new HtmlWebpackPlugin({
      template: 'src/index.html'
    })
  ],
  resolve: {
    alias: {
      '~': resolve(__dirname, 'src'),
    },
    extensions: ['.js', '.vue', '.json', '.css']
  },
  devServer: {
    host: '127.0.0.1',
    port: 8010,
    // proxy: {
    //   '/mrbui/': {
    //     target: 'http://hadoop001:8580/mrbui',
    //     changeOrigin: true,
    //     pathRewrite: {
    //       '^/mrbui': ''
    //     }
    //   }
    // },
    historyApiFallback: {
      index: url.parse(options.dev ? '/assets/' : publicPath).pathname
    }
  },
  devtool: options.dev ? '#eval-source-map' : '#source-map'
})
