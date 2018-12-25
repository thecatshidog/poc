const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const {
  multiEntryObj
} = require('./utils');

// 这个地方应该考虑一下对应的
const webpackConfig = {
  entry: async () => await multiEntryObj(path.resolve(__dirname, '../../packages')),
  output: {
    filename: '[name]/index.js',
    path: path.resolve(__dirname, '../../pkg/lib'),
    publicPath: '/'
  },
  mode: 'production',
  resolve: {
    extensions: ['.tsx', '.ts', '.js', '.jsx', '.json', 'd.ts'],
    alias: {
      '@': path.resolve('src')
    }
  },
  module: {
    rules: [{
      test: /(.ts|.tsx)$/,
      exclude: /node_modules/,
      use: 'babel-loader',
    }, {
      test: /(.css|.scss)$/,
      use: ['style-loader', 'css-loader'],
    }, {
      test: /(.png|jpg|gif|svg)$/,
      use: {
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: path.resolve(__dirname, '../../pkg/imgs/[name].[hash:7].[ext]'),
        }
      }
    }, {
      test: /(woff2?|eot|ttf|otf)$/,
      use: {
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: path.resolve(__dirname, '../../pkg/fonts/[name].[hash:7].[ext]'),
        }
      }
    }]
  }

}

module.exports = webpackConfig;
