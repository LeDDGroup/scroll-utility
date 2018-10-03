export { Animation, ScrollInstanceProps, EasingFunction };

interface ScrollInstanceProps {
  duration: number;
  distToScroll: number;
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
  public easingFunction: EasingFunction = Animation.EasingFunction;
  constructor(private options: ScrollInstanceProps) {
    this.initialTime = performance.now();
  }
  public get distance(): number {
    return this.isPastAnimation()
      ? this.options.distToScroll
      : this.easingFunction(
          this.currentDuration,
          0,
          this.options.distToScroll,
          this.options.duration,
        );
  }
  public isPastAnimation(): boolean {
    return this.currentDuration >= this.options.duration;
  }
  public stop() {
    this.active = false;
  }
  public get isActive() {
    return this.active;
  }
  private get currentDuration() {
    return performance.now() - this.initialTime;
  }
  public static EasingFunction(
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
