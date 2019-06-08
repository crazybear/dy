const webpack = require('webpack');
const path = require('path');
const fs = require('fs-extra');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const configs = {
  mode: 'none',
  entry: {
    'contentscript': './src/content/index.js',
    'backgroundscript': './src/background/index.js',
    'popup': './src/popup/index.js',
  },
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: '[name].js',
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude(path) {
          return path.indexOf('node_modules') !== -1;
        },
        use: {
          loader: 'babel-loader',
          options: {
            cacheDirectory: true,
            presets: [
              [require.resolve('@babel/preset-env'), {
                useBuiltIns: 'entry',
                corejs: 2,
                targets: '> 1%, last 2 versions, ie >= 9',
              }]
            ],
            plugins: [
              [require.resolve('@babel/plugin-proposal-class-properties'), { loose: false }],
            ],
          },
        },
      }
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'popup',
      filename: 'popup.html',
      template: path.resolve(__dirname, './src/popup/index.html'),
      inject: false,
    }),
  ],
}

fs.copySync(
  path.resolve(__dirname, './src/ex'),
  path.resolve(__dirname, './dist')
);

function log(err, stats) {
  if (err) {
    console.log(err);
  } else {
    console.log(stats.toString({
      chunks: false,
      colors: true,
    }));
  }
}

const compiler = webpack(configs);

compiler.watch({
  aggregateTimeout: 300,
  poll: 1000,
}, log);
