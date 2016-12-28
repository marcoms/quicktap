`use strict`;

const webpack = require(`webpack`);

module.exports = {
    entry: `./src/index.js`,
    output: {
        filename: `index.js`,
        path: `./dist`,
        library: `quicktap`,
        libraryTarget: `umd`,
    },

    plugins: [
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: true,
            },
        }),
    ],
};
