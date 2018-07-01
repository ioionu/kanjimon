const path = require('path');
const webpack = require('webpack')
const CopyWebpackPlugin = require('copy-webpack-plugin');
const dist = 'js'

const config = 

module.exports = env => {
  return {
    entry: [
      'react-hot-loader/patch',
      'webpack-dev-server/client?http://localhost:8080',
      'webpack/hot/only-dev-server',
      './script.js',
    ],
    output: {
      path: path.resolve(__dirname, 'js'),
      filename: 'bundle.js',
      publicPath: '/'
    },
    context: path.resolve(__dirname, 'src'),
    devtool: 'inline-source-map',
    devServer: {
      hot: true,
      contentBase: './js',
      publicPath: '/',
    },
    module: {
      loaders: [
        {
          test: /\.js$/,
          exclude: /(node_modules|bower_components)/,
          loader: 'babel-loader',
          // query: {
          //   presets: ['react', 'es2015']
          // }
        },
        {
          test: /\.css$/,
          loader: [
                'style',
                "css-loader?modules",
                'postcss-loader'
            ],
        },
        {
          test: /\.(svg)$/,
          loader: 'svg-url-loader?classPrefix'
        }
      ],
    },
    plugins: [
      new CopyWebpackPlugin([
        {from: '../db/kanjidic2.json', to: 'db.json'},
        {from: '../node_modules/sw-toolbox/sw-toolbox.js', to: 'sw-toolbox.js'},
        {from: 'serviceWorker.js', to: 'serviceWorker.js'},
      ]),
      new webpack.HotModuleReplacementPlugin(),
      new webpack.NamedModulesPlugin(),
  
    ],
  }
};
