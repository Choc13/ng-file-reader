const config = require('./webpack.dist.config.js');
config.entry = './src/Test.ts',
config.external = {};
config.output.libraryTarget = undefined;

module.exports = config;
