import { toDirection, AnimationManager } from "./animation-manager"
import { ScrollElement } from "./element"
import { EasingFunction, defaultEasingFunction } from "./default-settings"

function almost0(value: number): boolean {
  return value < 1 && value > -1
}

class Scroll {
  private element: ScrollElement
  private animationManager: AnimationManager
  constructor(
    element: Element | Window = window,
    public onScroll: ((external?: boolean) => void) | null = null,
    public easing: EasingFunction = defaultEasingFunction,
  ) {
    this.element = new ScrollElement(element, () => {
      const almostX = almost0(this.animationManager.shouldBe.x - this.element.position.x)
      const almostY = almost0(this.animationManager.shouldBe.y - this.element.position.y)
      !almostX && (this.animationManager.shouldBe.x = this.element.position.x)
      !almostY && (this.animationManager.shouldBe.y = this.element.position.y)
      this.onScroll && this.onScroll(!(almostX && almostY))
    })

    this.animationManager = new AnimationManager({
      x: this.element.position.x,
      y: this.element.position.y,
    })

    this.scroll()
  }
  public stopAllAnimations() {
    this.animationManager.stopAllAnimations()
  }
  public scrollBy(
    distToScroll: number,
    duration: number,
    horizontal: boolean = false,
    easing: EasingFunction = this.easing,
  ) {
    this.animationManager.createScrollAnimation({
      distToScroll,
      horizontal,
      duration,
      easing,
    })
  }
  private scroll = () => {
    const shouldBe = Object.assign({}, this.animationManager.shouldBe)
    this.animationManager.updateShouldBe()
    if (
      shouldBe.x !== this.animationManager.shouldBe.x ||
      shouldBe.y !== this.animationManager.shouldBe.y
    ) {
      this.element.scrollTo(this.animationManager.shouldBe)
    }
    this.animationManager.shouldBe.x = Math.max(
      0,
      Math.min(this.animationManager.shouldBe.x, this.element.scrollSize.x - this.element.size.x),
    )
    this.animationManager.shouldBe.y = Math.max(
      0,
      Math.min(this.animationManager.shouldBe.y, this.element.scrollSize.y - this.element.size.y),
    )
    window.requestAnimationFrame(this.scroll)
  }
  // private getDist(scrollType: ScrollType, value: number, horizontal: boolean): number {
  //   const direction = toDirection(horizontal)
  //   switch (scrollType) {
  //     case "percent":
  //       return ((this.element.scrollSize[direction] - this.element.size[direction]) * value) / 100
  //     case "screen":
  //       return this.element.size[direction] * value
  //     default:
  //       return value
  //   }
  // }
  public getDistToElement(element: Element, value: number, horizontal: boolean): number {
    const ratio = value / 100
    const direction = toDirection(horizontal)
    const elementWrapper = new ScrollElement(element)
    const screenOffset = (this.element.size[direction] - elementWrapper.size[direction]) * ratio
    const elementPosition = elementWrapper.offset[direction] - this.element.offset[direction]
    return elementPosition - screenOffset
  }
}

export { Scroll }
