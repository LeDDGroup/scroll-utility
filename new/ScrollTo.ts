import { easing } from "../src/easings";

export {
  ScrollInstance,
  ScrollInstanceProps,
}

interface ScrollInstanceProps {
  element?: HTMLElement;
  duration: number;
  distToScroll: () => number;
}

type DOMHighResTimeStamp = number;

class ScrollInstance {
  private initialTime: DOMHighResTimeStamp;
  private element: HTMLElement;
  private isWindow: boolean;
  private initialPosition: number;
  constructor(private options: ScrollInstanceProps) {
    this.element = options.element;
    this.isWindow = !options.element;
    this.scroll = this.scroll.bind(this)
    this.scroll = this.scroll.bind(this)
    this.initialTime = performance.now();
    this.initialPosition = this.isWindow ? window.pageYOffset : this.element.scrollTop;
    window.requestAnimationFrame(this.scroll);
  }
  private scroll() {
    const currentTime = performance.now();
    const currentDuration = currentTime - this.initialTime;
    if (currentDuration < this.options.duration) {
      const distToScroll = easing.linear(currentDuration, 0, this.options.distToScroll(), this.options.duration)
      this.doScroll(distToScroll);
      window.requestAnimationFrame(this.scroll);
    } else {
      const distToScroll = easing.linear(this.options.duration, 0, this.options.distToScroll(), this.options.duration)
      this.doScroll(distToScroll);
    }
  }
  private doScroll(distance: number) {
    this.isWindow ? window.scroll(0, distance + this.initialPosition) : this.element.scroll(0, distance + this.initialPosition);
  }
}
