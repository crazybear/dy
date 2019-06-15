const webpack = require('webpack');
const path = require('path');
const fs = require('fs-extra');
const configs = require('./webpack.js');

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

const compiler = webpack(configs('none'));

compiler.watch({
  aggregateTimeout: 300,
  poll: 1000,
}, log);
