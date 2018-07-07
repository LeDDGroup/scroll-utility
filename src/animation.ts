import { easing } from "./easings";

export { Animation, ScrollInstanceProps };

interface ScrollInstanceProps {
  duration: number;
  distToScroll: () => number;
  stop: () => void;
}

type DOMHighResTimeStamp = number;

class Animation {
  private initialTime: DOMHighResTimeStamp;
  private active: boolean = true;
  private lastDistanceScrolled: number = 0;
  public readonly api = {
    stop: () => this.stop(),
  }
  constructor(private options: ScrollInstanceProps) {
    this.initialTime = performance.now();
  }
  public get distance(): number {
    if (this.active) {
      const currentTime = performance.now();
      const currentDuration = currentTime - this.initialTime;
      const last = currentDuration >= this.options.duration;
      this.lastDistanceScrolled = last
        ? this.options.distToScroll()
        : easing.inOut.quad(currentDuration, 0, this.options.distToScroll(), this.options.duration);
      if (last) {
        this.stop();
      }
      return this.lastDistanceScrolled;
    }
    return this.lastDistanceScrolled;
  }
  public stop() {
    this.active = false;
    this.options.stop();
  }
  public get isActive() {
    return this.active;
  }
}
