`use strict`;

import quicktap from '../../dist/index.js';

// cost/benefit??

const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

const qtDemos = $$(`.qt`);
for (const qtDemo of qtDemos) {
    quicktap.apply(qtDemo);
};
