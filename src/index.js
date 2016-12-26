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
	evt.currentTarget.classList.add(quicktap.tag);
}

function deactivate(evt) {
	evt.currentTarget.classList.remove(quicktap.tag);
}

module.exports = quicktap;
