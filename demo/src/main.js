`use strict`;

import quicktap from '../../dist/index.js';

const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

const qtDemos = $$(`.qt`);
for (const qtDemo of qtDemos) {
    quicktap.apply(qtDemo);
};
