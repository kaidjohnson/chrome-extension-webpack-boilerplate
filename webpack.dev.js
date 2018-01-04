const path = require('path');
const fs = require('fs');
const merge = require('webpack-merge');
const common = require('./webpack.common.js');
const WriteFilePlugin = require('write-file-webpack-plugin');

const target = 'build';

module.exports = merge(common(target), {
  entry: {
    popup: [path.resolve(__dirname, 'src/js/popup.js'), 'webpack/hot/dev-server'],
    options: [path.resolve(__dirname, 'src/js/options.js'), 'webpack/hot/dev-server'],
    background: [path.resolve(__dirname, 'src/js/background.js'), 'webpack/hot/dev-server'],
    devServerClient: 'webpack-dev-server/client?http://localhost:3000'
  },
  devtool: 'cheap-module-eval-source-map',
  plugins: [
    new WriteFilePlugin()
  ],
  devServer: {
    contentBase: path.resolve(__dirname, target)
  }
});
