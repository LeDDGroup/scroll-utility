import { EasingFunction } from "./default-settings"

interface ScrollInstanceProps {
  duration: number
  distToScroll: number
  easing: EasingFunction
}

type DOMHighResTimeStamp = number

class Animation {
  private initialTime: DOMHighResTimeStamp
  public distance: number = 0
  public easing: EasingFunction
  constructor(private options: ScrollInstanceProps) {
    this.initialTime = performance.now()
    this.easing = options.easing
  }
  public updateDistance(): number {
    this.distance = this.isPastAnimation()
      ? this.options.distToScroll
      : this.easing(this.currentDuration, 0, this.options.distToScroll, this.options.duration)
    return this.distance
  }
  public isPastAnimation(): boolean {
    return this.currentDuration >= this.options.duration
  }
  private get currentDuration() {
    return performance.now() - this.initialTime
  }
}

export { Animation, ScrollInstanceProps }
