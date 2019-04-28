import { AnimationManager } from "./animation-manager"
import { EasingFunction, defaultEasingFunction } from "./default-settings"
import { ScrollElement, toDirection, Point } from "./element"

function almost0(value: number): boolean {
  return value < 1 && value > -1
}

type ElementOrQuery = Window | Element | string
type ScrollTo = [number, number?, EasingFunction?]
type CenterElement = [ElementOrQuery, number?, number?, EasingFunction?]

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
  scrollTo(...args: ScrollTo | CenterElement) {
    if (typeof args[0] === "number") {
      this.scroll(...(args as ScrollTo))
    } else {
      this.centerElement(...(args as CenterElement))
    }
  }
  private scroll(
    position: number,
    duration: number = this.duration,
    easing: EasingFunction = this.easing,
  ) {
    this.animationManager.createScrollAnimation({
      distToScroll: position - this.scrollPosition,
      duration,
      easing,
    })
  }
  private centerElement(
    elementOrQuery: ElementOrQuery,
    value: number = 0,
    duration: number = this.duration,
    easing: EasingFunction = this.easing,
  ) {
    const element = getElementFromQuery(elementOrQuery)
    const ratio = value / 100
    const elementWrapper = new Scroll(element, this.horizontal)
    const screenOffset = (this.size - elementWrapper.sizeWithBorders) * ratio
    const elementPosition = elementWrapper.offset - this.offset
    this.scroll(this.scrollPosition + (elementPosition - screenOffset), duration, easing)
  }
}

export { Scroll }
