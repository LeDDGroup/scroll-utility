import { onScroll } from "./scroll"
// https://stackoverflow.com/questions/3437786/get-the-size-of-the-screen-current-web-page-and-browser-window

const ADD_EVENT_LISTENER = "addEventListener"
const REMOVE_EVENT_LISTENER = "removeEventListener"

class ScrollElement {
  constructor(private element?: HTMLElement | null) {
    const body = document.body
    const html = document.documentElement
    if (html === null) {
      throw new Error("document.documentElement is null") // TODO add fallback for documentElement being null
    }

    if (!element) {
      this.size = (horizontal: boolean) =>
        horizontal
          ? html.clientWidth || body.clientWidth || window.innerWidth
          : html.clientHeight || body.clientHeight || window.innerHeight

      this.scrollSize = (horizontal: boolean) =>
        horizontal
          ? Math.max(
              body.scrollWidth,
              body.offsetWidth,
              html.clientWidth,
              html.scrollWidth,
              html.offsetWidth,
            )
          : Math.max(
              body.scrollHeight,
              body.offsetHeight,
              html.clientHeight,
              html.scrollHeight,
              html.offsetHeight,
            )

      this.position = (horizontal: boolean) =>
        horizontal ? window.pageXOffset : window.pageYOffset

      this.offset = () => 0

      this.scrollTo = (x: number, y: number) => {
        window.scroll(x, y)
      }
    } else {
      this.size = (horizontal: boolean) => (horizontal ? element.clientWidth : element.clientHeight)

      this.scrollSize = (horizontal: boolean) =>
        horizontal ? element.scrollWidth : element.scrollHeight

      this.position = (horizontal: boolean) => (horizontal ? element.scrollLeft : element.scrollTop)

      this.offset = (horizontal: boolean) =>
        horizontal ? element.getBoundingClientRect().left : element.getBoundingClientRect().top

      this.scrollTo = (x: number, y: number) => {
        element.scrollLeft = x
        element.scrollTop = y
      }
    }
  }
  private _onScroll: onScroll = null
  public set onScroll(value: onScroll) {
    !!this._onScroll && !!value && this.toggleMount(true)
    !this._onScroll && !value && this.toggleMount(false)
    this._onScroll = value
  }
  private scroll = () => {
    if (this._onScroll) {
      this._onScroll()
    }
  }
  public size: (horizontal: boolean) => number
  public scrollSize: (horizontal: boolean) => number
  public position: (horizontal: boolean) => number
  public offset: (horizontal: boolean) => number
  public scrollTo: (x: number, y: number) => void
  private toggleMount(add: boolean) {
    const f = add ? ADD_EVENT_LISTENER : REMOVE_EVENT_LISTENER
    ;(!!this.element ? this.element[f] : window[f])("scroll", this.scroll)
  }
}

export { ScrollElement }
