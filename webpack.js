const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

function configs(env = 'production') {
  return {
    mode: env,
    entry: {
      'contentscript': './src/content/index.js',
      'backgroundscript': './src/background/index.js',
    },
    output: {
      path: path.resolve(__dirname, env === 'production' ? './release' : './dist'),
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
}
module.exports = configs;
