const webpack = require('webpack')
const path = require('path')

module.exports = {
  mode: 'development',
  entry: [
    './app/main.js',
  ],
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: 'app.bundle.js',
  },
  module: {
    rules: [
      { test: /\.jsx?$/, use: 'babel-loader', exclude: /node_modules/ },
      { test: /\.(css|scss)$/, use: [{ loader: 'style-loader/url' }, { loader: 'file-loader' }]},
    ]
  },
  plugins: [
    new webpack.NamedModulesPlugin(),
  ],
  resolve: {
    alias: {
      App: path.resolve(__dirname, 'app/')
    }
  },
  devServer: {
    contentBase: 'app',
    compress: true,
    port: 8080,
    host: '127.0.0.1'
  }
}
