const path = require('path');
const webpack = require('webpack')
const CopyWebpackPlugin = require('copy-webpack-plugin');
const dist = 'js'

const config = {
  entry: './src/script.js',
  output: {
    path: path.resolve(__dirname, 'js'),
    filename: 'bundle.js'
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'babel-loader',
        query: {
          presets: ['react', 'es2015']
        }
      },
      {
        test: /\.css$/,
        use: [
          "style-loader",
          {
            loader: "css-loader",
            options: {
              modules: true, // default is false
              sourceMap: true,
              importLoaders: 1,
              localIdentName: "[name]--[local]--[hash:base64:8]"
            }
          },
          "postcss-loader"
        ]
      },
      {
        test: /\.(svg)$/,
        loader: 'svg-url-loader?classPrefix'
      }
    ],
  },
  plugins: [
    new CopyWebpackPlugin([
      {from: 'db/kanjidic2.json', to: 'db.json'},
      {from: 'node_modules/sw-toolbox/sw-toolbox.js', to: 'sw-toolbox.js'},
      {from: 'src/serviceWorker.js', to: 'serviceWorker.js'},
    ]),
  ],
};

module.exports = config
