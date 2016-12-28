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
