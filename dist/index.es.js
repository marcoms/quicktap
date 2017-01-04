const version = "3.2.0";

// @preserve - quicktap by Marco Scannadinari, MIT licensed

const [versionMajor, versionMinor, versionPatch] = version.split(`.`);

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

function quicktap(elOrEls, options={}) {
	let els = [];

	if (typeof options !== `object`) {
		throw new Error(`options must be an object (got '${options}'`);
	}

	let className = options.class;

	if (typeof className === `undefined`) {
		className = quicktap.class;
	} else if (typeof className !== `string`) {
		throw new Error(`options.class must be string (got '${elOrEls}')`);
	}

	const {activate, deactivate} = makeActivateDeactivateFns(className);

	let context = options.context;

	if (typeof context === `undefined`) {
		context = document;
	} else if (
		!(context instanceof Document)
		&& !(context instanceof DocumentFragment)
		&& !(context instanceof HTMLElement)
	) {
		throw new Error(`options.context must be one of Document, DocumentFrament, or HTMLElement (got '${context}')`);
	}

	if (elOrEls instanceof HTMLElement) {
		els.push(elOrEls);
	} else if (typeof elOrEls === `string`) {
		const matchingEls = context.querySelectorAll(elOrEls);
		if (matchingEls !== null) {
			els = Array.from(matchingEls);
		}
	} else if (elOrEls instanceof NodeList) {
		els = Array.from(elOrEls);
	} else if (elOrEls instanceof Array) {
		els = elOrEls;
	} else {
		throw new Error(`elOrEls must be one of HTMLElement, string, NodeList, or Array (got '${elOrEls}')`);
	}

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
}

quicktap.class = `active`;
quicktap.version = {
	major: Number.parseInt(versionMajor, 10),
	minor: Number.parseInt(versionMinor, 10),
	patch: Number.parseInt(versionPatch, 10),
};

export default quicktap;