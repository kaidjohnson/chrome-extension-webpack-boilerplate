const webpack = require('webpack');
const path = require('path');
const merge = require('webpack-merge');
const common = require('./webpack.common.js');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');

const target = 'dist';

module.exports = merge(common(target, true), {
  entry: {
    popup: path.resolve(__dirname, 'src/popup/popup.js'),
    options: path.resolve(__dirname, 'src/options/options.js'),
    background: path.resolve(__dirname, 'src/background/background.js')
  },
  devtool: 'source-map',
  plugins: [
    new UglifyJSPlugin({
      sourceMap: true
    }),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production')
    })
  ]
});
