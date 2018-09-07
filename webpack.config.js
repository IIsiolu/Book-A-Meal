const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const HtmlWebpackPluginConfig = new HtmlWebpackPlugin({
  template: './client/public/index.html',
  filename: 'index.html',
  inject: 'body',
});


module.exports = {
  devtool: 'source-map',
  entry: [
    'babel-polyfill',
    path.join(__dirname, '/client/src/index.jsx'),
  ],
  output: {
    path: path.join(__dirname, '/dist'),
    filename: 'js/bundle.js',
    publicPath: '/',
    sourceMapFilename: 'bundle.map',
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        loaders: 'babel-loader',
        exclude: [/node_modules/, /server/],
        query: { presets: ['react', 'env', 'stage-2'] },
      },
      { test: /\.css$/, loaders: ['style-loader', 'css-loader'] },
      { test: /\.(sass|scss)$/, loaders: ['style-loader', 'css-loader', 'sass-loader'] },
      { test: /\.(png|woff|woff2|eot|ttf|jpg|jpeg|gif|svg)$/i, loaders: ['file-loader'] },
    ],
  },
  resolve: {
    extensions: ['.js', '.jsx'],
  },
  mode: 'production',
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    HtmlWebpackPluginConfig,
  ],
  devServer: {
    hot: true,
    inline: true,
    contentBase: './dist',
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
