---
name: API
---

## Intialization

```ts
import ScrollUtility from 'scroll-utility'

const scrollManager = new ScrollUtility(element, {
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
const scrollManager = new ScrollUtility()
// or
const scrollManager = new ScrollUtility(window)
// or
const scrollManager = new ScrollUtility(document.documentElement)

// if you want to scroll inside an element:
const scrollManager = new ScrollUtility('#some-element')
// or
const scrollManager = new ScrollUtility(document.getElementById('some-element'))
```

It can also be changed after initialization by setting the property `element`
```ts
const scrollManager = new ScrollUtility()
scrollManager.element = '#some-element'
```

### options

How the scroll will take place

- `duration`: how long will the scroll animation last *(default `1000ms`)*
- `easing`: what's the animation function *(default in-out-cubic)*
- `onScroll`: what to do in every scroll update *(default nothing)*

```ts
const scrollManager = new ScrollUtility(window, {
	duration: 500, // half a second
	easing: (currentStep, offsetValue, distance, totalSteps) => distance * (currentStep / totalSteps) + offsetValue, // linear animation
	onScroll: () => console.log('scrolled'),
}
```

If any option is left undefined, it will take the default value.

It can be changed anytime

```ts
const scrollManager = new ScrollUtility()

scrollManager.duration = 123;

scrollManager.easing = someEasingFunction; // replace by an actual function

scrollManager.onScroll = () => doSomething();
```

## Scrolling
### scrollTop
### scrollLeft

```ts
interface ScrollUtility {
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
    scrollLeft: number;
    scrollTop: number;
}
```
