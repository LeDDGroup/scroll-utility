import { ScrollElement, toDirection } from "./element"
import { Scroll } from "./scroll"
import { EasingFunction } from "./default-settings"

class Misc {
  private element = this.scrollManager.element
  constructor(private scrollManager: Scroll) {}
  public scrollTo(
    distToScroll: number,
    duration: number,
    horizontal: boolean = false,
    easing?: EasingFunction,
  ) {
    const direction = toDirection(horizontal)
    this.scrollManager.scrollBy(
      distToScroll - this.element.position[direction],
      duration,
      horizontal,
      easing,
    )
  }
  public getPercentPosition(percent: number, horizontal: boolean): number {
    const direction = toDirection(horizontal)
    return ((this.element.scrollSize[direction] - this.element.size[direction]) * percent) / 100
  }
  public getDistToElement(
    element: Element,
    value: number = 0,
    horizontal: boolean = false,
  ): number {
    const ratio = value / 100
    const direction = toDirection(horizontal)
    const elementWrapper = new ScrollElement(element)
    const screenOffset = (this.element.size[direction] - elementWrapper.size[direction]) * ratio
    const elementPosition = elementWrapper.offset[direction] - this.element.offset[direction]
    return elementPosition - screenOffset
  }
  public isElementInRange(element: Element, horizontal: boolean = false): boolean {
    const direction = toDirection(horizontal)
    const elementWrapper = new ScrollElement(element)
    const distToElement = this.getDistToElement(element, 0, horizontal)
    const isBefore = -distToElement < elementWrapper.size[direction]
    const isPast = distToElement < this.element.size[direction]
    return isPast && isBefore
  }
}

export { Misc }
