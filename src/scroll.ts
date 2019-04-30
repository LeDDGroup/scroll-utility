import { AnimationManager } from "./animation-manager"
import { EasingFunction, defaultEasingFunction } from "./default-settings"
import * as ScrollElement from "./element"

type ElementOrQuery = Window | Element | string
type ScrollOptions = [number?, EasingFunction?]

type ScrollType = ((value: number, ...args: ScrollOptions) => Scroll) & {
  size: (value: number, ...args: ScrollOptions) => Scroll
  scrollSize: (value: number, ...args: ScrollOptions) => Scroll
  element: (elementOrQuery: ElementOrQuery, value?: number, ...args: ScrollOptions) => Scroll
}

function getElementFromQuery(elementOrQuery: ElementOrQuery): Element | Window {
  if (typeof elementOrQuery === "string") {
    return document.querySelector(elementOrQuery) as Element
  }
  return elementOrQuery
}

class Scroll {
  private animationManager: AnimationManager
  private element: Element | Window
  constructor(
    elementOrQuery: ElementOrQuery = document.documentElement,
    private horizontal: boolean = false,
    public duration: number = 0,
    public onScroll: ((external?: boolean) => void) | null = null,
    public easing: EasingFunction = defaultEasingFunction,
  ) {
    const element = getElementFromQuery(elementOrQuery)
    this.element = element === document.documentElement ? window : element
    this.element.addEventListener("scroll", () => {
      const changed = Math.floor(this.animationManager.position) !== this.scrollPosition
      if (changed) {
        this.animationManager.position +=
          this.scrollPosition - this.animationManager.previousPosition
        this.animationManager.previousPosition = this.scrollPosition
      }
      this.onScroll && this.onScroll(changed)
    })
    this.animationManager = new AnimationManager(
      this.scrollPosition,
      value => ScrollElement.scrollTo(this.element, value, this.horizontal),
      () => this.scrollSize,
    )
  }
  get size() {
    return ScrollElement.getSize(this.element, this.horizontal)
  }
  get scrollSize() {
    return ScrollElement.getScrollSize(this.element, this.horizontal) - this.size
  }
  get scrollPosition() {
    return ScrollElement.getScrollPosition(this.element, this.horizontal)
  }
  getElementPlacement(elementOrQuery: ElementOrQuery) {
    const elementPosition =
      ScrollElement.getOffset(elementOrQuery, this.horizontal) -
      ScrollElement.getOffset(this.element, this.horizontal)
    const elementSize = ScrollElement.getSizeWithBorders(elementOrQuery, this.horizontal)
    const ratio = elementPosition / (this.size - elementSize)
    return ratio <= 1 && ratio >= 0
      ? ratio
      : (ratio < 0 ? elementPosition : elementPosition - this.size + elementSize * 2) / elementSize
  }
  stopAllAnimations() {
    this.animationManager.stopAllAnimations()
  }
  scrollTo: ScrollType = Object.assign(
    (position: number, ...args: ScrollOptions): Scroll => {
      this.scrollBy(position - this.scrollPosition, ...args)
      return this
    },
    {
      size: (value: number, ...args: ScrollOptions) => this.scrollTo(this.size * value, ...args),
      scrollSize: (value: number, ...args: ScrollOptions) =>
        this.scrollTo(this.scrollSize * value, ...args),
      element: (elementOrQuery: ElementOrQuery, value: number = 0, ...args: ScrollOptions) => {
        const elementPosition =
          ScrollElement.getOffset(elementOrQuery, this.horizontal) -
          ScrollElement.getOffset(this.element, this.horizontal)
        const elementSize = ScrollElement.getSizeWithBorders(elementOrQuery, this.horizontal)

        return this.scrollBy(
          value <= 1 && value >= 0
            ? elementPosition - (this.size - elementSize) * value
            : (value < 0
                ? elementSize - elementPosition
                : elementPosition - this.size + elementSize * 2) -
                elementSize * value,
          ...args,
        )
      },
    },
  )
  scrollBy: ScrollType = Object.assign(
    (value: number, ...args: ScrollOptions): Scroll => {
      const [duration, easing] = args
      this.animationManager.createScrollAnimation({
        distToScroll: value,
        duration: duration || this.duration,
        easing: easing || this.easing,
      })

      return this
    },
    {
      size: (value: number, ...args: ScrollOptions) => this.scrollBy(this.size * value, ...args),
      scrollSize: (value: number, ...args: ScrollOptions) =>
        this.scrollBy(this.scrollSize * value, ...args),
      element: (elementOrQuery: ElementOrQuery, value: number = 0, ...args: ScrollOptions) => {
        return this.scrollBy(
          ScrollElement.getSizeWithBorders(elementOrQuery, this.horizontal) * value,
          ...args,
        )
      },
    },
  )
}

export { Scroll }
