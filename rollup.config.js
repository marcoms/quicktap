import json from 'rollup-plugin-json';

export default {
    entry: `src/index.js`,
    format: `umd`,
    moduleName: `quicktap`,
    targets: [
        {dest: `dist/index.js`, format: `umd`},
        {dest: `dist/index.es.js`, format: `es`},
    ],

    plugins: [
        json({preferConst: true}),
    ],
};
