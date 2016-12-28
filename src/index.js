`use strict`;

// @preserve - quicktap by Marco Scannadinari, MIT licensed

if (typeof window === `undefined`) {
	throw new Error(`quicktap can only be used in the browser`);
}

function activate(evt) {
	evt.currentTarget.classList.add(quicktap.class);
}

function deactivate(evt) {
	evt.currentTarget.classList.remove(quicktap.class);
}

const touchEnabled = `ontouchstart` in window;

let supportsPassive = false;
try {
	const opts = Object.defineProperty({}, `passive`, {
		get() { supportsPassive = true; }
	});

	window.addEventListener(`test`, null, opts);
} catch (err) {}

const quicktap = {
	class: `active`,

	apply(el) {
		if (el === undefined) {
			throw Error(`element parameter is required`);
		}

		if (supportsPassive) {
			el.addEventListener(`mousedown`, activate, {passive: true});
			el.addEventListener(`mouseup`, deactivate, {passive: true});
			el.addEventListener(`mouseleave`, deactivate, {passive: true});

			if (touchEnabled) {
				el.addEventListener(`touchstart`, activate, {passive: true});
				el.addEventListener(`touchcancel`, deactivate, {passive: true});
				el.addEventListener(`touchend`, deactivate,  {passive: true});
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
	},
};

export default quicktap;
