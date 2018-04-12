import { easing } from "./easings"
import { ICallback } from "./scroll";

export {
    SmoothScroll,
    IProps,
}

interface IProps {
    duration?: number;
    scrollTo: (value: number) => void;
    steps?: number;
    getCurrentPosition: () => number;
}

const STEPS_PER_SECOND = 100;

class SmoothScroll {
    private getCurrentPosition: () => number;
    private lastScrollPosition: number;
    private scrollTo: (value: number) => void;
    private timeouts: number[];
    constructor(props: IProps) {
        this.timeouts = [];
        this.scrollTo = props.scrollTo;
        this.getCurrentPosition = props.getCurrentPosition;
    }
    public go(value: number, duration: number, cb: ICallback, noStop: boolean) {
        this.stop();
        const steps = duration / 1000 * STEPS_PER_SECOND;
        const stepDuration = duration / steps;
        const initialPosition = this.getCurrentPosition();
        this.lastScrollPosition = initialPosition;
        for (let i = 1; i <= steps; i++) {
            const timeout = stepDuration * i;
            const position = this.getNextPosition(i, initialPosition, value, steps);
            const lastStep = i === steps;
            this.timeouts.push(window.setTimeout(() => {
                const scrollPosition = this.getCurrentPosition();
                if (!noStop && this.lastScrollPosition !== scrollPosition) {
                    this.stop();
                } else {
                    this.scrollTo(position);
                    this.lastScrollPosition = this.getCurrentPosition();
                    if (lastStep) {
                        cb();
                    }
                }
            }, timeout));
        }
    }
    public stop() {
        this.timeouts.forEach((timeout: number) => {
            window.clearTimeout(timeout);
        });
    }
    private getNextPosition(currentStep: number, offsetValue: number, distance: number, totalSteps: number) {
        return easing.inOut.cubic(currentStep, offsetValue, distance, totalSteps);
    }
}
