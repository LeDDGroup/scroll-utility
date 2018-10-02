export { Animation, ScrollInstanceProps, EasingFunction };

interface ScrollInstanceProps {
  duration: number;
  distToScroll: () => number;
  stop: () => void;
}

type EasingFunction = (
  currentStep: number,
  offsetValue: number,
  distance: number,
  totalSteps: number,
) => number;

type DOMHighResTimeStamp = number;

class Animation {
  private initialTime: DOMHighResTimeStamp;
  private active: boolean = true;
  private lastDistanceScrolled: number = 0;
  public easingFunction: EasingFunction = Animation.EasingFunction;
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
        : this.easingFunction(
            currentDuration,
            0,
            this.options.distToScroll(),
            this.options.duration,
          );
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
  private static EasingFunction(
    currentStep: number,
    offsetValue: number,
    distance: number,
    totalSteps: number,
  ) {
    currentStep /= totalSteps / 2;
    if (currentStep < 1) return (distance / 2) * currentStep * currentStep + offsetValue;
    currentStep--;
    return (-distance / 2) * (currentStep * (currentStep - 2) - 1) + offsetValue;
  }
}
