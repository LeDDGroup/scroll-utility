import { ScrollElement } from "./element";
import { AnimationManager } from "./animation-manager";
import { EasingFunction, defaultEasingFunction, IBasicProperties } from "./data";

interface IScrollToElementOptions extends IOptions {
  center?: number;
}

interface IOptions {
  duration?: number;
  horizontal?: boolean;
}

class Scroll implements IBasicProperties {
  public onScroll: (() => void) | null = null;
  public easing: EasingFunction = defaultEasingFunction;
  private element: ScrollElement;
  private animationManager: AnimationManager;
  constructor(element?: HTMLElement | null) {
    this.element = new ScrollElement(element);
    this.animationManager = new AnimationManager(this.element);
  }
  public scroll = {
    toElement: (element: HTMLElement | null | undefined, options: IScrollToElementOptions = {}) => {
      let dist = 0;
      if (element) {
        const center = options.center || 0;
        const horizontal = !!options.horizontal;
        const ratio = center / 100;
        const _element = new ScrollElement(element);
        const screenOffset = (this.element.size(horizontal) - _element.size(horizontal)) * ratio;
        const elementPosition = _element.offset(horizontal) - this.element.offset(horizontal);
        dist = elementPosition - screenOffset;
      } else {
        console.warn("*element* in scrollToElement function can't be null or undefined");
      }
      return this.scroll.offset(dist, options);
    },
    toPercent: (percent: number, options: IOptions = {}) => {
      const ratio = percent / 100;
      const horizontal = !!options.horizontal;
      const position =
        (this.element.scrollSize(horizontal) - this.element.size(horizontal)) * ratio;
      return this.scroll.toPosition(position, options);
    },
    toPosition: (position: number, options: IOptions = {}) => {
      const horizontal = !!options.horizontal;
      const dist = position - this.element.position(horizontal);
      return this.scroll.offset(dist, options);
    },
    offset: (amount: number, options: IOptions = {}) => {
      return this.animationManager.createScrollAnimation({
        distToScroll: amount,
        duration: options.duration || 0,
        horizontal: options.horizontal || false,
        easing: this.easing,
      });
    },
  };
}

export { Scroll, IOptions, IScrollToElementOptions };
