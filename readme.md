# quicktap

[![quicktap](https://img.shields.io/npm/v/quicktap.svg)](https://www.npmjs.com/package/quicktap)

quicktap implements a class-based replacement for the `:active` pseudo-class that doesn't delay on mobile. Elements using quicktap should manifest a noticeable improvement in touch latency.

View the [demo page](https://marcoms.github.io/quicktap/demo) on a mobile device, or watch a [video](https://marcoms.github.io/quicktap/demo/res/video/demo.webm) of the differences.

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->


- [Background](#background)
- [Installation](#installation)
- [Usage](#usage)
- [API](#api)
  - [`quicktap(elOrEls, options={})`](#quicktapelorels-options)
  - [`quicktap.version`](#quicktapversion)
- [License](#license)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

## Background

You may notice from the demo page how the regular take longer to respond to presses on the mobile device than the quicktap buttons.

Both Chrome and Firefox have a delay between the `touchstart` event and setting the `:active` pseudoclass. It is assumed that this is the case to prevent panning or scrolling from causing unintended visual feedback. Unfortunately this sacrifices touch latency even when the user wants to tap on an element.

quicktap gets around this by listening for `touchstart` and `touchend` events (among others), and toggling an element's class accordingly. This noticeably improves the user experience, since there is almost instant feedback from a user interaction.

## Installation

```bash
# using npm
$ npm install -S quicktap

# using yarn
$ yarn add quicktap
```

## Usage

```js
const quicktap = require('quicktap');

// or using ES modules
import quicktap from 'quicktap';
```

Apply quicktap enhancements to your chosen element.

```js
quicktap('#target-element');
```

Now, the element will have the `.active` class when it is pressed.

```css
#target-element {
	background: white;
	color: blue;
}

#target-element.active {
	background: blue;
	color: white;
}
```

## API

### `quicktap(elOrEls, options={})`

Applies quicktap enhancements to `elOrEls`. This will cause each targeted element to fire an `activate` event when pressed and a `deactivate` event when released.

`options` is an object with two optional properties:
- `class` (`string`): string to use for active class name instead of `'active'`
- `context` (one of `Document`, `DocumentFragment`, `HTMLElement`): context to use if `elOrEls` is a selector string. Useful for shadow roots (default: `document`)

`elOrEls` may be one of `HTMLElement`, `string` (selector), `NodeList` (returned by DOM methods such as `querySelector`, or `Array` (of `HTMLElement`s).

Returns all of the elements that have been successfully modified.

#### Example

```js
// single element

const elementReference = document.querySelector('#target-element');
quicktap(elementReference);

// events

elementReference.addEventListener('activate', () => {
    console.log('element activated');
});

elementReference.addEventListener('deactivate', () => {
    console.log('element deactivated');
});

// selector

quicktap('.selector');

// NodeList

const elementReferences = document.querySelectorAll('.selector');
quicktap(elementReferences);

// array

const elementArray = [
	document.querySelector('#a'),
	document.querySelector('#b'),
	document.querySelector('#c'),
];

quicktap(elementArray);

// unique class

// #target-element will have the 'unique-class' class when pressed
quicktap('#target-element', {class: 'unique-class'});

// specified context

const containerOfButtons = document.querySelector('.buttons-container');
quicktap('.button', {context: containerOfButtons});

// shadow DOM (after element has been templated)

const hostElement = document.querySelector('#shadow-host');
quicktap('#shadow-button', {context: hostElement.shadowRoot});
```

### `quicktap.version`

Returns an object specifying quicktap's version with the following structure:

```js
{
	major: <Number>,
	minor: <Number>,
	patch: <Number>,
}
```

## License

MIT (see license.txt)
