/*
@preserve

quicktap library, MIT licensed
*/

'use strict';

var isTouch = 'ontouchstart' in window;

/*
@preserve

This snippet is derived from the Modernizr library
(https://github.com/Modernizr/Modernizr), licensed as MIT.

(snippet begins)
*/

var supportsPassive = false;
try {
	var opts = Object.defineProperty({}, 'passive', {
		get: function() { supportsPassive = true; }
	});

	window.addEventListener('test', null, opts);
} catch (e) {}

// (snippet ends)

var quicktap = {
	tag: 'active',

	apply: function apply(el) {
		if (el === undefined) {
			throw Error('element parameter is required');
		}

		el.addEventListener('mousedown', activate, supportsPassive ? { passive: true } : false);
		el.addEventListener('mouseup', deactivate, supportsPassive ? { passive: true } : false);
		el.addEventListener('mouseleave', deactivate, supportsPassive ? { passive: true } : false);

		if (isTouch) {
			el.addEventListener('touchstart', activate, supportsPassive ? { passive: true } : false);
			el.addEventListener('touchcancel', deactivate, supportsPassive ? { passive: true } : false);
			el.addEventListener('touchend', deactivate, supportsPassive ? { passive: true } : false);
		}
	},
};

function activate(evt) {
	evt.currentTarget.classList.add(quicktap.tag);
}

function deactivate(evt) {
	evt.currentTarget.classList.remove(quicktap.tag);
}

module.exports = quicktap;
