import { AnimationManager } from "./animation-manager"
import { EasingFunction, defaultEasingFunction } from "./default-settings"
import { ScrollElement, toDirection, Point } from "./element"

function almost0(value: number): boolean {
  return value < 1 && value > -1
}

class Scroll {
  private animationManager: AnimationManager
  private element: ScrollElement
  constructor(
    element: Element = document.documentElement,
    private horizontal: boolean = false,
    public duration: number = 0,
    public onScroll: ((external?: boolean) => void) | null = null,
    public easing: EasingFunction = defaultEasingFunction,
  ) {
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
            horizontal ? this.element.scrollPosition.x : this.animationManager.shouldBe,
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
  scrollBy(
    distToScroll: number,
    duration: number = this.duration,
    easing: EasingFunction = this.easing,
  ) {
    this.animationManager.createScrollAnimation({
      distToScroll,
      duration,
      easing,
    })
  }
  scrollTo(
    position: number,
    duration: number = this.duration,
    easing: EasingFunction = this.easing,
  ) {
    this.scrollBy(position - this.scrollPosition, duration, easing)
  }
  centerElement(
    element: Element,
    value: number = 0,
    duration: number = this.duration,
    easing: EasingFunction = this.easing,
  ) {
    const ratio = value / 100
    const elementWrapper = new Scroll(element, this.horizontal)
    const screenOffset =
      (this.size - elementWrapper.element.sizeB[toDirection(this.horizontal)]) * ratio
    const elementPosition = elementWrapper.offset - this.offset
    this.scrollBy(elementPosition - screenOffset, duration, easing)
  }
}

export { Scroll }
