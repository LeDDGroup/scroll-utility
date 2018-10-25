declare const window: Window & {
  myFunction: any
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

function matchHorizontal(h: () => number, v: () => number) {
  return (horizontal: boolean) => {
    return horizontal ? h() : v()
  }
}

function windowSize() {
  // https://stackoverflow.com/questions/3437786/get-the-size-of-the-screen-current-web-page-and-browser-window
  return matchHorizontal(
    () => html.clientWidth || body.clientWidth || window.innerWidth,
    () => html.clientHeight || body.clientHeight || window.innerHeight,
  )
}

function windowScrollSize() {
  const funct = matchHorizontal(
    () =>
      Math.max(
        body.scrollWidth,
        body.offsetWidth,
        html.clientWidth,
        html.scrollWidth,
        html.offsetWidth,
      ),
    () =>
      Math.max(
        body.scrollHeight,
        body.offsetHeight,
        html.clientHeight,
        html.scrollHeight,
        html.offsetHeight,
      ),
  )
  window.myFunction = funct
  return funct
}

class ScrollElement {
  static isWindow(element: HTMLElement | Window): element is Window {
    return element === window
  }
  constructor(element: HTMLElement | Window = window) {
    if (ScrollElement.isWindow(element)) {
      this.size = windowSize()
      this.scrollSize = windowScrollSize()
      this.position = matchHorizontal(() => element.pageXOffset, () => element.pageYOffset)
      this.offset = () => 0
      this.scrollTo = (x: number, y: number) => {
        element.scroll(x, y)
      }
    } else {
      this.size = matchHorizontal(() => element.clientWidth, () => element.clientHeight)
      this.scrollSize = matchHorizontal(() => element.scrollWidth, () => element.scrollHeight)
      this.position = matchHorizontal(() => element.scrollLeft, () => element.scrollTop)
      this.offset = matchHorizontal(
        () => element.getBoundingClientRect().left,
        () => element.getBoundingClientRect().top,
      )
      this.scrollTo = (x: number, y: number) => {
        element.scrollLeft = x
        element.scrollTop = y
      }
    }
  }
  public size: (horizontal: boolean) => number
  public scrollSize: (horizontal: boolean) => number
  public position: (horizontal: boolean) => number
  public offset: (horizontal: boolean) => number
  public scrollTo: (x: number, y: number) => void
}

export { ScrollElement }
