const path = require('path');
const fs = require('fs');
const merge = require('webpack-merge');
const common = require('./webpack.common.js');
const WriteFilePlugin = require('write-file-webpack-plugin');

const target = 'build';

module.exports = merge(common(target), {
  entry: {
    popup: [path.resolve(__dirname, 'src/popup/popup.js'), 'webpack/hot/dev-server'],
    options: [path.resolve(__dirname, 'src/options/options.js'), 'webpack/hot/dev-server'],
    background: [path.resolve(__dirname, 'src/background/background.js'), 'webpack/hot/dev-server'],
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
