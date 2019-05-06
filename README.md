# [scroll-utility](https://github.com/LeDDGroup/scroll-utility)

[![npm](https://img.shields.io/npm/dw/scroll-utility.svg)](https://www.npmjs.com/package/scroll-utility)
[![](https://data.jsdelivr.com/v1/package/npm/scroll-utility/badge)](https://www.jsdelivr.com/package/npm/scroll-utility)  
[![Travis](https://travis-ci.org/LeDDGroup/scroll-utility.svg?branch=master)](https://travis-ci.org/LeDDGroup/scroll-utility)
[![Maintainability](https://api.codeclimate.com/v1/badges/0914e9eba77aee46d514/maintainability)](https://codeclimate.com/github/LeDDGroup/scroll-utility/maintainability)
[![Greenkeeper badge](https://badges.greenkeeper.io/LeDDGroup/scroll-utility.svg)](https://greenkeeper.io/)
[![Gitter](https://img.shields.io/gitter/room/nwts/nw.js.svg)](https://gitter.im/LeddSoftware/scroll-utility)

<!-- markdown-toc start - Don't edit this section. Run M-x markdown-toc-refresh-toc -->

**Table of Contents**

- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
  - [Basic Scroll](#basic-scroll)
  - [Creating a scroll manager](#creating-a-scroll-manager)
    - [scroll wrapper](#scroll-wrapper)
    - [direction](#direction)
    - [onScroll callback](#onscroll-callback)
    - [default duration](#default-duration)
    - [easing](#easing)
  - [Scrolling](#scrolling)
    - [scrollBy](#scrollby)
      - [scrollBy element](#scrollby-element)
      - [scrollBy size](#scrollby-size)
      - [scrollBy scrollSize](#scrollby-scrollsize)
    - [scrollTo](#scrollto)
      - [scrollTo element](#scrollto-element)
      - [scrollTo size](#scrollto-size)
      - [scrollTo scrollSize](#scrollto-scrollsize)
  - [Computed values](#computed-values)
    - [scrollPosition](#scrollposition)
    - [size](#size)
    - [scrollSize](#scrollsize)
    - [relativeElementPosition](#relativeelementposition)
- [Browser Compatibility](#browser-compatibility)
- [Why?](#why)
- [License](#license)
- [Support](#support)

<!-- markdown-toc end -->

# Features

- Smooth scroll inside any element in any direction
- Center elements
- Extremely precise
- Handle multiple scroll animation at the time
- High performance
- Detect onScroll events and differentiate between user and utility scroll
- React to elements position changes
- Customize _easing_ function used to animate the scroll
- Typescript support

# Installation

It can be installed from npm,

```bash
$ npm install --save scroll-utility
```

or from a cdn at [jsdelivr](https://www.jsdelivr.com/package/npm/scroll-utility)

```html
<script src="https://cdn.jsdelivr.net/npm/scroll-utility@4"></script>
```

when downloading from a cdn the package will be globally exported as `ScrollUtility`

# Usage

## Basic Scroll

```ts
import { Scroll } from "scroll-utility"
// const Scroll = ScrollUtility.Scroll // if using from a cdn

const scrollManager = new Scroll()

scrollManager.scrollTo(50) // scroll to position = 50px
scrollManager.scrollTo(50, 1000) // scroll in 1000ms
scrollManager.scrollTo.element("#some-element") // scroll to "#some-element"
scrollManager.scrollTo.element("#some-element", 0.5) // scroll to "#some-element" and center it
scrollManager.scrollTo.element("#some-element", 1, 1000) // scroll to "#some-element" and place it at the bottom of the screen in 1000ms
scrollManager.scrollTo.scrollSize(0) // scroll to the top of the page
scrollManager.scrollTo.scrollSize(1) // scroll to the bottom
scrollManager.scrollTo.scrollSize(0.5, 1000) // scroll to the middle in 1000ms
scrollManager.scrollTo.size(0) // scroll to top (1st 'screen')
scrollManager.scrollTo.size(1) // scroll to the 2nd screen
scrollManager.scrollTo.size(2, 999) // scroll to the 3rd screen in 999ms

scrollManager.scrollBy(50) // scroll by 50px
scrollManager.scrollBy(50, 1000) // scroll by 50px in 1000ms
scrollManager.scrollBy.element("#some-element") // scroll by "#some-element"'s size
scrollManager.scrollBy.element("#some-element", 0.5) // scroll by half of the size of "#some-element"
scrollManager.scrollBy.element("#some-element", 1, 1000) // scroll by "#some-element"' size in 1000ms
scrollManager.scrollBy.element("#some-element", 0) // this don't do any scroll
scrollManager.scrollBy.scrollSize(0.1) // scroll by 10% of the scroll size
scrollManager.scrollBy.size(1) // scroll a screen down
scrollManager.scrollBy.size(-1) // scroll a screen up
scrollManager.scrollBy.size(0.5, 1000) // scroll half a screen down
```

That's just a quick reference cheat sheet of how to use scroll-utility, if you want to learn more keep reading :)

## Creating a scroll manager

```ts
import { Scroll } from "scroll-utility"

const scrollManager = new Scroll({
  element: window, // default scroll container is window
  horizontal: false, // default direction vertical
  onScroll: null, // no onScroll callback by default
  duration: 0, // default duration to 0, 'instant' scroll
  easing: defaultEasingFunction, // default easing function is inOutCubic
})

const scrollManagerWithOutOptions = new Scroll() // same as above
```

### scroll wrapper

The _element_ option when creating a 'scrollManager' indicates the element in which the scroll will take place, by default the window

```ts
const documentElement = document.querySelector("html")!

let scrollManager = new Scroll() // create a scrollManager for the window
scrollManager = new Scroll({ element: window }) //same as above
scrollManager = new Scroll({ element: "html" }) //same as above
scrollManager = new Scroll({ element: documentElement }) //same as above
scrollManager = new Scroll({ element: document.documentElement }) //same as above

scrollManager = new Scroll({ element: "#some-element" }) // create a scrollManager for the "#some-element"
scrollManager = new Scroll({ element: document.getElementById("some-element") }) // same as above
```

### direction

The _horizontal_ option indicates the direction when scrolling, by default vertical

```ts
let scrollManager = new Scroll() // create a scrollManager with vertical scroll (default behavior)
scrollManager = new Scroll({ horizontal: false }) // same as above
scrollManager = new Scroll({ horizontal: true }) // create a scrollManager with horizontal scroll
```

### onScroll callback

```js
let scrollManager = new Scroll() // no callback by default :)
scrollManager = new Scroll({
  onScroll: external => {
    console.log("scrolled!")
    if (external) {
      // external === true if the scroll was triggered by other means (the user with the mouse or other js running in the browser)
    }
  },
})

// can be changed later:
scrollManager.onScroll = () => console.log("new onScroll callback") // callback changed
scrollManager.onScroll = null // go back to default config :)
```

### default duration

The _duration_ option indicates the default duration of the scroll animations in milliseconds, by default 0

```ts
let scrollManager = new Scroll() // default duration is 0ms (instant scroll)
scrollManager = new Scroll({ duration: 350 }) // 350ms scroll duration

// can be changed later:
scrollManager.duration = 1000 // 1 second scroll duration
```

### easing

The _easing_ option indicates the default animation of the scroll, which is by default _inOutQuad_

```ts
import { Scroll, defaultEasingFunction } from "scroll-utility"

let scrollManager = new Scroll() // inOutCubic animation by default
scrollManager = new Scroll({ easing: defaultEasingFunction }) // same as above

// can also be changed later:
scrollManager.easing = (currentStep, offsetValue, distance, totalSteps) => {
  // some linear function (I think is linear)
  return distance * (currentStep / totalSteps) + offsetValue
}
```

[Here](https://gist.github.com/davidpa9708/ba0d2940aee851f65f75c0ca5ba5fb60) are some more easing functions

## Scrolling

### scrollBy

_scrollBy_ will accept a value (the number of px to scroll down), a duration (to override the default duration), and a easing function (to override the default one).  
If the value in negative it will scroll up

```ts
scrollManager.scrollBy(50) // scroll 50px down
scrollManager.scrollBy(-50) // scroll 50px up
scrollManager.scrollBy(50, 1000) // scroll by 50px in 1000ms
scrollManager.scrollBy(50, 1000, customEasingFunction) // it can also be specified an easing function just for that scroll animation
```

#### scrollBy element

The 1st parameter of scrollBy.element is the element whose size will be used to scroll, the rest of parameters same as plane scrollBy

```ts
scrollManager.scrollBy.element("#some-element") // scroll by "#some-element"'s size
scrollManager.scrollBy.element("#some-element", 0.5) // scroll by half of the size of "#some-element"
scrollManager.scrollBy.element("#some-element", -1, 1000) // scroll by "#some-element"' size up in 1000ms
scrollManager.scrollBy.element("#some-element", 1, 1000, customEasingFunction) // scroll by "#some-element"' size in 1000ms with a customEasingFunction
```

#### scrollBy size

Here the _size_ is the size of the scroll container, and the value passed is a modifier, been 1 the full size, 0.5 half, and a negative value will mean the scroll will be up instead of down (or left instead of right)

```ts
scrollManager.scrollBy.size(1) // scroll a screen down
scrollManager.scrollBy.size(-1) // scroll a screen up
scrollManager.scrollBy.size(0.5, 1000) // scroll half a screen down
```

See [size](#size)

#### scrollBy scrollSize

```ts
scrollManager.scrollBy.scrollSize(0.1) // scroll by 10% of the scroll size
```

See [scrollSize](#scrollsize)

### scrollTo

_scrollTo_ will accept a value (the position to scroll to), a duration (to override the default duration), and a easing function (to override the default one).

```ts
scrollManager.scrollTo(50) // scroll to position = 50px
scrollManager.scrollTo(50, 1000) // scroll in 1000ms
```

#### scrollTo element

The 1st parameter of scrollTo.element is the element whose position will be used to scroll, the rest of parameters same as plane scrollTo

For the value used to center the element, it matches the same criteria used in [getRelativeElementPosition](#relativeelementposition)

```ts
scrollManager.scrollTo.element("#some-element") // scroll to "#some-element"
scrollManager.scrollTo.element("#some-element", 0.5) // scroll to "#some-element" and center it
scrollManager.scrollTo.element("#some-element", 1, 1000) // scroll to "#some-element" and place it at the bottom of the screen in 1000ms
```

#### scrollTo size

Pretty much the same as [scrollBy.size](#scrollby-size), except it scrolls _to_ instead of _by_.

```ts
scrollManager.scrollTo.size(0) // scroll to top (1st 'screen')
scrollManager.scrollTo.size(1) // scroll to the 2nd screen
scrollManager.scrollTo.size(2, 999) // scroll to the 3rd screen in 999ms
```

See [size](#size)

#### scrollTo scrollSize

Same as [scrollBy.scrollSize](#scrollby-scrollsize), except it scrolls _to_ instead of _by_.

```ts
scrollManager.scrollTo.scrollSize(0) // scroll to the top of the page
scrollManager.scrollTo.scrollSize(1) // scroll to the bottom
scrollManager.scrollTo.scrollSize(0.5, 1000) // scroll to the middle in 1000ms
```

See [scrollSize](#scrollsize)

## Computed values

### scrollPosition

```ts
const scrollManager = new Scroll()

scrollManager.scrollPosition // current position of the scroll (direction depends of the default value passed in the constructor)
```

### size

```ts
const scrollManager = new Scroll()

scrollManager.size // the size of the element (excluding its borders and scrollbar's size)
```

### scrollSize

```ts
const scrollManager = new Scroll()

scrollManager.scrollSize // the total scroll you can do, (scrollHeight - height (or width depending on the direction))
```

### relativeElementPosition

```ts
const relativePosition = new Scroll().getRelativeElementPosition("#some-elemet")

if (relativePosition < -1) {
  /// element is out of view
}
if (relativePosition > -1 && relativePosition < 0) {
  // element bottom is partially visible
}
if (relativePosition > 0 && relativePosition < 1) {
  // element is fully visible
  if (relativePosition === 0.5) {
    // ...element is centered in view
  }
}
if (relativePosition > 1 && relativePosition < 2) {
  // element top is partially visible
}
if (relativePosition > 2) {
  // element is out of view
}
```

# Browser Compatibility

Test are made using automate testing with [Browserstack](https://www.browserstack.com) [for open source](https://www.browserstack.com/open-source?ref=pricing).
<span> <img src="./assets/BrowserStack-logo.png" width="200px" align="middle" /> </span>

# Why?

There are a lot of packages about smooth scrolling, so, what's the difference?

Well, the main idea is to be able to stack multiple scroll animations together, and with high precision. That is not an extra feature, that's what this package does, you can trigger multiple animations to several places, and it will be as precise as it can be.

# License

[MIT](./LICENSE.md)

# Support

This project is free and open-source, so if you think this project can help you or anyone else, you should star it in [github](https://github.com/LeDDGroup/scroll-utility/)
Also feel free to open an [issue](https://github.com/LeDDGroup/scroll-utility/issues) if you have any idea, question, or you've found a bug. Any feedback is good support
