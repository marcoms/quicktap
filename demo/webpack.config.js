`use strict`;

const webpack = require(`webpack`);

module.exports = {
    entry: `./src/main.js`,
    output: {
        filename: `main.js`,
        path: `./res/js`,
    },

    plugins: [
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: true,
            },
        }),
    ],
};
