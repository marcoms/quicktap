# `quicktap`

`quicktap` is an :active replacement that doesn't delay on mobile

![Demo](demo.gif)

> `quicktap` in action (see [demo](https://marcoms.github.io/quicktap) on a mobile device or using mobile emulation in Chrome DevTools)

## Background

From the above GIF, you may notice how the bottom buttoms take longer to respond to presses on the mobile device than the top buttons. Unfortunately this still is the case in Chrome and Firefox today.

At this time, both Chrome and Firefox have a small delay between the `touchstart` event and actually adding the `:active` pseudoclass to the element. It is assumed that this is the case to prevent panning or scrolling from causing the `:active` selector to match when the user didn't intend to click on an element (yet why is this not also the case when a user drags across text to select it on desktop?). These are valid concerns and those who value them shoud stick with their current system, but for those who value instant user feedback more, this library could be used.

`quicktap` gets around this by listening for `touchstart` and `touchend` events (among others), and adding and removing a CSS class on an element accordingly. With these changes, it noticeably improves the user experience, since there is almost instant feedback from a user interaction. You can see this in the top buttons in the GIF.

It is important to know that `quicktap` does not intefere with any `click` events and so should not affect the browser's behaviour. Also, this is not dealing with the infamous "300ms click delay" which is a separate and solved issue in most browsers and by the [FastClick](https://github.com/ftlabs/fastclick) library.

## Using `quicktap`

Obtain a reference to the element you want to apply `quicktap` enhancements to.

```js
const targetElement = document.querySelector("#target-element");
```

Apply using `quicktap.apply`.

```js
quicktap.apply(targetElement);
```

Now, instead of using the `:active` selector in your CSS, switch to using `.active` (or what you have set `quicktap.tag` to).

```css
.button.active {
	background: black;
	color: white;
}
```

### Using a different class name

You may set `quicktap.tag` to a string different to the default value of `"active"`, perhaps to prevent clashes with your current codebase. After you have done so, you may use this tag in your CSS.

```js
quicktap.tag = "radioactive";
```

```css
.button.radioactive {
	background: hotpink;
	color: white;
}
```

## API

### `quicktap.tag`

Default: `"active"`

String to use as the class name for elements which have been activated by a touch or mouse event.

### `quicktap.apply(el)`

Applies `quicktap` enhancements to `el`.

More specifically, this adds event listeners to `el` that await mouse and touch events, which causes an element to be activated or deactivated.

## License

MIT (see license.txt)
