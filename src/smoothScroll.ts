export {
    SmoothScroll,
    IProps,
}

interface IProps {
    duration?: number;
    scrollBy?: (value: number) => void;
    steps?: number;
}

const STEPS = 50;
const DURATION = 750;

const EASING = 10;

class SmoothScroll {
    private steps: number;
    private duration: number;
    private scrollBy: (value: number) => void;
    private timeouts: number[];
    private cb: (() => void)[];
    constructor(props: IProps = {}) {
        this.scrollBy = props.scrollBy || SmoothScroll.navigateWindow;
        this.duration = props.duration || DURATION;
        this.steps = props.steps || STEPS;
        this.timeouts = [];
    }
    public go(value: number) {
        const stepDistance = value / this.steps;
        const stepDuration = this.duration / this.steps;
        for (let i = 0; i < this.steps; i++) {
            const multiplier = this.getMultiplier(i, this.steps);
            const timeout = stepDuration * i;
            this.timeouts.push(window.setTimeout(() => {
                this.scrollBy(stepDistance * multiplier);
            }, timeout));
        }
    }
    public stop() {
        this.timeouts.forEach((timeout: number) => {
            window.clearTimeout(timeout);
        });
    }
    private static navigateWindow(value: number) {
        const dist = value + window.pageXOffset;
        window.scrollBy(window.pageXOffset, dist);
    }
    private getMultiplier(current: number, total: number): number {
        const half = total / 2;
        const distToHalf = Math.abs(half - current);
        const basicMultiplier = Math.abs(half - distToHalf) / half + 0.5;
        const multiplier = (((basicMultiplier - 1) * EASING) * 2 + EASING) / EASING;
        return multiplier;
    }
}
