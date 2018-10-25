# Basic usage

```js
import { Scroll } from "scroll-utility"

const element = document.getElementById("some-element") || window
const scrollManager = new Scroll(element, settings) // for scrolling inside element instead of window

// start a scroll animation

scrollManager.centerElement(someHTMLElement, options) // scroll to some element
scrollManager.scrollTo(scrollType, options) // scroll to some position
scrollManager.scrollBy(scrollType, options) // offset scroll position by some value

const scrollType = "percent" || "value" || "screen"

const options = { // default options
  value: 0,
  duration: 1000,
  horizontal: false,
},


// onScroll events

scrollManager.onScroll = () => console.log("scroll occurred in scrollManager container")
scrollManager.onUtilityScroll = () => console.log("this scroll utility did scrolled")
scrollManager.onExternalScroll = () => console.log("this scroll utility did not scrolled!")

// stopping animations

scrollManager.stopAllAnimations() // stop all animation in "scrollManager"
const animation = scrollManager.scroll.offset(1000, { duration: 1000 }) // capture animation
animation.stop() // stop animation
```
