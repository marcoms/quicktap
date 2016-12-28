'use strict';

import quicktap from '../../dist/index';

window.quicktap = quicktap;

// cost/benefit??

const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

const qtDemos = $$('.qt');
qtDemos.forEach(function(qtDemo) {
    quicktap.apply(qtDemo);
});
