const path = require('path');
const webpack = require('webpack');

module.exports = {
    entry: './src/index.js',
    output: {
        path: path.join(__dirname, 'dist'),
        publicPath: '../dist/',
        filename: '[name].bundle.js',
        chunkFilename: '[id].bundle.js',
        libraryTarget: "var",
        library: "Watchable"
    },
    module: {
        rules: [
            {
                test: /\.js/,
                use: [{
                    loader: 'babel-loader'
                }],
            },
        ],
    },
    plugins: [
        new webpack.optimize.UglifyJsPlugin()
    ],
    devServer: {
        contentBase: path.resolve(__dirname, './'),
    },
};
