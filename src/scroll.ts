import { AnimationManager } from "./animation-manager"
import { ScrollElement, IHorizontal, toDirection, Point } from "./element"
import { EasingFunction, defaultEasingFunction } from "./default-settings"
import { Misc } from "./misc"

function almost0(value: number): boolean {
  return value < 1 && value > -1
}

class Scroll {
  element: ScrollElement
  private animationManager: IHorizontal<AnimationManager>
  misc: Misc
  constructor(
    element: Element | Window = window,
    public onScroll: ((external?: boolean) => void) | null = null,
    public easing: EasingFunction = defaultEasingFunction,
  ) {
    this.element = new ScrollElement(element, () => {
      const almostX = almost0(this.animationManager.x.shouldBe - this.element.scrollPosition.x)
      const almostY = almost0(this.animationManager.y.shouldBe - this.element.scrollPosition.y)
      !almostX && (this.animationManager.x.shouldBe = this.element.scrollPosition.x)
      !almostY && (this.animationManager.y.shouldBe = this.element.scrollPosition.y)
      this.onScroll && this.onScroll(!(almostX && almostY))
    })

    this.animationManager = {
      x: new AnimationManager(this.element.scrollPosition.x),
      y: new AnimationManager(this.element.scrollPosition.y),
    }

    const scroll = () => {
      const shouldBe = new Point(this.animationManager.x.shouldBe, this.animationManager.y.shouldBe)
      this.animationManager.x.updateShouldBe()
      this.animationManager.y.updateShouldBe()
      if (
        shouldBe.x !== this.animationManager.x.shouldBe ||
        shouldBe.y !== this.animationManager.y.shouldBe
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
      window.requestAnimationFrame(scroll)
    }
    window.requestAnimationFrame(scroll)

    this.misc = new Misc(this)
  }
  stopAllAnimations() {
    this.animationManager.x.stopAllAnimations()
    this.animationManager.y.stopAllAnimations()
  }
  scrollBy(
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
}

export { Scroll }
