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
const windowSize = (horizontal = false) =>
  horizontal
    ? html.clientWidth || body.clientWidth || window.innerWidth
    : html.clientHeight || body.clientHeight || window.innerHeight

const windowScrollSize = (horizontal = false) =>
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

type ElementOrQuery = Window | Element | string

export function getElementFromQuery(elementOrQuery: ElementOrQuery): Element | Window {
  if (typeof elementOrQuery === "string") {
    return document.querySelector(elementOrQuery) as Element
  }
  return elementOrQuery
}

function isWindow(element: Element | Window): element is Window {
  return element === window || element === html
}

export function withWindow<T>(
  elementOrQuery: ElementOrQuery,
  windowFunction: () => T,
  elementFunction: (element: HTMLElement) => T,
): T {
  const element = getElementFromQuery(elementOrQuery)
  return isWindow(element) ? windowFunction() : elementFunction(element as HTMLElement)
}

function getWithWindow<T>(
  windowFunction: (horizontal: boolean) => T,
  elementFunction: (element: HTMLElement, horizontal: boolean) => T,
) {
  return (elementOrQuery: ElementOrQuery, horizontal: boolean = false) => {
    const element = getElementFromQuery(elementOrQuery)
    return isWindow(element)
      ? windowFunction(horizontal)
      : elementFunction(element as HTMLElement, horizontal)
  }
}

export const getSize = getWithWindow(windowSize, (element, horizontal) =>
  horizontal ? element.clientWidth : element.clientHeight,
)

export const getSizeWithBorders = getWithWindow(windowSize, (element, horizontal) =>
  horizontal ? element.offsetWidth : element.offsetHeight,
)

export const getScrollPosition = getWithWindow(
  horizontal => (horizontal ? window.pageXOffset : window.pageYOffset),
  (element, horizontal) => (horizontal ? element.scrollLeft : element.scrollTop),
)

export const getScrollSize = getWithWindow(
  horizontal => windowScrollSize(horizontal),
  (element, horizontal) => (horizontal ? element.scrollWidth : element.scrollHeight),
)
export const getOffset = getWithWindow(
  () => 0,
  (element, horizontal) =>
    horizontal ? element.getBoundingClientRect().left : element.getBoundingClientRect().top,
)

export function scrollTo(element: ElementOrQuery = window, value = 0, horizontal: boolean = false) {
  withWindow(
    element,
    () =>
      window.scroll(
        horizontal ? value : getScrollPosition(window, !horizontal),
        !horizontal ? value : getScrollPosition(window, !horizontal),
      ),
    element => (horizontal ? (element.scrollLeft = value) : (element.scrollTop = value)),
  )
}

export function getRelativeElementPosition(
  wrapper: ElementOrQuery,
  elementOrQuery: ElementOrQuery,
  horizontal = false,
) {
  const elementPosition = getOffset(elementOrQuery, horizontal) - getOffset(wrapper, horizontal)
  const elementSize = getSizeWithBorders(elementOrQuery, horizontal)
  const ratio = elementPosition / (getSize(wrapper, horizontal) - elementSize)
  return ratio <= 1 && ratio >= 0
    ? ratio
    : (ratio < 0
        ? elementPosition
        : elementPosition - getSize(wrapper, horizontal) + elementSize * 2) / elementSize
}

export function getDistToCenterElement(
  wrapper: ElementOrQuery,
  elementOrQuery: ElementOrQuery,
  horizontal = false,
  value = 0,
) {
  const elementPosition = getOffset(elementOrQuery, horizontal) - getOffset(wrapper, horizontal)
  const elementSize = getSizeWithBorders(elementOrQuery, horizontal)
  return value <= 1 && value >= 0
    ? elementPosition - (getSize(wrapper, horizontal) - elementSize) * value
    : (value < 0
        ? elementPosition
        : elementPosition - getSize(wrapper, horizontal) + elementSize * 2) -
        elementSize * value
}
