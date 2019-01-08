# [scroll-utility](https://github.com/LeDDGroup/scroll-utility)

[![npm](https://img.shields.io/npm/dw/scroll-utility.svg)](https://www.npmjs.com/package/scroll-utility)
[![](https://data.jsdelivr.com/v1/package/npm/scroll-utility/badge)](https://www.jsdelivr.com/package/npm/scroll-utility)  
[![Travis](https://travis-ci.org/LeDDGroup/scroll-utility.svg?branch=master)](https://travis-ci.org/LeDDGroup/scroll-utility)
[![Maintainability](https://api.codeclimate.com/v1/badges/0914e9eba77aee46d514/maintainability)](https://codeclimate.com/github/LeDDGroup/scroll-utility/maintainability)
[![Gitter](https://img.shields.io/gitter/room/nwjs/nw.js.svg)](https://gitter.im/LeddSoftware/scroll-utility)

<!-- markdown-toc start - Don't edit this section. Run M-x markdown-toc-refresh-toc -->

**Table of Contents**

- [Features:](#features)
- [Why?](#why)
- [Installation](#installation)
- [Usage](#usage)
  - [Scroll Container](#scroll-container)
    - [Default export:](#default-export)
  - [scrollBy](#scrollby)
  - [onScroll](#onscroll)
    - [External scroll](#external-scroll)
  - [element](#element)
    - [size](#size)
    - [scrollSize](#scrollsize)
    - [position](#position)
    - [offset](#offset)
  - [stopAllAnimations](#stopallanimations)
  - [easing](#easing)
  - [misc](#misc)
    - [getDistToElement](#getdisttoelement)
    - [getPercentPosition](#getpercentposition)
- [Stack animations and high precision](#stack-animations-and-high-precision)
- [Cross-browser compatibility](#cross-browser-compatibility)
- [License](#license)
- [Support](#support)

<!-- markdown-toc end -->

# Features:

- Smooth scroll inside any element in any direction
- Center elements
- Extremely precise
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
// const windowScrollManager = new Scroll(window) // same as above, with settings
const elementScrollManager = new Scroll(someHTMLElement) // scroll the element
```

### Default export:

```js
import windowScrollManager from "scroll-utility"

// same as: `windowScrollManager = new Scroll()`
```

## scrollBy

After creating an instance of a scrollManager, you can scroll using a `scrollBy` method:

```js
import scrollManager from "scroll-utility" // default export (window scroll manager)

scrollManager.scrollBy(500) // 500px
scrollManager.scrollBy(500, 1000) // 500px, 1000ms(1s)
scrollManager.scrollBy(500, 1000, true) // 500px, 1000ms(1s), horizontal scroll
// scrollManager.scrollBy(500, 1000, false, someEasingAnimation) // 500px, 1000ms(1s), vertical scroll, `someEasinganimation` instead of `inOutCubic` by default
```

As you can see from the comments, in the first case it will offset scroll position by 500 pixels  
In the 2nd case, it will offset by 500, but in 1 second, that's when you'll see the 'smooth' effect  
In the 3rd, it will do a "horizontal" scroll instead of a "vertical", which is the default behavior.  
And the 4th parameter, is used to override the defuault easing animation.

Only the first paramater is required, by default `duration` is 0 and `horizontal` if false.

To determine where to scroll to, see [element](#element) and [misc](#misc) below.

## onScroll

You can specify `onScroll` on the constructor, or any other time you want:

```js
import { Scroll } from "scroll-utility"

const windowScrollManager = new Scroll(window, () => {
  console.log("scrolled")
}) // constructor
// const windowScrollManager = new Scroll(window, null) // by default

windowScrollManager.onScroll = () => {
  console.log("any time")
} // any time you want
// windowScrollManager.onScroll = null // if you don't want to capture 'onScroll' anymore
```

### External scroll

the function `onScroll` accepts an paramater to differentiate if the scroll was originated from an external source:

```js
import scrollManager from "scroll-utility"

scrollManager.onScroll = (external) => {
  if (external) {
    console.log("this 'scroll-utility' scrolled")
  } else {
    console.log("external scroll") // ussualy the user via the mouse or keyboard, or some other script running in the browser
  }
```

## element

There are several utilities to help you scroll to wherever you want, you can access them in the `element` field:

```js
import scrollManager from "scroll-utility"

console.log(scrollManager.element.position.y) // vertical position of the scroll
console.log(scrollManager.element.position.x) // horizontal position of the scroll
```

All of its fields have the 'x' and 'y' for each direction of the property

The objective of this element is to unify the properties of the `window` and of the `htmlElements`.

### size

```js
scrollManager.size.x
scrollManager.size.y
```

This is the size of the container, may it be the `window`, or the (div)element used to instantiate the scrollManager

### scrollSize

```js
scrollManager.scrollSize.x
scrollManager.scrollSize.y
```

This is the scroll size of the container. It determines the amount of scroll that can be done

### position

```js
scrollManager.position.x
scrollManager.position.y
```

This is the position of the scrollBar. Its minimum value it's 0, and its maximum is the `scrollSize` - the `size`

### offset

```js
scrollManager.offset.x
scrollManager.offset.y
```

This is less likely to be used. It indicates the offset of the _boundingClientRect_ of the container. So for the window as container, it will return 0 for both `x` and `y`. It's the equivalent for `getBoundingClientRect().left` and `top`

## stopAllAnimations

```js
scrollManager.stopAllAnimations() // this will stop all animations in scrollManager
```

## easing

You can change the default easing function on the constructor, or any other time you want:

```js
import { Scroll } from "scroll-utility"

const scrollManager = new Scroll(window, null, some_easing_function) // the 3rd parameter is the easing function

scrollManager.easing = some_easing_function // change the default easing function any time you want
```

This [package](https://www.npmjs.com/package/easing-functions) provides easing functions. Or you can just create your own :)

The default easing function used is _inOutCubic_. It seemed like the best for me.

## misc

```js
import scrollManager from "scroll-utility"

scrollManager.misc.someFunction()
```

Even though they can be calculated using the properties of `element`, in `misc` are some functions to get the position to scroll, due that they are likely to be needed. Feel free to make a PR to add more, or open an issue to request to add some.

### getDistToElement

```js
import scrollManager from "scroll-utility"

const element = document.getElementById("some-element")

const distToScroll = scrollManager.misc.getDistToElement(element, 50, false)

scrollManager.scrollBy(distToScroll)
```

In this case, the element _some-element_ will be centered in the page.  
The 1st parameter is the element to scroll to.  
The 2nd is a percent, which indicates the degree to be centered, been 0 not centered, 50 in the middle, and 100 sticked to the bottom of the view.
And the 3rd is _horizontal_, `false` means vertical (default), and `true` horizontal

### getPercentPosition

```js
import scrollManager from "scroll-utility"

cosnt distToScroll = scrollManager.misc.getPercentPosition(50, true)

scrollManager.scrollBy(distToScroll)
```

In this case, it will scroll to the middle of the page
The 1st is a percent, been 0 the top, 50 in the middle, and 100 the bottom of the page.
And the 2nd is the _horizontal_, same as above.

# Stack animations and high precision

The main idea of this module is to be able of doing several animation at the same time, and still get a desirable outcome.
It is very difficult to archive precision when scrolling, due to the fact that browsers don't scroll well to floating numbers, they often round it up. So is even more difficult when there are several animations.
That is the best thing of scroll-utility. It is design to work with multiple animations and keep track on where the scroll position should end.

For example:

```js
scrollManager.scrollBy("value", 500)
scrollManager.scrollBy("value", 34)
```

1 second after the scroll starts, it will have been offseted its position for 534px

If you wish to stop all animations every time the user scrolls, you could do:

```js
scrollManager.onScroll = external => scrollManager.stopAllAnimations()
```

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
