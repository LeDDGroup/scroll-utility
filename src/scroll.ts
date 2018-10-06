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
  public scrollToElement(
    element: HTMLElement | null | undefined,
    options: IScrollToElementOptions = {},
  ) {
    const dist = this.element.distanceTo.element(
      new ScrollElement(element),
      options.center || 0,
      !!options.horizontal,
    );
    return this.scrollBy(dist, options);
  }
  public scrollToPercent(percent: number, options: IOptions = {}) {
    const dist = this.element.distanceTo.percent(percent, !!options.horizontal);
    return this.scrollBy(dist, options);
  }
  public scrollToPosition(position: number, options: IOptions = {}) {
    const dist = this.element.distanceTo.position(position, !!options.horizontal);
    return this.scrollBy(dist, options);
  }
  public scrollBy(amount: number, options: IOptions = {}) {
    return this.animationManager.createScrollAnimation({
      distToScroll: amount,
      duration: options.duration || 0,
      horizontal: options.horizontal || false,
      easing: this.easing,
    });
  }
}

export { Scroll, IOptions, IScrollToElementOptions, Animation };
