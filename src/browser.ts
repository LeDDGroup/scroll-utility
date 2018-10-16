import { Scroll } from "./scroll"

declare const window: Window & {
  ScrollUtility: typeof Scroll
}

window.ScrollUtility = Scroll

export { Scroll }
