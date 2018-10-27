import { Data } from "./Section"

export enum Colors {
  primary = "dodgerblue",
  secondary = "#3f4c6b",
  black = "#2B2D27",
  background = "white",
}

const basicUsageCode = `
import { Scroll } from "scroll-utility"

const scrollManager = new Scroll(element, settings) // for scrolling inside element instead of window

// start a scroll animation
scrollManager.centerElement(someHTMLElement, options) // scroll to some element
scrollManager.scrollTo(scrollType, options) // scroll to some position
scrollManager.scrollBy(scrollType, options) // offset scroll position by some value

// onScroll events
scrollManager.onScroll = () => console.log("scroll occurred in scrollManager container")
scrollManager.onUtilityScroll = () => console.log("this scroll utility did scrolled")
scrollManager.onUserScroll = () => console.log("this scroll utility did not scrolled!")

// stopping animations

scrollManager.stopAllAnimations() // stop all animation in "scrollManager"
const animation = scrollManager.scroll.offset(1000, { duration: 1000 }) // capture animation
animation.stop() // stop animation
`

const installationCode = "$ npm install --save scroll-utility"
const installationCodeCDN = '<script src="https://cdn.jsdelivr.net/npm/scroll-utility@1"></script>'

const windowContainerCode = `
import { Scroll } from "scroll-utility"
const windowScrollManager = new Scroll()
`

const elementContainerCode = `
import { Scroll } from "scroll-utility"

const htmlElement = document.getElementById("some-html-element")
const elementScrollManager = new Scroll(htmlElement)
`

const data: Data[] = [
  {
    title: "Basic usage",
    content: [
      {
        code: basicUsageCode,
      },
    ],
  },
  {
    title: "Installation",
    content: [
      {
        // type: "sh",
        code: installationCode,
      },
      "or from a cdn at [jsdelivr](https://www.jsdelivr.com/package/npm/scroll-utility)",
      {
        code: installationCodeCDN,
      },
      "in this case it will be exported globally `ScrollUtility` so you can access it with `window.ScrollUtility`",
    ],
  },
  {
    title: "Usage",
    content: [
      {
        title: "Specify scroll container",
        content: [
          {
            title: "Scroll inside window (default behavior)",
            content: [
              {
                code: windowContainerCode,
              },
              "`windowScrollManager` will be used to scroll the normal overflow in web pages",
            ],
          },
          {
            title: "Scroll a div or any other html element",
            content: [
              {
                code: elementContainerCode,
              },
              `
_elementScrollManager_ will be used to scroll inside that specific element.  
If _htmlElement_ is _null_ or _undefined_ it will fallback to window scroll by default and it will create a window scroll instance
`,
            ],
          },
        ],
      },
      {
        title: "Scroll to specific places in scroll",
        content: [],
      },
    ],
  },
]

export { data }

// ##

// ### Scroll to a position

// ```js
// // assuming windowScrollManager is declared
// windowScrollManager.scroll.toPosition(number, options) // number is a position in (px) in scroll

// // example:
// windowScrollManager.scroll.toPosition(273)
// ```

// ### Scroll to a percent

// ```js
// windowScrollManager.scroll.toPercent(percent, options) // number is a percent(from 0 to 100)

// // example:
// windowScrollManager.scroll.toPercent(0) // scroll to the beginning of the page
// windowScrollManager.scroll.toPercent(50) // to the middle
// windowScrollManager.scroll.toPercent(100) // the end
// ```

// ### Scroll to an element

// ```js
// windowScrollManager.scroll.toElement(htmlElement, options)
// ```

// Here `htmlElement` should be an html element. _null_ or _undefined_ will scroll to the start of its _scrollManger_ container

// ### Offset scroll position

// ```js
// windowScrollManager.scrollBy(number, options) // will offset scroll position, can be negative
// ```

// ### options

// ```js
// const optionsDefault = {
//   duration: 0, // duration of the scroll
//   horizontal: false, // direction of the scroll animation
//   center: 0, // this value is used only for scrollToElement
// }
// ```

// ### examples

// ```js
// windowScrollManager.scroll.toPercent(50, {
//   duration: 1000, // will scroll to the middle of the page vertically
// })

// windowScrollManager.scroll.toPosition(50, {
//   horizontal: true, // will scroll instantly to the middle of the page horizontally in 1 sec
// })

// windowScrollManager.scroll.toElement(htmlElement, {
//   horizontally: true,
//   duration: 1500,
//   center: 50, // will scroll to the element and center it at 50% in the view (or its container)
// })
// ```

// ## Stop animations

// ```js
// windowScrollManager.stopAllAnimations() // this will stop all animations in windowScrollManager

// // to stop specific animations, you'll have to capture them first:
// const animation = windowScrollManager.scroll.toPercent(50, { duration: 1000 })

// animation.stop()
// ```

// ## Change animation function

// ```js
// windowScrollManager.easing = some_easing_function // will change default easing function for next created animations

// // or just for one animation:
// windowScrollManager.scroll.toPercent(50, {
//   duration: 1000,
// }).easing = some_easing_function
// ```

// The [package](https://www.npmjs.com/package/easing-functions) provides easing functions

// ## onScroll events

// ```js
// const scrollManager = new Scroll(some_element)

// scrollManager.onScroll = () => console.log("scroll occurred in scrollManager container")
// scrollManager.onUtilityScroll = () => console.log("this scroll utility did scrolled")
// scrollManager.onUserScroll = () => console.log("this scroll utility did not scrolled!")
// ```

// for example, if you wish to stop all animations every time the user scroll you could do:

// ```js
// scrollManager.onUserScroll = () => scrollManager.stopAllAnimations()
// ```

// ## Stack animations and high precision

// The main idea of this module is to be able of doing several animation at the same time, and still get a desirable outcome.
// It is very difficult to archive precision when scrolling, due to the fact that browsers don't scroll well to floating numbers, they often round it up. So is even more difficult when there are several animations.
// That is the best thing of scroll-utility. It is design to work with multiple animations and keep track on where the scroll position should end.

// For example:

// ```js
// scrollManager.scroll.offset(500, { duration: 1000 })
// scrollManager.scroll.offset(34, { duration: 775 })
// ```

// 1 second from it started to move, it will have been offset its position for 534px

// ```js
// scrollManager.scroll.toPosition(0)
// scrollManager.scroll.toPercent(50, { duration: 500 })
// scrollManager.scroll.toPercent(50, { duration: 1000 })
// ```

// in this example in 1 second to scroll bar will be at the end, due that it created 2 scroll animations that were to scroll 50% of the page (from 0 to 50), so 50% + 50% = 100%

// So generally when you use _toPercent_ _toPosition_ _toElement_, you would want to use _stopAllAnimation_, to ensure that there are not any other animation, otherwise they will stack together, which is generally not wanted

// # Cross-browser compatibility

// Compatibility guaranteed in Firefox, Chrome, Edge, Safari. In Opera and IE should work too, but there are no tests yet.

// <img  height="50" src="https://raw.githubusercontent.com/LeDDGroup/scroll-utility/master/assets/BrowserStack-logo.png" alt="Browserstack logo" style="float: right; margin-right: 10px; text-align: middle">

// Test are made using automate testing with [Browserstack](https://www.browserstack.com) [for open source](https://www.browserstack.com/open-source?ref=pricing).

// See tests results [here](https://www.browserstack.com/automate/public-build/QmJOaDZzS3BBOWUrem1PMWw1K29CZjByZjNBcTNyYlE0LzVYZEhFYVg1ST0tLXBOR05wTitscU1PM2FvQ0NrOUlHbHc9PQ==--70960e59e91fc8efc3dced4f2cebeff5665746ca)

// # Example app with scroll-utility

// To see a example with react, clone the [demo](https://github.com/LeDDGroup/scroll-utility-demo)(see demo [here](https://leddgroup.com/scroll-example))

// ```sh
// git clone https://github.com/LeDDGroup/scroll-utility-demo
// cd scroll-utility-demo
// npm install
// npm start
// ```

// Navigate to http://localhost:8080

// # License

// [MIT](./LICENSE.md)

// # Github

// If you have any question, issue, suggestion, idea, etc..., just reach out:
// post an [issue](https://github.com/LeDDGroup/scroll-utility/issues)
// say something in [gitter](https://gitter.im/LeddSoftware/scroll-utility)
// [linkedin](https://www.linkedin.com/in/david-perez-alvarez-291862132)

// This was made in my free time, and I most appreciate any feedback. If you think it's helpful just leave a star in [github](https://github.com/LeDDGroup/scroll-utility/)
// `
