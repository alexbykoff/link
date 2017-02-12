const path = require('path');

module.exports = {
    entry: './temp/index.js',
    output: {
        path: path.join(__dirname, 'dist'),
        publicPath: '../dist/',
        filename: '[name].bundle.js',
        chunkFilename: '[id].bundle.js',
        libraryTarget: "var",
        library: "Watchable"
    }
};
