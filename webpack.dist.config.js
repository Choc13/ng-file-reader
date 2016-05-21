const webpack = require('webpack');
const config = require('./webpack.config.js');

config.plugins = config.plugins.concat([
    new webpack.optimize.UglifyJsPlugin({
        compress: {
            warnings: true
        }
    })
]);

module.exports = config;