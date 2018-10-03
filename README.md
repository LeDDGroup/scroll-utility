# scroll-utility

The best utility package for smooth scrolling and centering elements in the page or other html elements.

[![Travis](https://travis-ci.org/LeDDGroup/scroll-utility.svg?branch=master)](https://github.com/LeDDGroup/scroll-utility) [![BrowserStack Status](https://www.browserstack.com/automate/badge.svg?badge_key=QmJOaDZzS3BBOWUrem1PMWw1K29CZjByZjNBcTNyYlE0LzVYZEhFYVg1ST0tLXBOR05wTitscU1PM2FvQ0NrOUlHbHc9PQ==--70960e59e91fc8efc3dced4f2cebeff5665746ca)](https://www.browserstack.com/automate/public-build/QmJOaDZzS3BBOWUrem1PMWw1K29CZjByZjNBcTNyYlE0LzVYZEhFYVg1ST0tLXBOR05wTitscU1PM2FvQ0NrOUlHbHc9PQ==--70960e59e91fc8efc3dced4f2cebeff5665746ca) [![Gitter](https://img.shields.io/gitter/room/nwjs/nw.js.svg)](https://gitter.im/LeddSoftware/scroll-utility)

---

**Table of Contents**

- [Live demo](#checkout-a-simple-demohttpsleddgroupcomscroll-example)
- [Installation](#installation)
- [Usage](#usage)
  - [Options](#options)
- [Cross-browser compatibility](#cross-browser-compatibility)
- [Example app](#example-app-with-scroll-utility)
- [Github](#github)
- [License](#license)

---

## Checkout a simple [demo](https://leddgroup.com/scroll-example)

## Installation

```sh
$ npm install --save scroll-utility
```

Or from a cdn at  
`https://cdn.jsdelivr.net/npm/scroll-utility/dist/bundle.js`

```html
<script src="https://cdn.jsdelivr.net/npm/scroll-utility/dist/bundle.js"></script>
```

In this case `Scroll` will be a global variable as `ScrollUtility`

## Usage

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

### Options

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

_duration_ will be the duration of the scroll animation, default to 0, instant.  
_horizontal_ by default the animation will be vertically, so if _horizontal_ is set to `true`, it will be horizontally otherwise.

_IScrollToElementOptions_ interface is for the _scrollToElement_ function, it is the same as in other functions, but also a  
_center_, which is a percent (a number from `0` to `100`)

## Cross-browser compatibility

<img  height="50" src="https://raw.githubusercontent.com/LeDDGroup/scroll-utility/master/assets/BrowserStack-logo.png" alt="Browserstack logo" style="float: right; margin-right: 10px; text-align: middle">

Test are made using automate testing with [Browserstack](https://www.browserstack.com) [for open source](https://www.browserstack.com/open-source?ref=pricing).

Check out the tests results [here](https://www.browserstack.com/automate/public-build/QmJOaDZzS3BBOWUrem1PMWw1K29CZjByZjNBcTNyYlE0LzVYZEhFYVg1ST0tLXBOR05wTitscU1PM2FvQ0NrOUlHbHc9PQ==--70960e59e91fc8efc3dced4f2cebeff5665746ca)

## Example app with scroll-utility

To see a example with react, clone this repo and see its [demo](https://leddgroup.com/scroll-example)

```sh
git clone https://github.com/LeDDGroup/scroll-utility.git
cd scroll-utility/demo
npm run start
```

Navigate to http://localhost:8080

## Github

If have any issue or feature request notify me via [github](https://github.com/LeDDGroup/scroll-utility/issues).

## License

[MIT](./LICENSE.md)
