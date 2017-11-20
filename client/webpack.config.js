const path = require('path');
var webpack = require('webpack')
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
        use: ['style-loader','css-loader','postcss-loader']
      },
      {
        test: /\.(svg)$/,
        loader: 'svg-url-loader?classPrefix'
      }
    ]
  }
};

module.exports = config
