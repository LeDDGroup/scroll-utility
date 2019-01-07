export function toDirection(horizontal: boolean): "x" | "y" {
  return horizontal ? "x" : "y"
}

export interface IHorizontal<T> {
  x: T
  y: T
}

export class Point implements IHorizontal<number> {
  constructor(public x = 0, public y = 0) {}
}

const body = document.body
const html = document.documentElement || {
  clientWidth: 0,
  clientHeight: 0,
  scrollWidth: 0,
  scrollHeight: 0,
  offsetWidth: 0,
  offsetHeight: 0,
}

// https://stackoverflow.com/questions/3437786/get-the-size-of-the-screen-current-web-page-and-browser-window
const windowSize = () =>
  new Point(
    html.clientWidth || body.clientWidth || window.innerWidth,
    html.clientHeight || body.clientHeight || window.innerHeight,
  )

const windowScrollSize = () =>
  new Point(
    Math.max(
      body.scrollWidth,
      body.offsetWidth,
      html.clientWidth,
      html.scrollWidth,
      html.offsetWidth,
    ),
    Math.max(
      body.scrollHeight,
      body.offsetHeight,
      html.clientHeight,
      html.scrollHeight,
      html.offsetHeight,
    ),
  )

class ScrollElement {
  static isWindow(element: Element | Window): element is Window {
    return element === window
  }
  constructor(private element: Element | Window = window, private onScroll?: () => void) {
    this.element.addEventListener("scroll", this.scroll)
    if (ScrollElement.isWindow(element)) {
      this._size = windowSize
      this._scrollSize = windowScrollSize
      this._position = () => new Point(element.pageXOffset, element.pageYOffset)
      this._offset = () => new Point()
      this.scrollTo = (point: Point) => {
        element.scroll(point.x, point.y)
      }
    } else {
      this._size = () => new Point(element.clientWidth, element.clientHeight)
      this._scrollSize = () => new Point(element.scrollWidth, element.scrollHeight)
      this._position = () => new Point(element.scrollLeft, element.scrollTop)
      this._offset = () =>
        new Point(element.getBoundingClientRect().left, element.getBoundingClientRect().top)
      this.scrollTo = (point: Point) => {
        element.scrollLeft = point.x
        element.scrollTop = point.y
      }
    }
  }
  private scroll = () => {
    this.onScroll && this.onScroll()
  }
  private _size: () => Point
  public get size() {
    return this._size()
  }
  private _scrollSize: () => Point
  public get scrollSize() {
    return this._scrollSize()
  }
  private _position: () => Point
  public get position() {
    return this._position()
  }
  private _offset: () => Point
  public get offset() {
    return this._offset()
  }
  public scrollTo: (point: Point) => void
}

export { ScrollElement }
