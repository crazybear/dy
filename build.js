const webpack = require('webpack');
const path = require('path');
const fs = require('fs-extra');
const configs = require('./webpack.js');

fs.copySync(
  path.resolve(__dirname, './src/ex'),
  path.resolve(__dirname, './release')
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

webpack(configs(), log);
