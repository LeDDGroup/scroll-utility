# [scroll-utility](https://github.com/LeDDGroup/scroll-utility)

[![npm](https://img.shields.io/npm/dw/scroll-utility.svg)](https://www.npmjs.com/package/scroll-utility)
[![](https://data.jsdelivr.com/v1/package/npm/scroll-utility/badge)](https://www.jsdelivr.com/package/npm/scroll-utility)  
[![Travis](https://travis-ci.org/LeDDGroup/scroll-utility.svg?branch=master)](https://travis-ci.org/LeDDGroup/scroll-utility)
[![Maintainability](https://api.codeclimate.com/v1/badges/0914e9eba77aee46d514/maintainability)](https://codeclimate.com/github/LeDDGroup/scroll-utility/maintainability)
[![Gitter](https://img.shields.io/gitter/room/nwjs/nw.js.svg)](https://gitter.im/LeddSoftware/scroll-utility)

# Features:

- Smooth scroll inside any element in any direction
- Center elements
- Scroll to and offset scroll position
- Extremely precisely
- Handle multiple scroll animation at the time
- Cross-browser compatible (tests with [Browserstack](browserstack.com))
- Performance aware
- Detect onScroll events and differentiate between user and utility scroll
- Customize _easing_ function used to animate the scroll
- Typescript support

# Why?

There are a lot of packages about smooth scrolling, so, what's the difference?

Well, the main idea was to stack multiple scroll animations together, and precision. That is not an extra feature, that's what this package does, you can trigger multiple animations to several places, and it will be as precise as it can (bear in mind that browsers round the scroll position, so the margin error will be +- 0.5)  
And to create a full-featured(yet simple) library to animate the position of the scroll.

To see how precise it was, (and to test cross-browser compatibility) I made this [demo](https://leddgroup.com/scroll-utility)

# Basic Usage

```js
import scrollManager from "scroll-utility"

const element = document.getElementById("some-element")

scrollManager.centerElement(element, 50)
// scrollManager.scrollTo("percent", 50)
// scrollManager.scrollBy("screen", 1)
```

That's it, the first case will center the element with id _some-element_ in the middle of the screen  
The 2nd will scroll to the half of the page  
And the 3rd will offset scroll position by 1 _screen_

By default it will scroll vertically, and with 1 second of duration

# Quick Reference

```js
import { Scroll } from "scroll-utility"

const element = document.getElementById("some-element") || window
const scrollManager = new Scroll(element, settings) // for scrolling inside element instead of window

// start a scroll animation

scrollManager.centerElement(someHTMLElement, value, options) // scroll to some element
scrollManager.scrollTo(scrollType, value, options) // scroll to some position
scrollManager.scrollBy(scrollType, value, options) // offset scroll position by some value

const scrollType = "percent" || "value" || "screen"

const options = {
  // default options
  duration: 1000,
  horizontal: false,
}

// stopping animations

scrollManager.stopAllAnimations() // stop all animation in "scrollManager"
const animation = scrollManager.scrollTo("value", 1000, { duration: 1000 }) // create and capture animation
animation.stop() // stop animation
```

# Installation

It can be installed from npm,

```bash
$ npm install --save scroll-utility
```

or from a cdn at [jsdelivr](https://www.jsdelivr.com/package/npm/scroll-utility)

```html
<script src="https://cdn.jsdelivr.net/npm/scroll-utility@2"></script>
```

when downloading from a cdn the package will be globally exported as `ScrollUtility`

# Usage

## Scroll Container

To start scrolling you first have to specify the element which will do the scroll. It can be a HTMLElement, like a div (usually with _overflow_ css property set to _auto_ or _scroll_); or the scroll can be as always effectuated by the _window_:

```js
import { Scroll } from "scroll-utility"

const someHTMLElement = document.getElementById("some-element")

const windowScrollManager = new Scroll() // scroll the page
// const windowScrollManager = new Scroll(window, settings) // same as above, with settings
const elementScrollManager = new Scroll(someHTMLElement, settings) // scroll the element
```

### Default export:

```js
import windowScrollManager from "scroll-utility"

// same as: `windowScrollManager = new Scroll()`
```

### Settings

```js
const defaultSettings = {
  // easing: defaultEasingFunction, // inOutCubic
  onScroll: null,
  onUtilityScroll: null,
  onExternalScroll: null,
  options: {
    duration: 1000,
    horizontal: false,
  },
}

const elementScrollManager = new Scroll(someHTMLElement, defaultSettings)

// or you can set them later at any time
scrollManager.updateSettings(settings)
```

## Scroll

### Center Element

```js
// assuming scrollManager is declared
scrollManager.centerElement(element, value, options)
```

### ScrollTo

```js
scrollManager.scrollTo(scrollType, value, options)
```

### ScrollBy

```js
scrollManager.scrollBy(scrollType, value, options)
```

### scrollType

For `scrollTo` and `scrollBy`, the first parameter (`scrollType`) is one of these:

```js
const scrollType = "value" | "percent" | "screen"
```

### options

The third parameter (`options`), is by default:

```js
const options = {
  duration: 1000, // duration of the scroll in milliseconds
  horizontal: false, // direction of the scroll animation
}
```

### examples

```js
const someElement = document.getElementById("some-element")
scrollManager.centerElement(someElement, 50) // will center element in 50% of its container

scrollManager.scrollTo("value", 1000) // will scroll to 1000px
scrollManager.scrollBy("value", 1000) // will offset current scroll position by 1000px

scrollManager.scrollTo("percent", 50) // will scroll to 50 percent of the page
scrollManager.scrollBy("percent", 50) // will offset current position by 50 percent of the page

scrollManager.scrollTo("screen", 1) // will scroll to the 2nd "screen"
scrollManager.scrollBy("screen", 1) // will offset position by 2 "screens"
```

## Detect onScroll

```ts
import { Scroll, ISettings } from "scroll-utility"

const settings: Partial<ISettings> = {
  onUtilityScroll: () => console.log("utility scroll"),
  onExternalScroll: () => console.log("external scroll"),
  onScroll: () => console.log("scroll"),
}

const scrollManager = new Scroll(window, settings)
```

### onScroll

if the _onScroll_ field is specified, it will be triggered any time a scroll event occurs in the container specified,  
also, _onExternalScroll_ or _onUtilityScroll_ will trigger too

### onExternalScroll

usually when the user scroll, but can be triggered by other scripts running in the browser, or by other _scrollManager_ instance

### onUtilityScroll

it's triggered when the _scrollManager_ instance is the one that effectuated the scroll

## Stop animations

```js
scrollManager.stopAllAnimations() // this will stop all animations in scrollManager

// to stop specific animations:
const animation = scrollManager.scrollBy("screen", 1)
animation.stop()
```

## Change easing function

```js
const scrollManager = new Scroll(window, {
  easing: some_easing_function,
})

// or just for one animation:
const animation = scrollManager.scrollBy("screen", 1)
animation.easing = some_easing_function
```

This [package](https://www.npmjs.com/package/easing-functions) provides easing functions. Or you can create your own

````
# Stack animations and high precision

The main idea of this module is to be able of doing several animation at the same time, and still get a desirable outcome.
It is very difficult to archive precision when scrolling, due to the fact that browsers don't scroll well to floating numbers, they often round it up. So is even more difficult when there are several animations.
That is the best thing of scroll-utility. It is design to work with multiple animations and keep track on where the scroll position should end.

For example:

```js
scrollManager.scrollBy("value", 500)
scrollManager.scrollBy("value", 34)
````

1 second from it started to move, it will have been offset its position for 534px

Bear in mind that all animations always stack together, so generally when you use _toPercent_ _toPosition_ _toElement_, you would want to use _stopAllAnimation_, to ensure that there are not any other animation, otherwise they will stack together, which is generally not wanted

for example, if you wish to stop all animations every time the user scroll you could do:

```js
const scrollManager = new Scroll(window, {
  onUtilityScroll: () => scrollManager.stopAllAnimations(),
})

# Cross-browser compatibility

Compatibility guaranteed in Firefox, Chrome, Edge, Safari. I mean, I have automated tests for those browsers (with browserstack), in every browser _should_ work too, I looked all over in stackoverflow looking for crossbrowser solutions for accessing dom properties of elements.
I have manually tested it in a lot of browsers, and it works without problems

<img  height="50" src="https://raw.githubusercontent.com/LeDDGroup/scroll-utility/master/assets/BrowserStack-logo.png" alt="Browserstack logo" style="float: right; margin-right: 10px; text-align: middle">

Test are made using automate testing with [Browserstack](https://www.browserstack.com) [for open source](https://www.browserstack.com/open-source?ref=pricing).

See tests results [here](https://www.browserstack.com/automate/public-build/QmJOaDZzS3BBOWUrem1PMWw1K29CZjByZjNBcTNyYlE0LzVYZEhFYVg1ST0tLXBOR05wTitscU1PM2FvQ0NrOUlHbHc9PQ==--70960e59e91fc8efc3dced4f2cebeff5665746ca)

# License

[MIT](./LICENSE.md)

# Support

This project is free and open-source, so if you think this project can help you or anyone else, you should star it in [github](https://github.com/LeDDGroup/scroll-utility/)
Also feel free to open an [issue](https://github.com/LeDDGroup/scroll-utility/issues) if you have any idea, question, or you've found a bug. Any feedback is good support
```
