`use strict`;

const webpack = require(`webpack`);

module.exports = {
    entry: `./src/main.js`,
    output: {
        filename: `main.js`,
        path: `./res/js`,
    },

    module: {
        rules: [
            {
                test: /\.js/,
                use: [
                    {
                        loader: `babel-loader`,
                        options: {
                            presets: [`es2015`],
                        },
                    },
                ],
            },
        ],
    },

    plugins: [
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: true,
            },
        }),
    ],
};
