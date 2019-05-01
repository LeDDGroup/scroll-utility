# [scroll-utility](https://github.com/LeDDGroup/scroll-utility)

[![npm](https://img.shields.io/npm/dw/scroll-utility.svg)](https://www.npmts.com/package/scroll-utility)
[![](https://data.tsdelivr.com/v1/package/npm/scroll-utility/badge)](https://www.jsdelivr.com/package/npm/scroll-utility)  
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
- [Why?](#why)
- [License](#license)
- [Support](#support)

<!-- markdown-toc end -->

# Features

- Smooth scroll inside any element in any direction
- Center elements
- Extremely precise
- Handle multiple scroll animation at the time
- Performance aware
- Detect onScroll events and differentiate between user and utility scroll
- Customize _easing_ function used to animate the scroll
- Typescript support

# Installation

It can be installed from npm,

```bash
$ npm install --save scroll-utility
```

or from a cdn at [tsdelivr](https://www.jsdelivr.com/package/npm/scroll-utility)

```html
<script src="https://cdn.tsdelivr.net/npm/scroll-utility@4"></script>
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

```ts
const scrollManager = new Scroll()

scrollManager.scrollBy(50) // scroll by 50px
scrollManager.scrollBy(50, 1000) // scroll by 50px in 1000ms
scrollManager.scrollBy(50, 1000, customEasingFunction) // it can also be specified an easing function just for that scroll animation

scrollManager.scrollBy.element("#some-element") // scroll by "#some-element"'s size
scrollManager.scrollBy.element("#some-element", 0.5) // scroll by half of the size of "#some-element"
scrollManager.scrollBy.element("#some-element", -1, 1000) // scroll by "#some-element"' size up in 1000ms
scrollManager.scrollBy.element("#some-element", 1, 1000, customEasingFunction) // scroll by "#some-element"' size in 1000ms with a customEasingFunction
scrollManager.scrollBy.scrollSize(0.1) // scroll by 10% of the scroll size
scrollManager.scrollBy.size(1) // scroll a screen down
scrollManager.scrollBy.size(-1) // scroll a screen up
scrollManager.scrollBy.size(0.5, 1000) // scroll half a screen down
```

# Why?

There are a lot of packages about smooth scrolling, so, what's the difference?

Well, the main idea is to be able to stack multiple scroll animations together, and with high precision. That is not an extra feature, that's what this package does, you can trigger multiple animations to several places, and it will be as precise as it can be.

# License

[MIT](./LICENSE.md)

# Support

This project is free and open-source, so if you think this project can help you or anyone else, you should star it in [github](https://github.com/LeDDGroup/scroll-utility/)
Also feel free to open an [issue](https://github.com/LeDDGroup/scroll-utility/issues) if you have any idea, question, or you've found a bug. Any feedback is good support
