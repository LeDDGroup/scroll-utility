import { AnimationManager } from "./animation-manager"
import { ScrollElement, IHorizontal, toDirection, Point } from "./element"
import { EasingFunction, defaultEasingFunction } from "./default-settings"

function almost0(value: number): boolean {
  return value < 1 && value > -1
}

class Scroll {
  private element: ScrollElement
  private animationManager: IHorizontal<AnimationManager>
  constructor(
    element: Element | Window = window,
    public onScroll: ((external?: boolean) => void) | null = null,
    public easing: EasingFunction = defaultEasingFunction,
  ) {
    this.element = new ScrollElement(element, () => {
      const almostX = almost0(this.animationManager.x.shouldBe - this.element.position.x)
      const almostY = almost0(this.animationManager.y.shouldBe - this.element.position.y)
      !almostX && (this.animationManager.x.shouldBe = this.element.position.x)
      !almostY && (this.animationManager.y.shouldBe = this.element.position.y)
      this.onScroll && this.onScroll(!(almostX && almostY))
    })

    this.animationManager = {
      x: new AnimationManager(this.element.position.x),
      y: new AnimationManager(this.element.position.y),
    }

    this.scroll()
  }
  public stopAllAnimations() {
    this.animationManager.x.stopAllAnimations()
    this.animationManager.y.stopAllAnimations()
  }
  public scrollBy(
    distToScroll: number,
    duration: number,
    horizontal: boolean = false,
    easing: EasingFunction = this.easing,
  ) {
    const direction = toDirection(horizontal)
    this.animationManager[direction].createScrollAnimation({
      distToScroll,
      duration,
      easing,
    })
  }
  private scroll = () => {
    const shouldBeX = this.animationManager.x.shouldBe
    const shouldBeY = this.animationManager.y.shouldBe
    this.animationManager.x.updateShouldBe()
    this.animationManager.y.updateShouldBe()
    if (
      shouldBeX !== this.animationManager.x.shouldBe ||
      shouldBeY !== this.animationManager.y.shouldBe
    ) {
      this.element.scrollTo(
        new Point(this.animationManager.x.shouldBe, this.animationManager.y.shouldBe),
      )
    }
    this.animationManager.x.shouldBe = Math.max(
      0,
      Math.min(this.animationManager.x.shouldBe, this.element.scrollSize.x - this.element.size.x),
    )
    this.animationManager.y.shouldBe = Math.max(
      0,
      Math.min(this.animationManager.y.shouldBe, this.element.scrollSize.y - this.element.size.y),
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
