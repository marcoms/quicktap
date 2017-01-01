# `quicktap`

[![quicktap](https://img.shields.io/npm/v/quicktap.svg)](https://www.npmjs.com/package/quicktap)

`quicktap` implements a class-based replacement for the `:active` pseudo-class that doesn't delay on mobile. Elements using `quicktap` should manifest a noticeable improvement in touch latency.

View the [demo page](https://marcoms.github.io/quicktap/demo) on a mobile device, or watch a [video](https://marcoms.github.io/quicktap/demo/res/video/demo.webm) of the differences.

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->


- [Background](#background)
- [Installation](#installation)
- [Usage](#usage)
- [API](#api)
  - [`quicktap(elOrEls, className=quicktap.class)`](#quicktapelorels-classnamequicktapclass)
  - [`quicktap.class`](#quicktapclass)
  - [`quicktap.version`](#quicktapversion)
- [License](#license)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

## Background

You may notice from the demo page how the regular take longer to respond to presses on the mobile device than the quicktap buttons.

Both Chrome and Firefox have a delay between the `touchstart` event and setting the `:active` pseudoclass. It is assumed that this is the case to prevent panning or scrolling from causing unintended visual feedback. Unfortunately this sacrifices touch latency even when the user wants to tap on an element.

`quicktap` gets around this by listening for `touchstart` and `touchend` events (among others), and toggling an element's class accordingly. This noticeably improves the user experience, since there is almost instant feedback from a user interaction.

## Installation

```bash
$ npm install -S quicktap
```

## Usage

```js
const quicktap = require(`quicktap`);

// or using ES modules
import quicktap from 'quicktap';
```

Apply quicktap enhancements to your chosen element.

```js
quicktap(`#target-element`);
```

Now, the element will have the `.active` class (or a unique one if you have changed `quicktap.class` yourself) when it is pressed.

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

### `quicktap(elOrEls, className=quicktap.class)`

Applies `quicktap` enhancements to `elOrEls`. If `className` is provided, then that value will be used as the active class instead of `quicktap.class` for the element(s) provided.

`elOrEls` may be one of `HTMLElement`, `string` (selector), `NodeList` (returned by DOM methods such as `querySelector`, or `Array` (of `HTMLElement`s).

Returns all of the elements that have been successfully modified.

#### Example

```js
// single element

const elementReference = document.querySelector(`#target-element`);
quicktap(elementReference);

// selector

quicktap(`.selector`);

// NodeList

const elementReferences = document.querySelectorAll(`.selector`);
quicktap(elementReferences);

// array

const elementArray = [
	document.querySelector(`#a`),
	document.querySelector(`#b`),
	document.querySelector(`#c`),
];

quicktap(elementArray);

// unique class

// #target-element will have the 'unique-class' class when pressed
quicktap(`#target-element`, `unique-class`);
```

### `quicktap.class`

Default: `'active'`

String to use as the default class name for elements which have been activated by a touch or mouse event.

#### Example

##### JS

```js
quicktap.class = `radioactive`;
```

##### CSS

```css
.button.radioactive {
	background: hotpink;
	color: white;
}
```

### `quicktap.version`

Returns an object specifying `quicktap`'s version with the following structure:

```js
{
	major: <Number>,
	minor: <Number>,
	patch: <Number>,
}
```

## License

MIT (see license.txt)
