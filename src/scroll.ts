import { ScrollElement } from "./element"
import { AnimationManager } from "./animation-manager"
import { EasingFunction, defaultEasingFunction } from "./easing"
import { Animation } from "./animation"

const defaultSettings = {
  easing: defaultEasingFunction,
}

export type onScroll = (() => void) | null

interface ISettings {
  easing: EasingFunction
  onScroll?: onScroll
  onUtilityScroll?: onScroll
  onExternalScroll?: onScroll
}

interface IOptions {
  value?: number
  duration?: number
  horizontal?: boolean
}

interface IScrollToElementOptions extends IOptions {
  center?: number
}

class Scroll {
  private element: ScrollElement
  private animationManager: AnimationManager
  constructor(element: HTMLElement | null, private settings: ISettings = defaultSettings) {
    this.element = new ScrollElement(element)
    this.animationManager = new AnimationManager(
      () => this.settings.onUtilityScroll && this.settings.onUtilityScroll(),
      () => this.settings.onExternalScroll && this.settings.onExternalScroll(),
      this.element.position,
    )
    this.element.onScroll = () => this.settings.onScroll && this.settings.onScroll()
  }
  public stopAllAnimations() {
    this.animationManager.stopAllAnimations()
  }
  public readonly scroll = {
    toElement: (
      element: HTMLElement | null | undefined,
      options: IScrollToElementOptions = {},
    ): Animation => {
      const dist = this.element.distanceTo.element(
        new ScrollElement(element),
        options.center || 0,
        !!options.horizontal,
      )
      return this.scroll.offset(dist, options)
    },
    toPercent: (percent: number, options: IOptions = {}): Animation => {
      const dist = this.element.distanceTo.percent(percent, !!options.horizontal)
      return this.scroll.offset(dist, options)
    },
    toPosition: (position: number, options: IOptions = {}): Animation => {
      const dist = this.element.distanceTo.position(position, !!options.horizontal)
      return this.scroll.offset(dist, options)
    },
    offset: (amount: number, options: IOptions = {}): Animation => {
      return this.animationManager.createScrollAnimation({
        distToScroll: amount,
        duration: options.duration || 0,
        horizontal: options.horizontal || false,
        easing: this.settings.easing,
      })
    },
  }
}

export { Scroll, IOptions, IScrollToElementOptions, Animation }
