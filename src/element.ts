// https://stackoverflow.com/questions/3437786/get-the-size-of-the-screen-current-web-page-and-browser-window

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
  private scroll = () => {
    if (this.onScroll) {
      this.onScroll()
    }
  }
  public size: (horizontal: boolean) => number
  public scrollSize: (horizontal: boolean) => number
  public position: (horizontal: boolean) => number
  public offset: (horizontal: boolean) => number
  public scrollTo: (x: number, y: number) => void
  public onScroll: (() => void) | null = null
  public mountOnScroll() {
    if (!this.element) {
      window.addEventListener("scroll", this.scroll)
    } else {
      this.element.addEventListener("scroll", this.scroll)
    }
  }
  public unmountOnScroll() {
    if (!this.element) {
      window.removeEventListener("scroll", this.scroll)
    } else {
      this.element.removeEventListener("scroll", this.scroll)
    }
  }
  public readonly distanceTo = {
    position: (position: number, horizontal: boolean) => {
      return position - this.position(horizontal)
    },
    percent: (percent: number, horizontal: boolean) => {
      const ratio = percent / 100
      const position = (this.scrollSize(horizontal) - this.size(horizontal)) * ratio
      return this.distanceTo.position(position, horizontal)
    },
    element: (element: ScrollElement, center: number, horizontal: boolean) => {
      const ratio = center / 100
      const screenOffset = (this.size(horizontal) - element.size(horizontal)) * ratio
      const elementPosition = element.offset(horizontal) - this.offset(horizontal)
      return elementPosition - screenOffset
    },
  }
}

export { ScrollElement }
