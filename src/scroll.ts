import { AnimationManager } from "./animation-manager"
import { EasingFunction, defaultEasingFunction } from "./default-settings"
import { ScrollElement, toDirection, Point } from "./element"

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
  private element: ScrollElement
  constructor(
    elementOrQuery: ElementOrQuery = document.documentElement,
    private horizontal: boolean = false,
    public duration: number = 0,
    public onScroll: ((external?: boolean) => void) | null = null,
    public easing: EasingFunction = defaultEasingFunction,
  ) {
    const element = getElementFromQuery(elementOrQuery)
    this.element = new ScrollElement(element, () => {
      const almost = almost0(this.animationManager.shouldBe - this.scrollPosition)
      !almost && (this.animationManager.shouldBe = this.scrollPosition)
      this.onScroll && this.onScroll(!almost)
    })

    this.animationManager = new AnimationManager(this.scrollPosition)

    const scroll = () => {
      const shouldBe = this.animationManager.shouldBe
      this.animationManager.updateShouldBe()
      if (shouldBe !== this.animationManager.shouldBe) {
        this.element.scrollTo(
          new Point(
            horizontal ? this.animationManager.shouldBe : this.element.scrollPosition.x,
            horizontal ? this.element.scrollPosition.y : this.animationManager.shouldBe,
          ),
        )
      }
      this.animationManager.shouldBe = Math.max(
        0,
        Math.min(this.animationManager.shouldBe, this.scrollSize - this.size),
      )
      window.requestAnimationFrame(scroll)
    }
    window.requestAnimationFrame(scroll)
  }
  get size() {
    return this.element.size[toDirection(this.horizontal)]
  }
  get sizeWithBorders() {
    return this.element.sizeB[toDirection(this.horizontal)]
  }
  get scrollSize() {
    return this.element.scrollSize[toDirection(this.horizontal)]
  }
  get scrollPosition() {
    return this.element.scrollPosition[toDirection(this.horizontal)]
  }
  get offset() {
    return this.element.offset[toDirection(this.horizontal)]
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
      size: (value: number, ...args: ScrollOptions) =>
        this.scrollTo(this.element.size[toDirection(this.horizontal)] * value, ...args),
      sizeWithBorders: (value: number, ...args: ScrollOptions) =>
        this.scrollTo(this.element.sizeB[toDirection(this.horizontal)] * value, ...args),
      scrollSize: (value: number, ...args: ScrollOptions) =>
        this.scrollTo(this.element.scrollSize[toDirection(this.horizontal)] * value, ...args),
      scrollPosition: (value: number, ...args: ScrollOptions) =>
        this.scrollTo(this.element.scrollPosition[toDirection(this.horizontal)] * value, ...args),
      offset: (value: number, ...args: ScrollOptions) =>
        this.scrollTo(this.element.offset[toDirection(this.horizontal)] * value, ...args),
      element: (elementOrQuery: ElementOrQuery, value: number = 0, ...args: ScrollOptions) => {
        const elementWrapper = new Scroll(elementOrQuery, this.horizontal)
        const screenOffset = (this.size - elementWrapper.sizeWithBorders) * value
        const elementPosition = elementWrapper.offset - this.offset
        return this.scrollBy(elementPosition - screenOffset, ...args)
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
      size: (value: number, ...args: ScrollOptions) =>
        this.scrollBy(this.element.size[toDirection(this.horizontal)] * value, ...args),
      sizeWithBorders: (value: number, ...args: ScrollOptions) =>
        this.scrollBy(this.element.sizeB[toDirection(this.horizontal)] * value, ...args),
      scrollSize: (value: number, ...args: ScrollOptions) =>
        this.scrollBy(this.element.scrollSize[toDirection(this.horizontal)] * value, ...args),
      scrollPosition: (value: number, ...args: ScrollOptions) =>
        this.scrollBy(this.element.scrollPosition[toDirection(this.horizontal)] * value, ...args),
      offset: (value: number, ...args: ScrollOptions) =>
        this.scrollBy(this.element.offset[toDirection(this.horizontal)] * value, ...args),
      element: (elementOrQuery: ElementOrQuery, value: number = 0, ...args: ScrollOptions) => {
        const elementWrapper = new Scroll(elementOrQuery, this.horizontal)
        return this.scrollBy(elementWrapper.sizeWithBorders * value, ...args)
      },
    },
  )
}

export { Scroll }
