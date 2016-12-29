`use strict`;

const webpack = require(`webpack`);

const versionArray = require(`./package.json`).version.split(`.`);

const versionMajor = Number.parseInt(versionArray[0] || 0);
const versionMinor = Number.parseInt(versionArray[1] || 0);
const versionPatch = Number.parseInt(versionArray[2] || 0);

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
                test: /\.js$/,
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
        new webpack.DefinePlugin({
            VERSION_MAJOR: versionMajor,
            VERSION_MINOR: versionMinor,
            VERSION_PATCH: versionPatch,
        }),

        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: true,
            },
        }),
    ],
};
