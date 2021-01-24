# [scroll-utility](https://leddgroup.github.io/scroll-utility)

[![npm](https://img.shields.io/npm/dw/scroll-utility.svg)](https://www.npmjs.com/package/scroll-utility)
[![jsdelivr](https://data.jsdelivr.com/v1/package/npm/scroll-utility/badge)](https://www.jsdelivr.com/package/npm/scroll-utility)  
[![Travis](https://travis-ci.org/LeDDGroup/scroll-utility.svg?branch=master)](https://travis-ci.org/LeDDGroup/scroll-utility)
[![Maintainability](https://api.codeclimate.com/v1/badges/0914e9eba77aee46d514/maintainability)](https://codeclimate.com/github/LeDDGroup/scroll-utility/maintainability)
[![Greenkeeper badge](https://badges.greenkeeper.io/LeDDGroup/scroll-utility.svg)](https://greenkeeper.io/)
[![Gitter](https://img.shields.io/gitter/room/nwts/nw.js.svg)](https://gitter.im/LeddSoftware/scroll-utility)

# Features

- smooth scroll animations in any element and any direction
- can manage multiple animations at the same time
- high performance
- simple and flexible api

# Installation

From npm:

```sh
npm install --save scroll-utility
```

From a [cdn](https://www.jsdelivr.com/package/npm/scroll-utility):

```html
<script src="https://cdn.jsdelivr.net/npm/scroll-utility@5"></script>
```

# Usage

```js
import ScrollUtility from 'scroll-utility'

const scroller = new ScrollUtility();

scroller.top += 100; // scrolls 100px down

scroller.left -= 100; // scrolls 100px left

scroller.top = 100; // sets top scroll position to 100px

scroller.left = '#element-to-scroll'; // scrolls to #element-to-scroll horizontally
```

Full documentation and demo [here](https://leddgroup.github.io/scroll-utility)

# License

[MIT](./LICENSE.md)
