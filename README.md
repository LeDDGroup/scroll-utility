# scroll-utiliy
A highly customizable yet simple utility for scrolling around the page.

## Installation

```console
$ npm install --save scroll-utility 
```

## Usage

### Generally scrolling (scrollBy)
#### 1st param: distance
#### 2nd param: duration(ms)
```js
const Scroll = require("scroll-utility");

const scrollManger = new Scroll();
scrollManger.scrollBy(500, 1000);
```

That will make scroll in the window 500 units during 1s.
If you want instant scroll don't pass the duration param.

### Div scrolling
```js
const scrollable = document.getElementById("scrollable");
const scrollManger = new Scroll(scrollable);
scrollManger.scrollBy(500, 500);
```

That will make scroll in the "#scrollable" element 500 units during 0.5s.
It will not move the window scroll, just the #scrollable scroll, must likely an element with the `overflow` property and a fixed height;

### Advance scrolling (scrollTo)
#### Scrolling to an element
```js
const scrollManger = new Scroll();
const element = document.getElementById("some_element");
scrollManger.scrollTo({
  element,
});
```
#### Using percent
##### Without element
```js
  scrollManger.scrollTo({
    percent: 50,
  });
```
Using percent 50 will scroll till the center of the page is reached.
With 0 will scroll to top. And with 100 will scroll to bottom.
20 will go to 1 / 5, 25 to 1 / 4...

##### With element
```js
  scrollManger.scrollTo({
    element,
    percent: 50,
  });
```
Using percent 50 will scroll till the element is centered on the page.
With 0 will scroll till the element is in the top...
#### Using offset
```js
  scrollManger.scrollTo({
    offset: 250,
  });
```
Using offset 250 will scroll 250 units from current position.
If used with `element` or `percent` it will offset the final scroll position
#### Using duration
```js
  scrollManger.scrollTo({
    offset: 500,
    duration: 1000,
  });
```
Using duration 1000 will scroll during 1s.
It should be in company of `offset`, `elment`, or `percent`; otherwise it will not do any scroll

#### Default Values
For `scrollTo` props, default values are not always 0
If props are empty, or only with `duration`, it will not do any scroll
`offset`'s default value is 0
If there's an `element` specified, `percent`'s default value will be 0;
Otherwise it will not interfere with scroll action.
`duration` it's 0 if not specified. In this case scroll will be instantaneous.
