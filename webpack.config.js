const path = require('path');
const glob = require('glob');
var webpack = require('webpack');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const scss = glob.sync('H5P.*/src/*.scss');
const scssObject = scss.reduce((acc, file) => {
  const name = file.replace('src', 'dist/css').replace('scss', 'css');
  acc[name] = path.join(__dirname, file);;
  return acc;
}, {});

const js = glob.sync('H5P.*/src/*.js');
const jsObject = js.reduce((acc, file) => {
  const name = file.replace('src', 'dist/js')
  acc[name] = path.join(__dirname, file);;
  return acc;
}, {});

const config = [
  {
    entry: scssObject,
    output: {
      path: path.resolve(__dirname),
      filename:'[name].js'
    },
    module: {
      rules: [
        {
          test: /\.scss$/,
          use: [
            MiniCssExtractPlugin.loader,
            'css-loader',
            'sass-loader'
          ]
        }
      ]
    },
    plugins: [
      new MiniCssExtractPlugin({ filename: '[name]' }),
    ],
    devtool: 'eval-source-map'
  },
  {
    entry: jsObject,
    output: {
      path: path.resolve(__dirname),
      filename:'[name]'
    },
    module: {
      rules: [
        {
          test: /\.js$/,
          use: 'babel-loader',
          exclude: /node_modules/
        }
      ]
    },
    devtool: 'eval-source-map'
  }
]

module.exports = config;