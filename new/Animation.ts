import { easing } from "../src/easings";

export { Animation, ScrollInstanceProps };

interface ScrollInstanceProps {
  element?: HTMLElement;
  duration: number;
  distToScroll: () => number;
}

type DOMHighResTimeStamp = number;

class Animation {
  private initialTime: DOMHighResTimeStamp;
  private active: boolean = true;
  constructor(private options: ScrollInstanceProps) {
    this.initialTime = performance.now();
  }
  public get distance(): number {
    if (this.active) {
      const currentTime = performance.now();
      const currentDuration = currentTime - this.initialTime;
      const last = currentDuration >= this.options.duration;
      if (last) {
        this.stop();
        return this.options.distToScroll();
      } else {
        return easing.linear(currentDuration, 0, this.options.distToScroll(), this.options.duration);
      }
    } else {
      return 0;
    }
  }
  public stop() {
    this.active = false;
  }
}
