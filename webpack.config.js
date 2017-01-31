const path = require('path');
const webpack = require('webpack');

module.exports = {
    //context: path.resolve(__dirname, './src'),
    entry: {
        app: path.resolve(__dirname, './src', './scripts/app.js'),
    },
    output: {
        path: path.resolve(__dirname, './dist'),
        filename: '[name].bundle.js',
    },
    externals: {
        three: 'THREE'
    },
    target: 'web',
    devtool: 'source-map'
};