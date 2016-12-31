# `quicktap`

[![quicktap](https://img.shields.io/npm/v/quicktap.svg)](https://www.npmjs.com/package/quicktap)

`quicktap` implements a class-based replacement for the `:active` pseudo-class that doesn't delay on mobile. Elements using `quicktap` should manifest a noticeable improvement in touch latency.

View the [demo page](https://marcoms.github.io/quicktap/demo) on a mobile device, or watch a [video](https://marcoms.github.io/quicktap/demo/res/video/demo.webm) of the differences.

## Background

You may notice from the demo page how the regular take longer to respond to presses on the mobile device than the quicktap buttons.

At this time, both Chrome and Firefox have a small delay between the `touchstart` event and actually adding the `:active` pseudoclass to the element. It is assumed that this is the case to prevent panning or scrolling from causing the `:active` selector to match and cause visual feedback. Unfortunately this sacrifices touch latency even when the user wants to tap on an element.

`quicktap` gets around this by listening for `touchstart` and `touchend` events (among others), and adding and removing a CSS class on an element accordingly. With these changes, it noticeably improves the user experience, since there is almost instant feedback from a user interaction.

It is important to know that `quicktap` does not intefere with any `click` events and so should not affect the browser's behaviour.

## Using `quicktap`

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

### `quicktap(elOrEls)`

Applies `quicktap` enhancements to `elOrEls`.

`elOrEls` may be one of `HTMLElement`, `string` (selector), `NodeList` (returned by DOM methods such as `querySelector`, or `Array`.

Returns all of the elements that have been successfully modified.

#### Examples

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
```

### `quicktap.class`

Default: `'active'`

String to use as the class name for elements which have been activated by a touch or mouse event.

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

## License

MIT (see license.txt)
