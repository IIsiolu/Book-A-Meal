
const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const Dotenv = require('dotenv-webpack');

const BUILD_DIR = path.resolve(__dirname, './client/public');
const APP_DIR = path.resolve(__dirname, './client/src');
const dotenv = new Dotenv({
  path: path.resolve(__dirname, '.env'),
  systemvars: true,
});


module.exports = {
  entry: './client/src/index.jsx',
  output: {
    path: BUILD_DIR,
    filename: 'bundle.js',
  },
  module: {
    rules: [
      {
        test: /\.js$/, loader: 'babel-loader', exclude: [/node_modules/], query: { presets: ['react'] },
      },
      {
        test: /\.jsx?$/,
        exclude: [/node_modules/],
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: ['react'],
            },
          },
        ],
      },
      { test: /\.css$/, loaders: ['style-loader', 'css-loader'] },
      { test: /\.scss$/, loaders: ['style-loader', 'css-loader', 'sass-loader'] },
      { test: /\.(png|jpg|gif|svg)$/i, loader: 'file-loader' },
    ],
  },
  mode: process.env.NODE_ENV,
  plugins: [
    new HtmlWebpackPlugin({
      template: path.join(__dirname, 'client/public/index.html'),
      filename: 'index.html',
      inject: 'body',
    }),
    dotenv,
  ],
  devServer: {
    port: 4000,
    contentBase: path.join(__dirname, 'public'),
    compress: true,
  },
  target: 'node',
};
