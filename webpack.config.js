
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
  entry: ['react-hot-loader/patch', './client/src/index.jsx'],
  output: {
    path: BUILD_DIR,
    filename: 'bundle.js',
  },
  module: {
    rules: [
      {
        test: /\.js$/, loader: 'babel-loader', exclude: [/node_modules/], query: { presets: ['react', 'env', 'stage-2'] },
      },
      {
        test: /\.jsx?$/,
        exclude: [/node_modules/],
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: ['react', 'env', 'stage-2'],
            },
          },
        ],
      },
      { test: /\.css$/, loaders: ['style-loader', 'css-loader'] },
      { test: /\.(sass|scss)$/, loaders: ['style-loader', 'css-loader', 'sass-loader'] },
      { test: /\.(png|woff|woff2|eot|ttf|jpg|gif|svg)$/i, loaders: ['file-loader', 'url-loader?limit=100000'] },
    ],
  },
  mode: process.env.NODE_ENV,
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development'),
    }),
    new webpack.HotModuleReplacementPlugin(),
  ],
  devServer: {
    contentBase: path.join(__dirname, 'public'),
    hot: true,
  },
  target: 'node',
};
