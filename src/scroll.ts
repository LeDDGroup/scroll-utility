import { Animation } from "./animation"
import { AnimationManager } from "./animation-manager"
import { defaultEasingFunction, EasingFunction } from "./easing"
import { ScrollElement } from "./element"

function almost0(value: number): boolean {
  return value < 1 && value > -1
}

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
    const onScroll = () => {
      const almostX = almost0(this.animationManager.shouldBe.x - this.element.position(true))
      const almostY = almost0(this.animationManager.shouldBe.y - this.element.position(false))
      !almostX && (this.animationManager.shouldBe.x = this.element.position(true))
      !almostY && (this.animationManager.shouldBe.y = this.element.position(false))
      if (almostX && almostY) {
        this.settings.onUtilityScroll && this.settings.onUtilityScroll()
      } else {
        this.settings.onExternalScroll && this.settings.onExternalScroll()
      }
      this.settings.onScroll && this.settings.onScroll()
    }
    this.element = new ScrollElement(element, onScroll)
    this.animationManager = new AnimationManager({
      x: this.element.position(true),
      y: this.element.position(false),
    })
    this.settings = defaultSettings
    this.updateSettings(settings)
    this.scroll()
  }
  public updateSettings(settings: Partial<ISettings>) {
    this.settings = Object.assign({}, this.settings, settings)
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
    return this.offsetScroll({
      ...mappedOptions,
      value: dist - this.element.position(mappedOptions.horizontal),
    })
  }
  public scrollBy(scrollType: ScrollType, options: IOptions = this.settings.options) {
    const mappedOptions = this.getDefault(options)
    const dist = this.getDist(scrollType, mappedOptions.value, mappedOptions.horizontal)
    return this.offsetScroll({ ...mappedOptions, value: dist })
  }
  private scroll = () => {
    const shouldBe = Object.assign({}, this.animationManager.shouldBe)
    this.animationManager.updateShouldBe()
    if (
      shouldBe.x !== this.animationManager.shouldBe.x ||
      shouldBe.y !== this.animationManager.shouldBe.y
    ) {
      this.element.scrollTo(this.animationManager.shouldBe.x, this.animationManager.shouldBe.y)
    }
    window.requestAnimationFrame(this.scroll)
  }
  private offsetScroll(options: Required<IOptions>) {
    const animation = this.animationManager.createScrollAnimation({
      distToScroll: options.value,
      easing: this.settings.easing,
      duration: options.duration,
      horizontal: options.horizontal,
    })
    return animation
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
