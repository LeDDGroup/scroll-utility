import { Animation } from "./animation"
import { ScrollElement } from "./element"
import { EasingFunction } from "./easing"

function almost0(value: number): boolean {
  return value < 1 && value > -1
}

function toDirection(horizontal: boolean): "horizontal" | "vertical" {
  return horizontal ? "horizontal" : "vertical"
}

interface IHorizontal<T> {
  vertical: T
  horizontal: T
}

interface Point {
  x: number
  y: number
}

class AnimationManager {
  private shouldBe: Point = { x: 0, y: 0 }
  private scrollAnimation: IHorizontal<Animation[]> = {
    vertical: [],
    horizontal: [],
  }
  private lastPosition: IHorizontal<number> = {
    horizontal: 0,
    vertical: 0,
  }
  private scrollChanged: IHorizontal<number> = {
    horizontal: 0,
    vertical: 0,
  }
  constructor(
    private element: ScrollElement,
    private scroll: () => void,
    private scrolled: () => void,
  ) {}
  public stopAllAnimations() {
    this.scrollAnimation = {
      vertical: [],
      horizontal: [],
    }
    this.scrollChanged = {
      horizontal: 0,
      vertical: 0,
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
    })
    this.scrollAnimation[direction].push(animation)
    if (this.animationsCount === 1) {
      this.shouldBe.x = this.element.position(true)
      this.shouldBe.y = this.element.position(false)
      window.requestAnimationFrame(this.onAnimationFrame)
    }
    return animation
  }
  private get animationsCount() {
    return this.scrollAnimation.horizontal.length + this.scrollAnimation.vertical.length
  }

  private onAnimationFrame = () => {
    if (this.animationsCount === 0) {
      this.stopAllAnimations()
    } else {
      if (
        !almost0(this.shouldBe.x - this.element.position(true)) ||
        !almost0(this.shouldBe.y - this.element.position(false))
      ) {
        this.scrolled()
      }
      const distToScroll = this.distToScroll
      this.scrollTo(distToScroll.x, distToScroll.y)
      this.shouldBe = distToScroll
      this.scrollChanged.horizontal += this.element.position(true) - this.lastPosition.horizontal
      this.scrollChanged.vertical += this.element.position(false) - this.lastPosition.vertical
      window.requestAnimationFrame(this.onAnimationFrame)
    }
  }
  private scrollTo(x: number, y: number) {
    this.scroll()
    this.element.scrollTo(x, y)
  }
  private get distToScroll(): Point {
    return {
      x: this.getDistToScroll(true),
      y: this.getDistToScroll(false),
    }
  }
  private getDistToScroll(horizontal: boolean): number {
    let distToScroll = 0
    const direction = toDirection(horizontal)
    this.lastPosition[direction] = this.element.position(horizontal)
    const initial = this.element.position(horizontal) - this.scrollChanged[direction]
    const scrollAnimation = this.scrollAnimation[direction]
    scrollAnimation.forEach(animation => {
      distToScroll += animation.distance
      if (animation.isPastAnimation()) {
        animation.stop()
        this.scrollChanged[direction] -= animation.distance
        scrollAnimation.splice(scrollAnimation.indexOf(animation), 1)
      }
    })
    distToScroll += initial
    return distToScroll
  }
}

export { AnimationManager }
