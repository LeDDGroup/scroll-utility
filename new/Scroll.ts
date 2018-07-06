import { Animation as ScrollAnimation } from "./Animation";

export { Scroll };

class Scroll {
  private verticalScrollAnimation: ScrollAnimation[] = [];
  private horizontalScrollAnimation: ScrollAnimation[] = [];
  private scrollChanged: number = 0;
  private animations: number = 0;
  constructor(private element?: HTMLElement) {
    this.onAnimationFrame = this.onAnimationFrame.bind(this);
  }
  public verticalScroll() {
    return {
      toElement: () => null,
      toPercent: () => null,
      do: () => null,
    }
  }
  public horizontalScroll() {
    return {
      toElement: () => null,
      toPercent: () => null,
      do: () => null,
    }
  }
  public scroll() {
    return {
      toElement: () => null,
      toPercent: () => null,
      do: () => null,
    }
  }
  private scrollToElement(element: HTMLElement, horizontal: boolean, duration: number) {
    const distToElement = this.getBounding(horizontal) - this.offset(horizontal);
    this.createScrollAnimation({
      distToScroll: () => distToElement,
      duration,
      horizontal,
    });
  }
  private scrollToPercent(percent: number = 0, horizontal: boolean, duration: number) {
    const dist = ((this.scrollSize(horizontal) - this.size(horizontal)) * percent) / 100 - this.position(horizontal);
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
  private getBounding(horizontal: boolean) {
    return horizontal ?
      this.isWindow ? 0 : element.getBoundingClientRect().left:
    this.isWindow ? 0 : element.getBoundingClientRect().top;
  }
  private scrollSize(horizontal: boolean) {
    return horizontal ?
      this.isWindow ? document.body.clientWidth : this.element.scrollWidth:
    this.isWindow ? document.body.clientHeight : this.element.scrollHeight;
  }
  private size(horizontal: boolean) {
    return horizontal ?
      this.isWindow ? window.innerWidth : this.element.clientWidth:
    this.isWindow ? window.innerHeight : this.element.clientHeight;
  }
  private position(horizontal: boolean) {
    return horizontal ?
      this.isWindow ? window.pageXOffset : this.element.scrollLeft:
    this.isWindow ? window.pageYOffset : this.element.scrollTop;
  }
  private offset(horizontal: boolean) {
    return horizontal ?
      this.isWindow ? 0 : this.element.getBoundingClientRect().left
    :
    this.isWindow ? 0 : this.element.getBoundingClientRect().top;
  }
  private createScrollAnimation(options: {
    distToScroll: () => number;
    duration: number;
    horizontal: boolean;
  }): ScrollAnimation {
    const container = options.horizontal ? this.horizontalScrollAnimation : this.verticalScrollAnimation;
    const index = container.length;
    const animation = new ScrollAnimation({
      distToScroll: options.distToScroll,
      duration: options.duration,
      stop: () => {
        this.scrollChanged -= container[index].distance;
        this.animations--;
        delete container[index];
      },
    });
    container.push(animation);
    if (this.animations === 1) {
      window.requestAnimationFrame(this.onAnimationFrame);
    }
    return animation;
  }
  private onAnimationFrame() {
    if (this.animations === 0) {
      this.scrollChanged = 0;
    } else {
      let distToScroll = 0;
      const scrollPosition = this.y;
      const initial = this.y - this.scrollChanged;
      this.animations.forEach((animation, index) => {
        distToScroll += animation.distance;
      });
      distToScroll += initial;
      this.isWindow ? window.scroll(0, distToScroll) : this.element.scroll(0, distToScroll);
      this.scrollChanged += this.y - scrollPosition;
      window.requestAnimationFrame(this.onAnimationFrame);
    }
    console.log(this.y);
  }
}
