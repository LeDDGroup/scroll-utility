# scroll-utiliy #

[![Travis](https://travis-ci.org/LeDDGroup/scroll-utility.svg?branch=master)](https://github.com/LeDDGroup/scroll-utility)

[![BrowserStack Status](https://www.browserstack.com/automate/badge.svg?badge_key=QmJOaDZzS3BBOWUrem1PMWw1K29CZjByZjNBcTNyYlE0LzVYZEhFYVg1ST0tLXBOR05wTitscU1PM2FvQ0NrOUlHbHc9PQ==--70960e59e91fc8efc3dced4f2cebeff5665746ca)](https://www.browserstack.com/automate/public-build/QmJOaDZzS3BBOWUrem1PMWw1K29CZjByZjNBcTNyYlE0LzVYZEhFYVg1ST0tLXBOR05wTitscU1PM2FvQ0NrOUlHbHc9PQ==--70960e59e91fc8efc3dced4f2cebeff5665746ca)

______________
<!-- markdown-toc start - Don't edit this section. Run M-x markdown-toc-refresh-toc -->
**Table of Contents**

- [scroll-utiliy](#scroll-utiliy)
    - [Goal](#goal)
    - [Installation](#installation)
    - [Usage](#usage)
        - [Options](#options)
    - [Cross-browser compatibility](#cross-browser-compatibility)
    - [Github](#github)
    - [Liscense](#liscense)

<!-- markdown-toc end -->
______________

## Goal ##
* [x] **Scroll to an element, and center it**
* [x] **Animate the scrollbar position of any element, including the window**
* [x] **Scroll animations with durations**
* [ ] Others...
  * [x] Performance aware
  * [x] Stop an animation at any moment
  * [x] Doing multiple scroll animation together
  * [ ] Differentiate between user interaction scroll and this scroll
* [ ] Cross-browser compatibility
  *  [x] Chrome
  *  [x] Firefox
  *  [x] MS Edge
  *  [x] Safari
  *  [?] Opera
  *  [?] IE
  * Tests are made with Browserstack check them out here

## Installation ##

```console
$ npm install --save scroll-utility 
```

## Usage ##

```ts
import { Scroll, IOptions, IScrollToElementOptions } from "scroll-utility";

// declare scroll manager instance

const scrollManager = new Scroll(); // create a scroll instance for window for scrolling the page
const elementScrollManager = new Scroll(element: HTMLElement); // for scrolling inside element instead of window

// start a scroll animation

scrollManager.scroll.offset(value: number, options?: IOptions); // offset current scroll position by "value"
scrollManager.scroll.scrollToPosition(position: number, options?: IOptions); // scroll to position "position"
scrollManager.scroll.scrollToPercent(percent: number, options?: IOptions); // scroll to position given by "percent"
scrollManager.scroll.scrollToElement(element: HTMLElement, options?: IScrollToElementOptions); // scroll to element "element"

// stopping animations

scrollManager.stopAnimations(); // stop all animation in "scrollManager"
const animation = scrollManager.scroll.offset(10); // capture animation
animation.stop(); // stop animation

```

### Options ###

From the definition:

```ts
interface IOptions {
  duration?: number;
  horizontal?: boolean;
}

interface IScrollToElementOptions extends IOptions {
  center?: number;
}
```

*duration* will be the duration of the scroll animation, default to 0, instant.  
*horizontal* by default the animation will be vertically, so if *horizontal* is set to `true`, it will be horizontally otherwise.  

*IScrollToElementOptions* interface is for the *scrollToElement* function, it is the same as in other functions, but also a  
*center*, which is a percent (a number from `0` to `100`)

## Cross-browser compatibility ##

<img  height="50" src="./assets/BrowserStack-logo.png" alt="Browserstack logo" style="float: right; margin-right: 10px; text-align: middle">

Test are made using automate testing with [Browserstack](https://www.browserstack.com) [for open source](https://www.browserstack.com/open-source?ref=pricing).

<!-- Check out the tests results here! -->

## Github ##

If have any issue or feature request notify me via [github](https://github.com/LeDDGroup/scroll-utility/issues).  

## Liscense ##
[MIT](./LICENSE.md)
