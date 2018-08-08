const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin/lib');

module.exports = {
  mode: 'development',
  entry: './example/src/index.js',
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist')
  },
  devtool: 'cheap-module-source-map',
  devServer: {
    contentBase: './example',
    compress: true,
    clientLogLevel: 'none',
    hot: true,
    port: 3001
  },
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx'],
    plugins: [
      new TsconfigPathsPlugin({
        configFile: path.resolve(__dirname, 'tsconfig.dev.json')
      })
    ]
  },
  module: {
    rules: [
      {
        oneOf: [
          {
            test: /\.(js|ts|tsx)$/,
            exclude: /node_modules/,
            loader: 'ts-loader',
            options: {
              transpileOnly: true
            }
          },
          {
            test: /\.css$/,
            use: ['style-loader', 'css-loader']
          }
        ]
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      inject: true,
      template: path.resolve(__dirname, 'example/index.html')
    }),
    new webpack.HotModuleReplacementPlugin(),
    new ForkTsCheckerWebpackPlugin({
      async: false,
      watch: path.resolve(__dirname, 'src'),
      tsconfig: path.resolve(__dirname, 'tsconfig.dev.json'),
      tslint: path.resolve(__dirname, 'tslint.json')
    })
  ],
  performance: false
};
