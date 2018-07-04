import { easing } from "../src/easings";

export {
  ScrollInstance,
  ScrollInstanceProps,
}

interface ScrollInstanceProps {
  duration: number;
  distToScroll: () => number;
}

type DOMHighResTimeStamp = number;

class ScrollInstance {
  private initialTime: DOMHighResTimeStamp;
  constructor(private options: ScrollInstanceProps) {
    this.scroll = this.scroll.bind(this)
    this.initialTime = performance.now();
    window.requestAnimationFrame(scroll);
  }
  private scroll() {
    const currentTime = performance.now();
    const currentDuration = currentTime - this.initialTime;
    if (currentDuration >= this.options.duration) {
      easing.linear(this.options.duration, 0, this.options.distToScroll(), this.options.duration);
    } else {
      easing.linear(currentDuration, 0, this.options.distToScroll(), this.options.duration);
      window.requestAnimationFrame(scroll);
    }
  }
}
