import { ScrollElement } from "./element";
import { AnimationManager } from "./animation-manager";
import { EasingFunction, defaultEasingFunction, IBasicProperties } from "./data";
import { Animation } from "./animation";

interface IScrollToElementOptions extends IOptions {
  center?: number;
}

interface IOptions {
  duration?: number;
  horizontal?: boolean;
}

class Scroll implements IBasicProperties {
  public onScroll: (() => void) | null = null;
  public onUtilityScroll: (() => void) | null = null;
  public onUserScroll: (() => void) | null = null;
  public easing: EasingFunction = defaultEasingFunction;
  private element: ScrollElement;
  private animationManager: AnimationManager;
  private scrolling: boolean = false;
  constructor(element?: HTMLElement | null) {
    this.element = new ScrollElement(element);
    this.animationManager = new AnimationManager(this.element, () => {
      this.scrolling = true;
    });
    this.element.onScroll = () => {
      if (this.scrolling) {
        this.onUtilityScroll && this.onUtilityScroll();
      } else {
        this.onUserScroll && this.onUserScroll();
      }
      this.onScroll && this.onScroll();
      this.scrolling = false;
    };
  }
  public mountOnScroll() {
    this.element.mountOnScroll();
    this.animationManager.mountOnScroll();
  }
  public unmountOnScroll() {
    this.element.unmountOnScroll();
    this.animationManager.unmountOnScroll();
  }
  public stopAllAnimations() {
    this.animationManager.stopAllAnimations();
  }
  public scroll = {
    toElement: (element: HTMLElement | null | undefined, options: IScrollToElementOptions = {}): Animation => {
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
    toPercent: (percent: number, options: IOptions = {}): Animation => {
      const ratio = percent / 100;
      const horizontal = !!options.horizontal;
      const position =
        (this.element.scrollSize(horizontal) - this.element.size(horizontal)) * ratio;
      return this.scroll.toPosition(position, options);
    },
    toPosition: (position: number, options: IOptions = {}): Animation => {
      const horizontal = !!options.horizontal;
      const dist = position - this.element.position(horizontal);
      return this.scroll.offset(dist, options);
    },
    offset: (amount: number, options: IOptions = {}): Animation => {
      return this.animationManager.createScrollAnimation({
        distToScroll: amount,
        duration: options.duration || 0,
        horizontal: options.horizontal || false,
        easing: this.easing,
      });
    },
  };
}

export { Scroll, IOptions, IScrollToElementOptions, Animation };
