// @preserve - quicktap by Marco Scannadinari <m@scannadinari.co.uk>, MIT licensed

import {version} from '../package.json';

const defaultActiveClass = 'active';
const [versionMajor, versionMinor, versionPatch] = version.split('.');

if (typeof window === 'undefined') {
	throw new Error('quicktap can only be used in the browser');
}

function makeActivateDeactivateFns(className) {
	// produce functions that toggle the appropriate class

	return {
		activate(evt) {
			const el = evt.currentTarget;
			const activateEvt = new CustomEvent('activate');

			el.dispatchEvent(activateEvt);
			el.classList.add(className);
		},

		deactivate(evt) {
			const el = evt.currentTarget;
			const deactivateEvt = new CustomEvent('deactivate');

			el.dispatchEvent(deactivateEvt);
			el.classList.remove(className);
		},
	};
}

// detect touch events support
const touchEnabled = 'ontouchstart' in window;

// detect passive event listener support

let supportsPassive = false;

try {
	const opts = Object.defineProperty({}, 'passive', {
		get() { supportsPassive = true; }
	});

	window.addEventListener('x', null, opts);
} catch (err) {}

function quicktap(elOrEls, options={}) {
	let els = [];

	if (typeof options !== 'object') {
		throw new Error(`options must be an object (got '${options}'`);
	}

	// class is not a reserved property name but is a reserved identifier
	let className = options.class;

	if (typeof className === 'undefined') {
		className = defaultActiveClass;
	} else if (typeof className !== 'string') {
		throw new Error(`options.class must be string (got '${elOrEls}')`);
	}

	const {activate, deactivate} = makeActivateDeactivateFns(className);

	let context = options.context;

	if (typeof context === 'undefined') {
		context = document;
	} else if (
		!(context instanceof Document)
		&& !(context instanceof DocumentFragment)
		&& !(context instanceof HTMLElement)
	) {
		throw new Error(`options.context must be one of Document, DocumentFrament, or HTMLElement (got '${context}')`);
	}

	let needsFilter = false;

	if (elOrEls instanceof HTMLElement) {
		els.push(elOrEls);
	} else if (typeof elOrEls === 'string') {
		const matchingEls = context.querySelectorAll(elOrEls);
		if (matchingEls !== null) {
			// NodeList -> Array
			els = Array.from(matchingEls);
		}
	} else if (elOrEls instanceof NodeList) {
		els = Array.from(elOrEls);
	} else if (elOrEls instanceof Array) {
		// can't guarantee all elements are HTMLElements

		els = elOrEls.filter((el) => {
			return el instanceof HTMLElement;
		});
	} else {
		throw new Error(`elOrEls must be one of HTMLElement, string, NodeList, or Array (got '${elOrEls}')`);
	}

	for (const el of els) {
		if (supportsPassive) {
			const opts = {passive: true};

			el.addEventListener('mousedown', activate, opts);
			el.addEventListener('mouseup', deactivate, opts);
			el.addEventListener('mouseleave', deactivate, opts);

			if (touchEnabled) {
				el.addEventListener('touchstart', activate, opts);
				el.addEventListener('touchcancel', deactivate, opts);
				el.addEventListener('touchend', deactivate,  opts);
			}
		} else {
			el.addEventListener('mousedown', activate, false);
			el.addEventListener('mouseup', deactivate, false);
			el.addEventListener('mouseleave', deactivate, false);

			if (touchEnabled) {
				el.addEventListener('touchstart', activate, false);
				el.addEventListener('touchcancel', deactivate, false);
				el.addEventListener('touchend', deactivate, false);
			}
		}
	}

	return els;
};

quicktap.version = {
	major: Number.parseInt(versionMajor, 10),
	minor: Number.parseInt(versionMinor, 10),
	patch: Number.parseInt(versionPatch, 10),
};

export default quicktap;
