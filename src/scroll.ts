import { Animation } from "./animation"
import { toDirection, AnimationManager } from "./animation-manager"
import { ScrollElement } from "./element"
import defaultSettings, { EasingFunction } from "./default-settings"

function almost0(value: number): boolean {
  return value < 1 && value > -1
}

type PartialRecursive<T> = T extends object ? { [K in keyof T]?: PartialRecursive<T[K]> } : T

export type onScroll = (() => void) | null

type ScrollType = "value" | "percent" | "screen"

interface ISettings {
  easing: EasingFunction
  onScroll: onScroll
  onUtilityScroll: onScroll
  onExternalScroll: onScroll
  options: IOptions
}

interface IOptions {
  duration: number
  horizontal: boolean
}

type PartialSettings = PartialRecursive<ISettings>

class Scroll {
  private element: ScrollElement
  private settings: ISettings
  private animationManager: AnimationManager
  constructor(element?: Element | Window, settings: PartialSettings = {}) {
    this.settings = defaultSettings
    this.updateSettings(settings)

    this.element = new ScrollElement(element, () => {
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
    })

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
    element: Element,
    value: number,
    options: Partial<IOptions> = {},
  ): Animation {
    const mappedOptions = this.getDefault(options)
    return this.offsetScroll(
      this.getDistToElement(element, value, mappedOptions.horizontal),
      mappedOptions,
    )
  }
  public scrollTo(
    scrollType: ScrollType,
    value: number,
    options: Partial<IOptions> = {},
  ): Animation {
    const mappedOptions = this.getDefault(options)
    const dist = this.getDist(scrollType, value, mappedOptions.horizontal)
    const direction = toDirection(mappedOptions.horizontal)
    return this.offsetScroll(dist - this.element.position[direction], mappedOptions)
  }
  public scrollBy(
    scrollType: ScrollType,
    value: number,
    options: Partial<IOptions> = {},
  ): Animation {
    const mappedOptions = this.getDefault(options)
    const dist = this.getDist(scrollType, value, mappedOptions.horizontal)
    return this.offsetScroll(dist, mappedOptions)
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
    this.animationManager.shouldBe.x = Math.max(
      0,
      Math.min(this.animationManager.shouldBe.x, this.element.scrollSize.x - this.element.size.x),
    )
    this.animationManager.shouldBe.y = Math.max(
      0,
      Math.min(this.animationManager.shouldBe.y, this.element.scrollSize.y - this.element.size.y),
    )
    window.requestAnimationFrame(this.scroll)
  }
  private offsetScroll(distToScroll: number, options: IOptions) {
    const animation = this.animationManager.createScrollAnimation({
      distToScroll,
      duration: options.duration,
      horizontal: options.horizontal,
      easing: this.settings.easing,
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
  private getDistToElement(element: Element, value: number, horizontal: boolean): number {
    const ratio = value / 100
    const direction = toDirection(horizontal)
    const elementWrapper = new ScrollElement(element)
    const screenOffset = (this.element.size[direction] - elementWrapper.size[direction]) * ratio
    const elementPosition = elementWrapper.offset[direction] - this.element.offset[direction]
    return elementPosition - screenOffset
  }
  private getDefault(options: Partial<IOptions>): IOptions {
    return Object.assign({}, this.settings.options, options)
  }
}

export { Scroll, IOptions, ISettings }
