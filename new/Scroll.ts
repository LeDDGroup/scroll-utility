import {ScrollInstance} from "./ScrollTo";

export {
  Scroll,
}

interface IOptions {
  offset?: number;
  percentOffset?: number;
  duration?: number;
}

class Scroll {
  private scrollElement: any = {};
  private isWindow = false;
  constructor(private element?: HTMLElement) {
    this.isWindow = element === undefined || element === null;
  }
  public scrollToElement(element: HTMLElement, options?: IOptions): ScrollInstance {
    return new ScrollInstance;
  }
  public scrollToPercent(percent: number, options?: IOptions): ScrollInstance {
    return new ScrollInstance;
  }
  public doScroll(options: IOptions): ScrollInstance {
    return new ScrollInstance;
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
}
