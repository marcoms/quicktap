/*
@preserve

quicktap library, MIT licensed
*/

'use strict';

if (typeof window === 'undefined') {
	throw new Error('quicktap can only be used in the browser');
}

const touchEnabled = 'ontouchstart' in window;

/*
@preserve

This snippet is derived from the Modernizr library
(https://github.com/Modernizr/Modernizr), licensed as MIT.

(snippet begins)
*/

const supportsPassive = false;
try {
	const opts = Object.defineProperty({}, 'passive', {
		get: function() { supportsPassive = true; }
	});

	window.addEventListener('test', null, opts);
} catch (e) {}

// (snippet ends)

const quicktap = {
	class: 'active',

	apply: function apply(el) {
		if (el === undefined) {
			throw Error('element parameter is required');
		}

		if (supportsPassive) {
			el.addEventListener('mousedown', activate, {passive: true});
			el.addEventListener('mouseup', deactivate, {passive: true});
			el.addEventListener('mouseleave', deactivate, {passive: true});

			if (isTouch) {
				el.addEventListener('touchstart', activate, {passive: true});
				el.addEventListener('touchcancel', deactivate, {passive: true});
				el.addEventListener('touchend', deactivate,  {passive: true});
			}
		} else {
			el.addEventListener('mousedown', activate, false);
			el.addEventListener('mouseup', deactivate, false);
			el.addEventListener('mouseleave', deactivate, false);

			if (isTouch) {
				el.addEventListener('touchstart', activate, false);
				el.addEventListener('touchcancel', deactivate, false);
				el.addEventListener('touchend', deactivate, false);
			}
		}
	},
};

function activate(evt) {
	evt.currentTarget.classList.add(quicktap.class);
}

function deactivate(evt) {
	evt.currentTarget.classList.remove(quicktap.class);
}

module.exports = quicktap;
