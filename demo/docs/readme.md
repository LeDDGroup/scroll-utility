# [scroll-utility](https://github.com/LeDDGroup/scroll-utility)

[![Travis](https://travis-ci.org/LeDDGroup/scroll-utility.svg?branch=master)](https://travis-ci.org/LeDDGroup/scroll-utility)
[![BrowserStack Status](https://www.browserstack.com/automate/badge.svg?badge_key=QmJOaDZzS3BBOWUrem1PMWw1K29CZjByZjNBcTNyYlE0LzVYZEhFYVg1ST0tLXBOR05wTitscU1PM2FvQ0NrOUlHbHc9PQ==--70960e59e91fc8efc3dced4f2cebeff5665746ca)](https://www.browserstack.com/automate/public-build/QmJOaDZzS3BBOWUrem1PMWw1K29CZjByZjNBcTNyYlE0LzVYZEhFYVg1ST0tLXBOR05wTitscU1PM2FvQ0NrOUlHbHc9PQ==--70960e59e91fc8efc3dced4f2cebeff5665746ca)  
[![](https://data.jsdelivr.com/v1/package/npm/scroll-utility/badge)](https://www.jsdelivr.com/package/npm/scroll-utility)  
[![Conventional Commits](https://img.shields.io/badge/Conventional%20Commits-1.0.0-yellow.svg)](https://conventionalcommits.org)
[![semantic-release](https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg)](https://github.com/semantic-release/semantic-release)  
[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square)](https://github.com/prettier/prettier)
[![linter: lynt](https://img.shields.io/badge/linter-lynt-E81AAF.svg)](https://github.com/saadq/lynt)
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

# Basic usage

```js
import { Scroll } from "scroll-utility"

const element = document.getElementById("some-element") || window
const scrollManager = new Scroll(element, settings) // for scrolling inside element instead of window

// start a scroll animation

scrollManager.centerElement(someHTMLElement, options) // scroll to some element
scrollManager.scrollTo(scrollType, options) // scroll to some position
scrollManager.scrollBy(scrollType, options) // offset scroll position by some value

const scrollType = "percent" || "value" || "screen"

const options = { // default options
  value: 0,
  duration: 1000,
  horizontal: false,
},


// onScroll events

scrollManager.onScroll = () => console.log("scroll occurred in scrollManager container")
scrollManager.onUtilityScroll = () => console.log("this scroll utility did scrolled")
scrollManager.onExternalScroll = () => console.log("this scroll utility did not scrolled!")

// stopping animations

scrollManager.stopAllAnimations() // stop all animation in "scrollManager"
const animation = scrollManager.scroll.offset(1000, { duration: 1000 }) // capture animation
animation.stop() // stop animation
```

# Installation

It can be installed from npm,

```bash
$ npm install --save scroll-utility
```

or from a cdn at [jsdelivr](https://www.jsdelivr.com/package/npm/scroll-utility)

```html
<script src="https://cdn.jsdelivr.net/npm/scroll-utility@1"></script>
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

### Settings

```js
const defaultSettings = {
  easing: defaultEasingFunction,
  onScroll: null,
  onUtilityScroll: null,
  onExternalScroll: null,
  options: {
    duration: 1000,
    horizontal: false,
  },
}
```

## Center Element

```js
// assuming scrollManager is declared
scrollManager.centerElement(element, value, options)
```

## ScrollTo

```js
scrollManager.scrollTo(scrollType, value, options)
```

## ScrollBy

```js
scrollManager.scrollBy(scrollType, value, options)
```

## scrollType

```js
const scrollType = "value" // | "percent" | "screen"
```

## options

```js
const options = {
  // defaults
  duration: 1000, // duration of the scroll in milliseconds
  horizontal: false, // direction of the scroll animation
}
```

## scroll examples

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

## onScroll events

```js
const scrollManager = new Scroll(window, {
  onScroll: () => console.log("scroll occurred in scrollManager container")
  onUtilityScroll: () => console.log("this scroll utility did scrolled")
  onUserScroll: () => console.log("this scroll utility did not scrolled!")
})
```

for example, if you wish to stop all animations every time the user scroll you could do:

```js
const scrollManager = new Scroll(window, {
  onUtilityScroll: () => scrollManager.stopAllAnimations(),
})
```

## Stack animations and high precision

The main idea of this module is to be able of doing several animation at the same time, and still get a desirable outcome.  
It is very difficult to archive precision when scrolling, due to the fact that browsers don't scroll well to floating numbers, they often round it up. So is even more difficult when there are several animations.  
That is the best thing of scroll-utility. It is design to work with multiple animations and keep track on where the scroll position should end.

For example:

```js
scrollManager.scrollBy("value", 500)
scrollManager.scrollBy("value", 34)
```

1 second from it started to move, it will have been offset its position for 534px

Bear in mind that all animations always stack together, so generally when you use _toPercent_ _toPosition_ _toElement_, you would want to use _stopAllAnimation_, to ensure that there are not any other animation, otherwise they will stack together, which is generally not wanted

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
