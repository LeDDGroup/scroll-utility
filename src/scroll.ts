import { Animation, AnimationApi } from "./animation";
import { ScrollElement } from "./element";

export { Scroll, AnimationApi as AnimationScroll, IOptions, IScrollToElementOptions };

function toDirection(horizontal: boolean): "horizontal" | "vertical" {
  return horizontal ? "horizontal" : "vertical";
}

interface IHorizontal<T> {
  vertical: T;
  horizontal: T;
}

// https://stackoverflow.com/questions/3437786/get-the-size-of-the-screen-current-web-page-and-browser-window

interface IScrollToElementOptions extends IOptions {
  center?: number;
}

interface IOptions {
  duration?: number;
  horizontal?: boolean;
}

interface Point {
  x: number;
  y: number;
}

class Scroll {
  private element: ScrollElement;
  private scrollAnimation: IHorizontal<Animation[]> = {vertical: [], horizontal: []};
  private lastPosition: IHorizontal<number> = {horizontal: 0, vertical: 0};
  private scrollChanged: IHorizontal<number> = {horizontal: 0, vertical: 0};
  private animations: number = 0;
  constructor(element?: HTMLElement | null) {
    this.element = new ScrollElement(element);
  }
  public scroll = {
    toElement: (element: HTMLElement, options: IScrollToElementOptions = {}) => this.scrollToElement(element, options) ,
    toPercent: (percent: number, options: IOptions = {}) => this.scrollToPercent(percent, options),
    toPosition: (position: number, options: IOptions = {}) => this.scrollToPosition(position, options),
    offset: (amount: number, options: IOptions = {}) => this.doScroll(amount, options),
  };
  public stopAllAnimations() {
    this.animations = 0;
    this.scrollAnimation = {vertical: [], horizontal: []};
  }
  private scrollToElement(
    elementToScroll: HTMLElement,
    options: IScrollToElementOptions,
  ) {
    const center = options.center || 0;
    const duration = options.duration || 0;
    const horizontal = !!options.horizontal;
    const ratio = center / 100;
    const element = new ScrollElement(elementToScroll);
    const screenOffset = (this.size(horizontal) - element.size(horizontal)) * ratio;
    const elementPosition = element.offset(horizontal) - this.offset(horizontal);
    const distToElement = elementPosition - screenOffset;

    return this.createScrollAnimation({
      distToScroll: () => distToElement,
      duration,
      horizontal,
    });
  }
  private scrollToPercent(percent: number, options: IOptions) {
    const ratio = percent / 100;
    const duration = options.duration || 0;
    const horizontal = !!options.horizontal;
    const dist =
      ((this.scrollSize(horizontal) - this.size(horizontal))) * ratio - this.position(horizontal);
    return this.createScrollAnimation({
      distToScroll: () => dist,
      duration,
      horizontal,
    });
  }
  private scrollToPosition(position: number, options: IOptions) {
    const duration = options.duration || 0;
    const horizontal = !!options.horizontal;
    const dist = position - this.position(horizontal);
    return this.createScrollAnimation({
      distToScroll: () => dist,
      duration,
      horizontal,
    });
  }
  private doScroll(amount: number, options: IOptions) {
    const duration = options.duration || 0;
    const horizontal = !!options.horizontal;
    return this.createScrollAnimation({
      distToScroll: () => amount,
      duration,
      horizontal,
    });
  }
  private scrollSize(horizontal: boolean) {
    return this.element.scrollSize(horizontal);
  }
  private size(horizontal: boolean) {
    return this.element.size(horizontal);
  }
  private position(horizontal: boolean) {
    return this.element.position(horizontal);
  }
  private offset(horizontal: boolean) {
    return this.element.offset(horizontal);
  }
  private createScrollAnimation(options: {
    distToScroll: () => number;
    duration: number;
    horizontal: boolean;
  }) {
    const duration = !!options.duration ? options.duration : 1;
    this.animations++;
    const direction = toDirection(!!options.horizontal);
    const index = this.scrollAnimation[direction].length;
    const animation = new Animation({
      distToScroll: options.distToScroll,
      duration,
      stop: () => {
        this.scrollChanged[direction] -= this.scrollAnimation[direction][index].distance;
        this.animations--;
        delete this.scrollAnimation[direction][index];
      },
    });
    this.scrollAnimation[direction].push(animation);
    if (this.animations === 1) {
      window.requestAnimationFrame(this.onAnimationFrame);
    }
    return animation.api;
  }
  private onAnimationFrame = () => {
    if (this.animations === 0) {
      this.scrollChanged = {
        horizontal: 0,
        vertical: 0,
      };
    } else {
      const distToScroll = this.distToScroll;
      this.scrollTo(distToScroll.x, distToScroll.y);
      this.scrollChanged.horizontal += this.position(true) - this.lastPosition.horizontal;
      this.scrollChanged.vertical += this.position(false) - this.lastPosition.vertical;
      window.requestAnimationFrame(this.onAnimationFrame);
    }
  }
  private scrollTo(x: number, y: number) {
    this.element.scrollTo(Math.round(x), Math.round(y));
  }
  private get distToScroll(): Point {
    return {
      x: this.getDistToScroll(true),
      y: this.getDistToScroll(false),
    };
  }
  private getDistToScroll(horizontal: boolean): number {
    let distToScroll = 0;
    const direction = toDirection(!!horizontal);
    this.lastPosition[direction] = this.position(horizontal);
    const initial = this.position(horizontal) - this.scrollChanged[direction];
    this.scrollAnimation[direction].forEach((animation) => {
      distToScroll += animation.distance;
    });
    distToScroll += initial;
    return distToScroll;
  }
}
