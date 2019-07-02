const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const HtmlWebpackInlineSVGPlugin = require('html-webpack-inline-svg-plugin')
const webpack = require('webpack')
const CopyWebpackPlugin = require('copy-webpack-plugin');
const dist = 'js'

const config = 

module.exports = {
  mode: 'development',

  entry: [
    './script.js',
  ],
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
  },
  context: path.resolve(__dirname, 'src'),
  devtool: 'inline-source-map',
  devServer: {
    hot: true,
    contentBase: '/js',
    publicPath: '/',
  },
  module: {
    rules: [
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
        test: /\.(png|jpg|gif|svg)$/,
        use: [
          'url-loader'
        ]
      },
      {
        test: /\.html$/,
        use: {
          loader: 'html-loader',
          options: {
            interpolate: true
          }
        }
      }
    ],
  },
  plugins: [
    new CopyWebpackPlugin([
      {from: '../db/kanjidic2.json', to: 'db.json'},
      {from: '../node_modules/sw-toolbox/sw-toolbox.js', to: 'sw-toolbox.js'},
      {from: 'serviceWorker.js', to: 'serviceWorker.js'},
    ]),
    new HtmlWebpackPlugin({
      template: './index.html'
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin(),

  ],
};
