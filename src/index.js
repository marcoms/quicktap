`use strict`;

// @preserve - quicktap by Marco Scannadinari, MIT licensed

if (typeof window === `undefined`) {
	throw new Error(`quicktap can only be used in the browser`);
}

function makeActivateDeactivateFns(className) {
	return {
		activate(evt) {
			evt.currentTarget.classList.add(className);
		},

		deactivate(evt) {
			evt.currentTarget.classList.remove(className);
		},
	};
}

const touchEnabled = `ontouchstart` in window;

let supportsPassive = false;

try {
	const opts = Object.defineProperty({}, `passive`, {
		get() { supportsPassive = true; }
	});

	window.addEventListener(`x`, null, opts);
} catch (err) {}

function quicktap(elOrEls, className) {
	let els = [];

	if (elOrEls instanceof HTMLElement) {
		els.push(elOrEls);
	} else if (typeof elOrEls === `string`) {
		const matchingEls = document.querySelectorAll(elOrEls);
		if (matchingEls !== null) {
			els = Array.from(matchingEls);
		}
	} else if (elOrEls instanceof NodeList) {
		els = Array.from(elOrEls);
	} else if (elOrEls instanceof Array) {
		els = elOrEls;
	} else {
		throw new Error(`Must pass HTMLElement, string, NodeList, or Array as first parameter`);
	}

	if (typeof className === `undefined`) {
		className = quicktap.class;
	} else if (typeof className !== `string`) {
		throw new Error(`Must pass string as second parameter`);
	}

	const {activate, deactivate} = makeActivateDeactivateFns(className);

	els = els.filter((el) => {
		return el instanceof HTMLElement;
	});

	for (const el of els) {
		if (supportsPassive) {
			const opts = {passive: true};

			el.addEventListener(`mousedown`, activate, opts);
			el.addEventListener(`mouseup`, deactivate, opts);
			el.addEventListener(`mouseleave`, deactivate, opts);

			if (touchEnabled) {
				el.addEventListener(`touchstart`, activate, opts);
				el.addEventListener(`touchcancel`, deactivate, opts);
				el.addEventListener(`touchend`, deactivate,  opts);
			}
		} else {
			el.addEventListener(`mousedown`, activate, false);
			el.addEventListener(`mouseup`, deactivate, false);
			el.addEventListener(`mouseleave`, deactivate, false);

			if (touchEnabled) {
				el.addEventListener(`touchstart`, activate, false);
				el.addEventListener(`touchcancel`, deactivate, false);
				el.addEventListener(`touchend`, deactivate, false);
			}
		}
	}

	return els;
};

quicktap.class = `active`;
quicktap.version = {
	major: VERSION_MAJOR,
	minor: VERSION_MINOR,
	patch: VERSION_PATCH,
};

export default quicktap;
