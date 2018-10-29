import { Animation } from "./animation"
import { toDirection, AnimationManager } from "./animation-manager"
import { defaultEasingFunction, EasingFunction } from "./easing"
import { ScrollElement } from "./element"

function almost0(value: number): boolean {
  return value < 1 && value > -1
}

type PartialRecursive<T> = T extends object ? { [K in keyof T]?: PartialRecursive<T[K]> } : T

export type onScroll = (() => void) | null

type ScrollType = "value" | "percent" | "screen"

interface Settings {
  easing: EasingFunction
  onScroll: onScroll
  onUtilityScroll: onScroll
  onExternalScroll: onScroll
  options: IOptions
}

const defaultSettings: Settings = {
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
  value: number
  duration: number
  horizontal: boolean
}

type PartialSettings = PartialRecursive<Settings>

class Scroll {
  private element: ScrollElement
  private settings: Settings
  private animationManager: AnimationManager
  constructor(element?: HTMLElement | Window, settings: PartialSettings = {}) {
    this.settings = defaultSettings
    this.updateSettings(settings)
    const onScroll = () => {
      const almostX = almost0(this.animationManager.shouldBe.x - this.element.position.x)
      const almostY = almost0(this.animationManager.shouldBe.y - this.element.position.y)
      !almostX && (this.animationManager.shouldBe.x = this.element.position.x)
      !almostY && (this.animationManager.shouldBe.y = this.element.position.y)
      if (almostX && almostY) {
        this.settings.onUtilityScroll && this.settings.onUtilityScroll()
      } else {
        this.settings.onExternalScroll && this.settings.onExternalScroll()
      }
      this.settings.onScroll && this.settings.onScroll()
    }
    this.element = new ScrollElement(element, onScroll)
    this.animationManager = new AnimationManager({
      x: this.element.position.x,
      y: this.element.position.y,
    })
    this.scroll()
  }
  public updateSettings(settings: PartialSettings) {
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
    const direction = toDirection(horizontal)
    const elementWrapper = new ScrollElement(element)
    const screenOffset = (this.element.size[direction] - elementWrapper.size[direction]) * ratio
    const elementPosition = elementWrapper.offset[direction] - this.element.offset[direction]
    return this.offsetScroll({ ...mappedOptions, value: elementPosition - screenOffset })
  }
  public scrollTo(scrollType: ScrollType, options: IOptions = this.settings.options) {
    const mappedOptions = this.getDefault(options)
    const dist = this.getDist(scrollType, mappedOptions.value, mappedOptions.horizontal)
    const direction = toDirection(mappedOptions.horizontal)
    return this.offsetScroll({
      ...mappedOptions,
      value: dist - this.element.position[direction],
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
      this.element.scrollTo(this.animationManager.shouldBe)
    }
    window.requestAnimationFrame(this.scroll)
  }
  private offsetScroll(options: IOptions) {
    const animation = this.animationManager.createScrollAnimation({
      distToScroll: options.value,
      easing: this.settings.easing,
      duration: options.duration,
      horizontal: options.horizontal,
    })
    return animation
  }
  private getDist(scrollType: ScrollType, value: number, horizontal: boolean): number {
    const direction = toDirection(horizontal)
    switch (scrollType) {
      case "percent":
        return ((this.element.scrollSize[direction] - this.element.size[direction]) * value) / 100
      case "screen":
        return this.element.size[direction] * value
      default:
        return value
    }
  }
  private getDefault(options: IOptions): IOptions {
    return Object.assign(this.settings.options, options)
  }
}

export { Scroll, IOptions, Animation }
