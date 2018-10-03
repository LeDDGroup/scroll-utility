import { ScrollElement } from "./element"
import { AnimationManager } from "./animation-manager"
import { EasingFunction, defaultEasingFunction } from "./easing"
import { Animation } from "./animation"

type Maybe<T> = T | null | undefined
type onScrollFunction = Maybe<() => void>

interface IScrollToElementOptions extends IOptions {
  center?: number
}

interface IOptions {
  duration?: number
  horizontal?: boolean
}

class Scroll {
  private _onScroll: onScrollFunction = null
  private mounted: boolean = false
  public get onScroll(): onScrollFunction {
    return this._onScroll
  }
  public set onScroll(value: onScrollFunction) {
    this.scrollSet()
    this._onScroll = value
  }
  private _onUserScroll: onScrollFunction = null
  public get onUserScroll(): onScrollFunction {
    return this._onUserScroll
  }
  public set onUserScroll(value: onScrollFunction) {
    this.scrollSet()
    this._onUserScroll = value
  }
  private _onUtilityScroll: onScrollFunction = null
  public get onUtilityScroll(): onScrollFunction {
    return this._onUtilityScroll
  }
  public set onUtilityScroll(value: onScrollFunction) {
    this.scrollSet()
    this._onUtilityScroll = value
  }
  public easing: EasingFunction = defaultEasingFunction
  private element: ScrollElement
  private animationManager: AnimationManager
  private scrolling: boolean = false
  constructor(element?: Maybe<HTMLElement>) {
    this.element = new ScrollElement(element)
    this.animationManager = new AnimationManager(this.element, () => {
      this.scrolling = true
    })
    this.element.onScroll = () => {
      if (this.scrolling) {
        this.onUtilityScroll && this.onUtilityScroll()
      } else {
        this.onUserScroll && this.onUserScroll()
      }
      this.onScroll && this.onScroll()
      this.scrolling = false
    }
  }
  public stopAllAnimations() {
    this.animationManager.stopAllAnimations()
  }
  private mountOnScroll() {
    this.mounted = true
    this.element.mountOnScroll()
    this.animationManager.mountOnScroll()
  }
  private unmountOnScroll() {
    this.mounted = false
    this.element.unmountOnScroll()
    this.animationManager.unmountOnScroll()
  }
  private scrollSet() {
    const shouldMount =
      this.mounted && (!!this.onScroll && !!this.onUserScroll && !!this.onUtilityScroll)
    const shouldUnmount =
      !this.mounted && (this.onScroll || this.onUserScroll || this.onUtilityScroll)
    if (shouldMount) this.mountOnScroll()
    if (shouldUnmount) this.unmountOnScroll()
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
        easing: this.easing,
      })
    },
  }
}

export { Scroll, IOptions, IScrollToElementOptions, Animation }
