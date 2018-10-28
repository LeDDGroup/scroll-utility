To start scrolling you first have to specify the element which will do the scroll. It can be a HTMLElement, like a div (usually with _overflow_ css property set to _auto_ or _scroll_); or the scroll can be as always effectuated by the _window_:

```js
import { Scroll } from "scroll-utility"

const someHTMLElement = document.getElementById("some-element")

const windowScrollManager = new Scroll() // scroll the page
// const windowScrollManager = new Scroll(window) // same as above
const elementScrollManager = new Scroll(someHTMLElement) // scroll the element
```
