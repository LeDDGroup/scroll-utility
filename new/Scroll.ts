import { Animation as ScrollAnimation } from "./Animation";

export { Scroll, IOptions };

interface IOptions {
  offset?: number;
  duration?: number;
}

class Scroll {
  private isWindow = false;
  constructor(private element?: HTMLElement) {
    this.isWindow = element === undefined || element === null;
  }
  public scrollToElement(element: HTMLElement, options?: IOptions): ScrollAnimation {
    const offset = options.offset || 0;
    const distToElement = element.getBoundingClientRect().top - this.top + offset;
    return new ScrollAnimation({
      distToScroll: () => distToElement,
      duration: options.duration,
    });
  }
  public scrollToPercent(percent: number = 0, options?: IOptions): ScrollAnimation {
    const offset = options.offset || 0;
    const dist = ((this.scrollHeight - this.height) * percent) / 100 - this.y + offset;
    return new ScrollAnimation({
      distToScroll: () => dist,
      duration: options.duration,
    });
  }
  public doScroll(options: IOptions): ScrollAnimation {
    return new ScrollAnimation({
      distToScroll: () => options.offset,
      duration: options.duration,
    });
  }
  private get scrollHeight(): number {
    return this.isWindow ? document.body.clientHeight : this.element.scrollHeight;
  }
  private get scrollWidth(): number {
    return this.isWindow ? document.body.clientWidth : this.element.scrollWidth;
  }
  private get height(): number {
    return this.isWindow ? window.innerHeight : this.element.clientHeight;
  }
  private get width(): number {
    return this.isWindow ? window.innerWidth : this.element.clientWidth;
  }
  private get y(): number {
    return this.isWindow ? window.pageYOffset : this.element.scrollTop;
  }
  private get x(): number {
    return this.isWindow ? window.pageXOffset : this.element.scrollLeft;
  }
  private get top(): number {
    return this.isWindow ? 0 : this.element.getBoundingClientRect().top;
  }
  private get left(): number {
    return this.isWindow ? 0 : this.element.getBoundingClientRect().left;
  }
}
