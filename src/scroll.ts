import { Animation as ScrollAnimation } from "./animation";

export { Scroll };

interface Point {
  x: number;
  y: number;
}

class Scroll {
  private scrollAnimation: {
    vertical: ScrollAnimation[];
    horizontal: ScrollAnimation[];
  } = {
    vertical: [],
    horizontal: [],
  };
  private lastPosition: {
    horizontal: number;
    vertical: number;
  } = {
    horizontal: 0,
    vertical: 0,
  };
  private scrollChanged: {
    horizontal: number;
    vertical: number;
  } = {
    horizontal: 0,
    vertical: 0,
  };
  private animations: number = 0;
  constructor(private element?: HTMLElement) {
    this.onAnimationFrame = this.onAnimationFrame.bind(this);
  }
  public horizontalScroll = this.generalScroll(true, false);
  public verticalScroll = this.generalScroll(false, true);
  public scroll = this.generalScroll(true, true);
  private generalScroll(horizontal: boolean, vertical: boolean) {
    return {
      toElement: (element: HTMLElement, duration: number, center: number = 0) => {
        const animations = [
          horizontal && this.scrollToElement(element, true, duration, center),
          vertical && this.scrollToElement(element, false, duration, center),
        ];
        return animations;
      },
      toPercent: (percent: number, duration: number) => {
        horizontal && this.scrollToPercent(percent, true, duration);
        vertical && this.scrollToPercent(percent, false, duration);
      },
      toPosition: (position: number, duration: number) => {
        horizontal && this.scrollToPosition(position, true, duration);
        vertical && this.scrollToPosition(position, false, duration);
      },
      do: (amount: number, duration: number) => {
        horizontal && this.doScroll(amount, true, duration);
        vertical && this.doScroll(amount, false, duration);
      },
    };
  }
  private scrollToElement(
    element: HTMLElement,
    horizontal: boolean,
    duration: number,
    center: number,
  ) {
    const screenOffset =
      ((this.size(horizontal) - element.getBoundingClientRect()[horizontal ? "width" : "height"]) *
        center) /
      100;
    const distToElement =
      element.getBoundingClientRect()[horizontal ? "left" : "top"] -
      this.offset(horizontal) -
      screenOffset;
    return this.createScrollAnimation({
      distToScroll: () => distToElement,
      duration,
      horizontal,
    });
  }
  private scrollToPercent(percent: number, horizontal: boolean, duration: number) {
    const dist =
      ((this.scrollSize(horizontal) - this.size(horizontal)) * percent) / 100 -
      this.position(horizontal);
    this.createScrollAnimation({
      distToScroll: () => dist,
      duration,
      horizontal,
    });
  }
  private scrollToPosition(position: number, horizontal: boolean, duration: number) {
    const dist = position - this.position(horizontal);
    this.createScrollAnimation({
      distToScroll: () => dist,
      duration,
      horizontal,
    });
  }
  private doScroll(amount, horizontal, duration) {
    this.createScrollAnimation({
      distToScroll: () => amount,
      duration,
      horizontal,
    });
  }
  private get isWindow(): boolean {
    return !this.element;
  }
  private scrollSize(horizontal: boolean) {
    return horizontal
      ? this.isWindow
        ? document.body.clientWidth
        : this.element.scrollWidth
      : this.isWindow
        ? document.body.clientHeight
        : this.element.scrollHeight;
  }
  private size(horizontal: boolean) {
    return horizontal
      ? this.isWindow
        ? window.innerWidth
        : this.element.clientWidth
      : this.isWindow
        ? window.innerHeight
        : this.element.clientHeight;
  }
  private position(horizontal: boolean) {
    return horizontal
      ? this.isWindow
        ? window.pageXOffset
        : this.element.scrollLeft
      : this.isWindow
        ? window.pageYOffset
        : this.element.scrollTop;
  }
  private offset(horizontal: boolean) {
    return horizontal
      ? this.isWindow
        ? 0
        : this.element.getBoundingClientRect().left
      : this.isWindow
        ? 0
        : this.element.getBoundingClientRect().top;
  }
  private createScrollAnimation(options: {
    distToScroll: () => number;
    duration: number;
    horizontal: boolean;
  }) {
    const duration = !!options.duration ? options.duration : 1;
    this.animations++;
    const direction = options.horizontal ? "horizontal" : "vertical";
    const index = this.scrollAnimation[direction].length;
    const animation = new ScrollAnimation({
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
    return animation;
  }
  private onAnimationFrame() {
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
    this.isWindow ? window.scroll(x, y) : this.element.scroll(x, y);
  }
  private get distToScroll(): Point {
    return {
      x: this.getDistToScroll(true),
      y: this.getDistToScroll(false),
    };
  }
  private getDistToScroll(horizontal: boolean): number {
    let distToScroll = 0;
    const direction = horizontal ? "horizontal" : "vertical";
    this.lastPosition[direction] = this.position(horizontal);
    const initial = this.position(horizontal) - this.scrollChanged[direction];
    this.scrollAnimation[direction].forEach((animation, index) => {
      distToScroll += animation.distance;
    });
    distToScroll += initial;
    return distToScroll;
  }
}
