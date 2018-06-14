const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const BUILD_DIR = path.resolve(__dirname, './client/dist');
// const HtmlWebpackPluginConfig = new HtmlWebpackPlugin({
//   template: './client/dist/index.html',
//   filename: './index.html',
// });


module.exports = {
  entry: [
    '/client/src/index.jsx',
  ],
  output: {
    path: BUILD_DIR,
    filename: 'bundle.js',
    sourceMapFilename: 'bundle.map',
  },
  devtool: '#source-map',
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
      { test: /\.(png|woff|woff2|eot|ttf|jpg|jpeg|gif|svg)$/i, loaders: ['file-loader', 'url-loader?limit=100000'] },
    ],
  },
  mode: 'development',
  plugins: [
    new HtmlWebpackPlugin(),
  ],
  devServer: {
    hot: true,
    inline: true,
    contentBase: './client/dist/',
    historyApiFallback: true,
    proxy: {
      '/api/v1': 'http://localhost:7000',
    },
    stats: 'errors-only',
  },
  node: {
    net: 'empty',
    dns: 'empty',
    fs: 'empty',
  },
  target: 'node',
};
