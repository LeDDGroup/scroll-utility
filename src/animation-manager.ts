import { Animation } from "./animation"
import { EasingFunction } from "./default-settings"

class AnimationManager {
  public shouldBe: number
  private scrollAnimation: Animation[] = []
  constructor(currentPosition: number) {
    this.shouldBe = currentPosition
  }
  public stopAllAnimations() {
    this.scrollAnimation = []
  }
  public createScrollAnimation(options: {
    distToScroll: number
    duration: number
    easing: EasingFunction
  }): Animation {
    const duration = !!options.duration ? options.duration : 1
    const animation = new Animation({
      distToScroll: options.distToScroll,
      duration,
      easing: options.easing,
      stop: () => this.scrollAnimation.splice(this.scrollAnimation.indexOf(animation), 1),
    })
    this.scrollAnimation.push(animation)
    return animation
  }
  public updateShouldBe() {
    this.scrollAnimation.forEach(
      animation => (this.shouldBe += -animation.distance + animation.updateDistance()),
    )
    return this.shouldBe
  }
}

export { AnimationManager }
