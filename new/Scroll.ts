import { Animation as ScrollAnimation } from "./Animation";

export { Scroll, IOptions };

interface IOptions {
  offset?: number;
  duration?: number;
}

class Scroll {
  private animations: ScrollAnimation[] = [];
  private scrollChanged: number = 0;
  constructor(private element?: HTMLElement) {
    this.onAnimationFrame = this.onAnimationFrame.bind(this);
  }
  public scrollToElement(element: HTMLElement, options?: IOptions) {
    const offset = options.offset || 0;
    const distToElement = element.getBoundingClientRect().top - this.top + offset;
    this.createScrollAnimation({
      distToScroll: () => distToElement,
      duration: options.duration,
    });
  }
  public scrollToPercent(percent: number = 0, options?: IOptions) {
    const offset = options.offset || 0;
    const dist = ((this.scrollHeight - this.height) * percent) / 100 - this.y + offset;
    this.createScrollAnimation({
      distToScroll: () => dist,
      duration: options.duration,
    });
  }
  public doScroll(options: IOptions) {
    this.createScrollAnimation({
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
  private createScrollAnimation(options: {
    distToScroll: () => number;
    duration: number;
  }): ScrollAnimation {
    const firstAnimation = this.animations.every(() => false);
    const index = this.animations.length;
    const animation = new ScrollAnimation({
      distToScroll: options.distToScroll,
      duration: options.duration,
      stop: () => {
        this.scrollChanged -= this.animations[index].distance;
        delete this.animations[index];
      },
    });
    this.animations.push(animation);
    if (firstAnimation) {
      window.requestAnimationFrame(this.onAnimationFrame);
    }
    return animation;
  }
  private get isWindow(): boolean {
    return !this.element;
  }
  private onAnimationFrame() {
    let distToScroll = 0;
    const scrollPosition = this.y;
    const initial = this.y - this.scrollChanged;
    if (this.animations.every(() => false)) {
      this.scrollChanged = 0;
    } else {
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
