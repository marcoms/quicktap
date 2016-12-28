`use strict`;

import quicktap from '../../dist/index.js';

const qtDemos = document.querySelectorAll(`.qt`);
for (const qtDemo of qtDemos) {
    quicktap.apply(qtDemo);
};
