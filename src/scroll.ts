import { AnimationManager } from "./animation-manager"
import { EasingFunction, defaultEasingFunction } from "./default-settings"
import * as ScrollElement from "./element"

function almost0(value: number): boolean {
  return value < 1 && value > -1
}

type ElementOrQuery = Window | Element | string
type ScrollOptions = [number?, EasingFunction?]

type ScrollType = ((value: number, ...args: ScrollOptions) => Scroll) & {
  size: (value: number, ...args: ScrollOptions) => Scroll
  sizeWithBorders: (value: number, ...args: ScrollOptions) => Scroll
  scrollSize: (value: number, ...args: ScrollOptions) => Scroll
  scrollPosition: (value: number, ...args: ScrollOptions) => Scroll
  offset: (value: number, ...args: ScrollOptions) => Scroll
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
      const almost = almost0(this.animationManager.shouldBe - this.scrollPosition)
      !almost && (this.animationManager.shouldBe = this.scrollPosition)
      this.onScroll && this.onScroll(!almost)
    })

    this.animationManager = new AnimationManager(this.scrollPosition)

    const scroll = () => {
      const shouldBe = this.animationManager.shouldBe
      this.animationManager.updateShouldBe()
      if (shouldBe !== this.animationManager.shouldBe) {
        ScrollElement.scrollTo(window, this.animationManager.shouldBe, this.horizontal)
      }
      this.animationManager.shouldBe = Math.max(
        0,
        Math.min(this.animationManager.shouldBe, this.scrollSize),
      )
      window.requestAnimationFrame(scroll)
    }
    window.requestAnimationFrame(scroll)
  }
  get size() {
    return ScrollElement.getSize(this.element, this.horizontal)
  }
  get sizeWithBorders() {
    return ScrollElement.getSizeWithBorders(this.element, this.horizontal)
  }
  get scrollSize() {
    return ScrollElement.getScrollSize(this.element, this.horizontal)
  }
  get scrollPosition() {
    return ScrollElement.getScrollPosition(this.element, this.horizontal)
  }
  get offset() {
    return ScrollElement.getOffset(this.element, this.horizontal)
  }
  getElementPlacement(elementOrQuery: ElementOrQuery) {
    const elementPosition = ScrollElement.getOffset(elementOrQuery, this.horizontal) - this.offset
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
      sizeWithBorders: (value: number, ...args: ScrollOptions) =>
        this.scrollTo(this.sizeWithBorders * value, ...args),
      scrollSize: (value: number, ...args: ScrollOptions) =>
        this.scrollTo(this.scrollSize * value, ...args),
      scrollPosition: (value: number, ...args: ScrollOptions) =>
        this.scrollTo(this.scrollPosition * value, ...args),
      offset: (value: number, ...args: ScrollOptions) =>
        this.scrollTo(this.offset * value, ...args),
      element: (elementOrQuery: ElementOrQuery, value: number = 0, ...args: ScrollOptions) => {
        const elementPosition =
          ScrollElement.getOffset(elementOrQuery, this.horizontal) - this.offset
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
      sizeWithBorders: (value: number, ...args: ScrollOptions) =>
        this.scrollBy(this.sizeWithBorders * value, ...args),
      scrollSize: (value: number, ...args: ScrollOptions) =>
        this.scrollBy(this.scrollSize * value, ...args),
      scrollPosition: (value: number, ...args: ScrollOptions) =>
        this.scrollBy(this.scrollPosition * value, ...args),
      offset: (value: number, ...args: ScrollOptions) =>
        this.scrollBy(this.offset * value, ...args),
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
