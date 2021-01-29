---
name: API
---

## Intialization

```ts
import Scroller from 'scroll-utility'

const scroller = new Scroller(element, {
	duration,
	easing,
	onScroll,
})
```
### element

Where the scroll will take place.
It is the page by default, but you can also specify an element to scroll in it

```ts
// page scroll:
const scroller = new Scroller()
// or
const scroller = new Scroller(window)
// or
const scroller = new Scroller(document.documentElement)

// if you want to scroll inside an element:
const scroller = new Scroller('#some-element')
// or
const scroller = new Scroller(document.getElementById('some-element'))
```

It can also be changed after initialization by setting the property `element`
```ts
const scroller = new Scroller()
scroller.element = '#some-element'
```

### options

How the scroll will take place

- `duration`: how long will the scroll animation last *(default `1000ms`)*
- `easing`: what's the animation function *(default in-out-cubic)*
- `onScroll`: what to do in every scroll update *(default nothing)*

```ts
const scroller = new Scroller(window, {
	duration: 500, // half a second
	easing: (currentStep, offsetValue, distance, totalSteps) => distance * (currentStep / totalSteps) + offsetValue, // linear animation
	onScroll: () => console.log('scrolled'),
}
```

If any option is left undefined, it will take the default value.

It can be changed anytime:

```ts
const scroller = new Scroller()

scroller.duration = 123;

scroller.easing = someEasingFunction; // replace by an actual function

scroller.onScroll = () => doSomething();
```

## Scrolling
### top
### left

```ts
interface Scroller {
    options: {
        duration?: number;
        easing?: EasingFunction;
        onScroll?: () => void;
    };
    constructor(element?: ElementOrQuery, options?: {
        duration?: number;
        easing?: EasingFunction;
        onScroll?: () => void;
    });
    stop: () => null;
    element: ElementOrQuery;
    left: number;
    top: number;
}
```
