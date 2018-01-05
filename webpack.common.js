const path = require('path');
const fs = require('fs');
const CleanPlugin = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const alias = {};
const fileExtensions = ['jpg', 'jpeg', 'png', 'gif', 'eot', 'otf', 'svg', 'ttf', 'woff', 'woff2'];

module.exports = (target, isProduction) => {
  const type = isProduction ? 'prod' : 'dev';
  const secretsPath = path.resolve(__dirname, `secrets.${type}.js`);

  if (fs.existsSync(secretsPath)) {
    alias.secrets = secretsPath;
  }

  return {
    output: {
      path: path.resolve(__dirname, target),
      filename: '[name].js'
    },
    resolve: {
      alias: alias
    },
    module: {
      rules: [
        {
          test: /\.css$/,
          include: path.resolve(__dirname, 'src'),
          use: [
            'style-loader',
            'css-loader'
          ],
        },
        {
          test: new RegExp('\.(' + fileExtensions.join('|') + ')$'),
          include: path.resolve(__dirname, 'src'),
          use: [
            {
              loader: 'file-loader',
              options: {
                name: '[name].[ext]'
              }
            }
          ]
        },
        {
          test: /\.html$/,
          include: path.resolve(__dirname, 'src'),
          use: [
            {
              loader: 'html-loader',
              options: {
                minimize: (type === 'production')
              }
            }
          ]
        }
      ]
    },
    plugins: [
      new CleanPlugin([target]),
      new CopyWebpackPlugin([{
        from: 'src/manifest.json',
        transform: function (content, path) {
          // generates the manifest file using the package.json informations
          return Buffer.from(JSON.stringify(Object.assign({
            description: process.env.npm_package_description,
            version: process.env.npm_package_version
          }, JSON.parse(content.toString()))));
        }
      }]),
      new HtmlWebpackPlugin({
        template: path.resolve(__dirname, 'src/popup/popup.html'),
        filename: 'popup.html',
        chunks: ['popup']
      }),
      new HtmlWebpackPlugin({
        template: path.resolve(__dirname, 'src/options/options.html'),
        filename: 'options.html',
        chunks: ['options']
      }),
      new HtmlWebpackPlugin({
        template: path.resolve(__dirname, 'src/background/background.html'),
        filename: 'background.html',
        chunks: ['background']
      })
    ],
    stats: {
      children: false,
      hash: false,
      modules: false
    }
  }
};
