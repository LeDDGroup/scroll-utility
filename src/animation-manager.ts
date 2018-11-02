import { Animation } from "./animation"
import { EasingFunction } from "./easing"

function toDirection(horizontal: boolean): "x" | "y" {
  return horizontal ? "x" : "y"
}

interface IHorizontal<T> {
  x: T
  y: T
}

export interface Point extends IHorizontal<number> {
  x: number
  y: number
}

class AnimationManager {
  public shouldBe: Point = { x: 0, y: 0 }
  private scrollAnimation: IHorizontal<Animation[]> = {
    x: [],
    y: [],
  }
  constructor(currentPosition: Point) {
    this.shouldBe = currentPosition
  }
  public stopAllAnimations() {
    this.scrollAnimation = {
      y: [],
      x: [],
    }
  }
  public createScrollAnimation(options: {
    distToScroll: number
    duration: number
    horizontal: boolean
    easing: EasingFunction
  }): Animation {
    const duration = !!options.duration ? options.duration : 1
    const direction = toDirection(options.horizontal)
    const animation = new Animation({
      distToScroll: options.distToScroll,
      duration,
      easing: options.easing,
      stop: () =>
        this.scrollAnimation[direction].splice(
          this.scrollAnimation[direction].indexOf(animation),
          1,
        ),
    })
    this.scrollAnimation[direction].push(animation)
    return animation
  }
  public updateShouldBe() {
    const updateShouldBe = (horizontal: boolean) => {
      const direction = toDirection(horizontal)
      const scrollAnimation = this.scrollAnimation[direction]
      scrollAnimation.forEach(
        animation => (this.shouldBe[direction] += -animation.distance + animation.updateDistance()),
      )
    }
    updateShouldBe(true)
    updateShouldBe(false)
    return this.shouldBe
  }
}

export { AnimationManager }
