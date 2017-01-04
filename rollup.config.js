import json from 'rollup-plugin-json';

export default {
    entry: `src/index.js`,
    format: `umd`,
    moduleName: `quicktap`,
    dest: `dist/index.js`,
    plugins: [
        json({preferConst: true}),
    ],
};
