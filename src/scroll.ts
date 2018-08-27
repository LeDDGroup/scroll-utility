import { AnimationApi } from "./animation";
import { ScrollElement } from "./element";
import { AnimationManager } from "./animation-manager";

// https://stackoverflow.com/questions/3437786/get-the-size-of-the-screen-current-web-page-and-browser-window

interface IScrollToElementOptions extends IOptions {
  center?: number;
}

interface IOptions {
  duration?: number;
  horizontal?: boolean;
}

class Scroll {
  private element: ScrollElement;
  private animationManager: AnimationManager;
  constructor(element?: HTMLElement | null) {
    this.element = new ScrollElement(element);
    this.animationManager = new AnimationManager(this.element);
  }
  public scroll = {
    toElement: (element: HTMLElement | null, options: IScrollToElementOptions = {}) => {
      if (element) {
        const center = options.center || 0;
        const duration = options.duration || 0;
        const horizontal = !!options.horizontal;
        const ratio = center / 100;
        const _element = new ScrollElement(element);
        const screenOffset = (this.element.size(horizontal) - _element.size(horizontal)) * ratio;
        const elementPosition = _element.offset(horizontal) - this.element.offset(horizontal);
        const distToElement = elementPosition - screenOffset;

        return this.animationManager.createScrollAnimation({
          distToScroll: () => distToElement,
          duration,
          horizontal,
        });
      } else {
        console.warn("*element* in scrollToElement function can't be null or undefined");
      }
    },
    toPercent: (percent: number, options: IOptions = {}) => {
      const ratio = percent / 100;
      const duration = options.duration || 0;
      const horizontal = !!options.horizontal;
      const dist =
        (this.element.scrollSize(horizontal) - this.element.size(horizontal)) * ratio -
        this.element.position(horizontal);
      return this.animationManager.createScrollAnimation({
        distToScroll: () => dist,
        duration,
        horizontal,
      });
    },
    toPosition: (position: number, options: IOptions = {}) => {
      const duration = options.duration || 0;
      const horizontal = !!options.horizontal;
      const dist = position - this.element.position(horizontal);
      return this.animationManager.createScrollAnimation({
        distToScroll: () => dist,
        duration,
        horizontal,
      });
    },
    offset: (amount: number, options: IOptions = {}) => {
      const duration = options.duration || 0;
      const horizontal = !!options.horizontal;
      return this.animationManager.createScrollAnimation({
        distToScroll: () => amount,
        duration,
        horizontal,
      });
    },
  };
}

export { Scroll, AnimationApi as AnimationScroll, IOptions, IScrollToElementOptions };
