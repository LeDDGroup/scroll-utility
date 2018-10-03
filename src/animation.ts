import { EasingFunction, defaultEasingFunction } from "./easing"

interface ScrollInstanceProps {
  duration: number
  distToScroll: number
  easing: EasingFunction
}

type DOMHighResTimeStamp = number

class Animation {
  private initialTime: DOMHighResTimeStamp
  private active: boolean = true
  public easing: EasingFunction
  constructor(private options: ScrollInstanceProps) {
    this.initialTime = performance.now()
    this.easing = options.easing || defaultEasingFunction
  }
  public get distance(): number {
    return this.isPastAnimation()
      ? this.options.distToScroll
      : this.easing(this.currentDuration, 0, this.options.distToScroll, this.options.duration)
  }
  public isPastAnimation(): boolean {
    return this.currentDuration >= this.options.duration
  }
  public stop() {
    this.active = false
  }
  public get isActive() {
    return this.active
  }
  private get currentDuration() {
    return performance.now() - this.initialTime
  }
}

export { Animation, ScrollInstanceProps }
