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
    toElement: (element: HTMLElement | null, options: IScrollToElementOptions = {}): Animation => {
      const ratio = (options.value || 0) / 100
      const horizontal = !!options.horizontal
      const elementWrapper = new ScrollElement(element)
      const screenOffset = (this.element.size(horizontal) - elementWrapper.size(horizontal)) * ratio
      const elementPosition = elementWrapper.offset(horizontal) - this.element.offset(horizontal)
      return this.scroll.offset(elementPosition - screenOffset, options)
    },
    toPercent: (percent: number, options: IOptions = {}): Animation => {
      const horizontal = !!options.horizontal
      const position =
        ((this.element.scrollSize(horizontal) - this.element.size(horizontal)) * percent) / 100
      return this.scroll.toPosition(position, options)
    },
    toPosition: (position: number, options: IOptions = {}): Animation => {
      const dist = position - this.element.position(!!options.horizontal)
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
