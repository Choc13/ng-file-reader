const webpack = require('webpack');

module.exports = {
    context: __dirname,
    devtool: 'source-map',
    entry: './src/Main.ts',
    external: {
        angular: 'angular'
    },
    output: {
        libraryTarget: 'commonjs',
        filename: 'ng-file-reader.min.js',
        path: './dist'
    },
    resolve: {
        extensions: ['', '.webpack.js', '.web.js', '.ts', '.js']
    },
    resolveLoader: {
        moduleDirectories: ['node_modules']
    },
    tslint: {
        emitErrors: true,
        failOnHint: true  
    },
    module: {
        preLoaders: [
            {
                test: /\.ts$/,
                loader: "tslint"
            }
        ],
        loaders: [
            {
                test: /\.tsx?$/,
                loader: 'ts-loader'
            }
        ]
    },
    plugins: []
};
