# scroll-utiliy #

[![BrowserStack Status](https://www.browserstack.com/automate/badge.svg?badge_key=QmJOaDZzS3BBOWUrem1PMWw1K29CZjByZjNBcTNyYlE0LzVYZEhFYVg1ST0tLXBOR05wTitscU1PM2FvQ0NrOUlHbHc9PQ==--70960e59e91fc8efc3dced4f2cebeff5665746ca)](https://www.browserstack.com/automate/public-build/QmJOaDZzS3BBOWUrem1PMWw1K29CZjByZjNBcTNyYlE0LzVYZEhFYVg1ST0tLXBOR05wTitscU1PM2FvQ0NrOUlHbHc9PQ==--70960e59e91fc8efc3dced4f2cebeff5665746ca)



A simple scroll utility for scrolling the page, inside an element, centering elements, and smooth scroll animations.

<!-- markdown-toc start - Don't edit this section. Run M-x markdown-toc-refresh-toc -->
**Table of Contents**

- [scroll-utiliy](#scroll-utiliy)
    - [Installation](#installation)
    - [Usage](#usage)
        - [Creating a scroll scope](#creating-a-scroll-scope)
        - [Offsetting scroll position](#offsetting-scroll-position)
        - [Setting a duration](#setting-a-duration)
        - [ScrollTo](#scrollto)
            - [ScrollToPosition](#scrolltoposition)
            - [ScrollToPercent](#scrolltopercent)
            - [ScrollToElement](#scrolltoelement)
        - [Setting a direction](#setting-a-direction)
    - [Github](#github)
    - [Browser tested](#browser-tested)
    - [[License](./LICENSE.md): MIT](#licenselicensemd-mit)

<!-- markdown-toc end -->


## Installation ##

```console
$ npm install --save scroll-utility 
```

## Usage ##

```js
const { Scroll } = require("scroll-utility");

const ScrollManager = new Scroll();
```

### Creating a scroll scope ###

By default, if no element is specified, the scroll will take place in the window object.

```js
const { Scroll } = require("scroll-utility");

const element = document.getElementById("my-scrollable-element"); // assuming that "my-scrollable-element" exists

const WindowScroll = new Scroll(); // Do this to scroll inside window
const ElementScroll = new Scroll(element); // Do this to scroll inside an element
```

In this way with `ElementScroll` you can scroll inside the `#my-scrollable-element`, instead of inside the page

### Offsetting scroll position ###

```js
const { Scroll } = require("scroll-utility");
const WindowScroll = new Scroll();

WindowScroll.scroll.offset(100); // This will offset the scroll position 100px
```

### Setting a duration ###

The second parameter specifies a duration (in ms).

```js
const { Scroll } = require("scroll-utility");
const WindowScroll = new Scroll();

WindowScroll.scroll.offset(100, 1000); // scroll for a second
```

If *duration* is  `0` (or not specified), it will scroll instantly

### ScrollTo ###

In addition of offsetting the scroll, you can also scroll to certain position, given by either an element, percent, or position(px)

#### ScrollToPosition ####

```js
const { Scroll } = require("scroll-utility");
const WindowScroll = new Scroll();

WindowScroll.scroll.toPosition(100); // Scroll to 100px past the start of the page
```

#### ScrollToPercent ####

```js
const { Scroll } = require("scroll-utility");
const WindowScroll = new Scroll();

WindowScroll.scroll.toPercent(0); // It will scroll to the start of the page
// WindowScroll.scroll.toPercent(50); // It will scroll to the middle of the page
// WindowScroll.scroll.toPercent(100); // It will scroll to the end of the page
```

#### ScrollToElement ####

```js
const { Scroll } = require("scroll-utility");
const WindowScroll = new Scroll();

const element = document.getELementById("some-element");
windowScroll.scroll.toElement(element, 0, 1000); // The element will end at the start of the window screen
windowScroll.scroll.toElement(element, 50, 1000); // The element will end at the middle of the window screen
windowScroll.scroll.toElement(element, 100, 1000); // The element will end at the end of the window screen
```

Here, the 1st argument is the element to scroll to,  
the 2nd is the percent in wich the element will be centered,  
and 3rd is the duration of the scroll animation.  

### Setting a direction ###

## Github ##

If have any issue or feature request notify me via [github](https://github.com/LeDDGroup/scroll-utility/issues).

## Browser tested ##

Test are made using automate testing [Browserstack](https://www.browserstack.com) [for open source](https://www.browserstack.com/open-source?ref=pricing).

<img src="./assets/BrowserStack-Logo/BrowserStack - Logo/Browserstack-logo@2x.png" alt="Browserstack logo" style="height: 60px" >

## [License](./LICENSE.md): MIT ##
