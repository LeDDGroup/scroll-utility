import { Animation } from "./animation";
import { ScrollElement } from "./element";

function toDirection(horizontal: boolean): "horizontal" | "vertical" {
  return horizontal ? "horizontal" : "vertical";
}

interface IHorizontal<T> {
  vertical: T;
  horizontal: T;
}

interface Point {
  x: number;
  y: number;
}

class AnimationManager {
  private scrollAnimation: IHorizontal<Animation[]> = { vertical: [], horizontal: [] };
  private lastPosition: IHorizontal<number> = { horizontal: 0, vertical: 0 };
  private scrollChanged: IHorizontal<number> = { horizontal: 0, vertical: 0 };
  private animations: number = 0;
  constructor(private element: ScrollElement) {}
  public stopAllAnimations() {
    this.animations = 0;
    this.scrollAnimation = { vertical: [], horizontal: [] };
  }
  public createScrollAnimation(options: {
    distToScroll: () => number;
    duration: number;
    horizontal: boolean;
  }) {
    const duration = !!options.duration ? options.duration : 1;
    this.animations++;
    const direction = toDirection(options.horizontal);
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
    return animation;
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
      this.scrollChanged.horizontal += this.element.position(true) - this.lastPosition.horizontal;
      this.scrollChanged.vertical += this.element.position(false) - this.lastPosition.vertical;
      window.requestAnimationFrame(this.onAnimationFrame);
    }
  };
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
    const direction = toDirection(horizontal);
    this.lastPosition[direction] = this.element.position(horizontal);
    const initial = this.element.position(horizontal) - this.scrollChanged[direction];
    this.scrollAnimation[direction].forEach((animation) => {
      distToScroll += animation.distance;
    });
    distToScroll += initial;
    return distToScroll;
  }
}

export { AnimationManager };
