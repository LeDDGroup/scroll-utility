import { Animation } from "./animation"
import { ScrollElement } from "./element"
import { EasingFunction } from "./easing"

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
  private mounted: boolean = false
  constructor(private element: ScrollElement, private scroll: () => void) {}
  public stopAllAnimations() {
    this.scrollAnimation = {
      vertical: [],
      horizontal: [],
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
      window.requestAnimationFrame(this.onAnimationFrame)
    }
    return animation
  }
  public mountOnScroll() {
    this.mounted = true
  }
  public unmountOnScroll() {
    this.mounted = false
  }
  private get animationsCount() {
    return this.scrollAnimation.horizontal.length + this.scrollAnimation.vertical.length
  }

  private onAnimationFrame = () => {
    if (this.animationsCount === 0) {
      this.scrollChanged = {
        horizontal: 0,
        vertical: 0,
      }
    } else {
      const distToScroll = this.distToScroll
      this.scrollTo(distToScroll.x, distToScroll.y)
      this.scrollChanged.horizontal += this.element.position(true) - this.lastPosition.horizontal
      this.scrollChanged.vertical += this.element.position(false) - this.lastPosition.vertical
    }
    window.requestAnimationFrame(
      this.mounted
        ? () => window.requestAnimationFrame(this.onAnimationFrame) // skip 1 animation
        : this.onAnimationFrame,
    )
  }
  private scrollTo(x: number, y: number) {
    this.scroll()
    this.element.scrollTo(Math.round(x), Math.round(y))
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
