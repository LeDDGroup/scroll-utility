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
  constructor(private element?: HTMLElement, options?: IOptions) {
  }
  public scrollToElement(element: HTMLElement): ScrollInstance {
    return new ScrollInstance;
  }
  public scrollToPercent(percent: number): ScrollInstance {
    return new ScrollInstance;
  }
  public doScroll(options: IOptions): ScrollInstance {
    return new ScrollInstance;
  }
}
