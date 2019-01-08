import { ScrollElement, toDirection } from "./element"

class Misc {
  constructor(private element: ScrollElement) {}
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
}

export { Misc }
