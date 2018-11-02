import { Animation } from "./animation"
import { AnimationManager, Point } from "./animation-manager"
import { defaultEasingFunction, EasingFunction } from "./easing"
import { ScrollElement } from "./element"

export type onScroll = (() => void) | null

type ScrollType = "value" | "percent" | "screen"

interface ISettings {
  easing: EasingFunction
  onScroll: onScroll
  onUtilityScroll: onScroll
  onExternalScroll: onScroll
  options: Required<IOptions>
}

const defaultSettings: ISettings = {
  easing: defaultEasingFunction,
  onScroll: null,
  onUtilityScroll: null,
  onExternalScroll: null,
  options: {
    value: 0,
    duration: 1000,
    horizontal: false,
  },
}

interface IOptions {
  value?: number
  duration?: number
  horizontal?: boolean
}

class Scroll {
  private element: ScrollElement
  private settings: ISettings
  private animationManager: AnimationManager
  constructor(element?: HTMLElement | Window, settings: Partial<ISettings> = defaultSettings) {
    this.element = new ScrollElement(element)
    this.animationManager = new AnimationManager(
      (point: Point) => {
        this.element.scrollTo(point.x, point.y)
        this.settings.onUtilityScroll && this.settings.onUtilityScroll()
      },
      () => this.settings.onExternalScroll && this.settings.onExternalScroll(),
      (horizontal: boolean) => this.element.position(horizontal),
    )
    this.settings = defaultSettings
    this.updateSettings(settings)
  }
  public updateSettings(settings: Partial<ISettings>) {
    this.settings = Object.assign(this.settings, settings)
    this.element.onScroll = this.settings.onScroll
  }
  public stopAllAnimations() {
    this.animationManager.stopAllAnimations()
  }
  public centerElement(
    element: HTMLElement,
    _options: IOptions = this.settings.options,
  ): Animation {
    const mappedOptions = this.getDefault(_options)
    const ratio = (mappedOptions.value || 0) / 100
    const horizontal = mappedOptions.horizontal
    const elementWrapper = new ScrollElement(element)
    const screenOffset = (this.element.size(horizontal) - elementWrapper.size(horizontal)) * ratio
    const elementPosition = elementWrapper.offset(horizontal) - this.element.offset(horizontal)
    return this.offsetScroll({ ...mappedOptions, value: elementPosition - screenOffset })
  }
  public scrollTo(scrollType: ScrollType, options: IOptions = this.settings.options) {
    const mappedOptions = this.getDefault(options)
    const dist = this.getDist(scrollType, mappedOptions.value, mappedOptions.horizontal)
    this.offsetScroll({
      ...mappedOptions,
      value: dist - this.element.position(mappedOptions.horizontal),
    })
  }
  public scrollBy(scrollType: ScrollType, options: IOptions = this.settings.options) {
    const mappedOptions = this.getDefault(options)
    const dist = this.getDist(scrollType, mappedOptions.value, mappedOptions.horizontal)
    this.offsetScroll({ ...mappedOptions, value: dist })
  }
  private offsetScroll(options: Required<IOptions>) {
    return this.animationManager.createScrollAnimation({
      distToScroll: options.value,
      easing: this.settings.easing,
      duration: options.duration,
      horizontal: options.horizontal,
    })
  }
  private getDist(scrollType: ScrollType, value: number, horizontal: boolean): number {
    switch (scrollType) {
      case "percent":
        return ((this.element.scrollSize(horizontal) - this.element.size(horizontal)) * value) / 100
      case "screen":
        return this.element.size(horizontal) * value
      default:
        return value
    }
  }
  private getDefault(options: IOptions): Required<IOptions> {
    return Object.assign(this.settings.options, options)
  }
}

export { Scroll, IOptions, Animation }
