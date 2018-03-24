# scroll-utiliy
A highly customizable yet simple utility for scrolling around the page.

## Installation

```console
$ npm install --save scroll-utility 
```

## Usage

### Generally scrolling
#### 1st param: distance
#### 2nd param: duration(ms)
```js
const Scroll = require("scroll-utility");

const scrollManger = new Scroll();
scrollManger.scroll(500, 1000);
```

That will make scroll in the window 500 units during 1s.
If you want instant scroll don't pass the duration param.

### Div scrolling
```js
const scrollable = document.getElementById("scrollable");
const scrollManger = new Scroll(scrollable);
scrollManger.scroll(500, 500);
```

That will make scroll in the "#scrollable" element 500 units during 0.5s.
It will not move the window scroll, just the #scrollable scroll, must likely an element with the `overflow` property and a fixed height;

### Advance scrolling
#### Scrolling to an element
```js
const scrollable = document.getElementById("scrollable");
const scrollManger = new Scroll(scrollable);
const element = document.getElementById("some_element");
scrollManger.scrollToElement(element);
```
#### You can also do scroll to start or end
```js
scrollManger.scrollToStart();
scrollManger.scrollToEnd();
```
#### Passing props
```js
scrollManger.scrollToElement(element, {
  center: true,
});
scrollManger.scrollToStart({
  value: 200,
});
scrollManger.scrollToEnd({
  value: -1000,
  duration: 500,
});
```

`props` is an optional param to customize the scroll behavior.
value: is an offset scroll value.
duration: allows to do an smoothScroll
center(scrollToElement only): allows to center the element
