import { Animation } from "./animation"
import { EasingFunction } from "./default-settings"

class AnimationManager {
  public position: number
  public previousPosition: number
  public scrollAnimation: Animation[] = []
  constructor(
    currentPosition: number,
    private scroll: (value: number) => void,
    private getMaxPosition: () => number,
  ) {
    this.position = currentPosition
    this.previousPosition = this.position
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
    })
    this.scrollAnimation.push(animation)
    this.update()
    return animation
  }
  private update() {
    this.previousPosition = this.position
    this.scrollAnimation = this.scrollAnimation.filter(animation => {
      this.position += -animation.distance + animation.updateDistance()
      return !animation.isPastAnimation()
    })
    this.position = Math.max(0, Math.min(this.position, this.getMaxPosition()))
    if (this.previousPosition !== this.position) {
      this.scroll(this.position)
    }
    if (this.scrollAnimation.length > 0) {
      requestAnimationFrame(() => this.update())
    }
  }
}

export { AnimationManager }
