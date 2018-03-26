import { easing } from "./easings"

export {
    SmoothScroll,
    IProps,
}

interface IProps {
    duration?: number;
    scrollTo?: (value: number) => void;
    steps?: number;
}

const STEPS = 50;

class SmoothScroll {
    private steps: number;
    private scrollTo: (value: number) => void;
    private timeouts: number[];
    constructor(props: IProps = {}) {
        this.scrollTo = props.scrollTo || SmoothScroll.navigateWindow;
        this.steps = props.steps || STEPS;
        this.timeouts = [];
    }
    public go(value: number, duration: number, initialPosition) {
        const stepDuration = duration / this.steps;
        for (let i = 1; i <= this.steps; i++) {
            const timeout = stepDuration * i;
            const position = this.getPosition(i, initialPosition, value, this.steps);
            this.timeouts.push(window.setTimeout(() => {
                this.scrollTo(position);
            }, timeout));
        }
    }
    public stop() {
        this.timeouts.forEach((timeout: number) => {
            window.clearTimeout(timeout);
        });
    }
    private static navigateWindow(value: number) {
        window.scroll(window.pageXOffset, value);
    }
    private getPosition(currentStep: number, offsetValue: number, distance: number, totalSteps: number) {
        return easing.inOut.cubic(currentStep, offsetValue, distance, totalSteps);
    }
}
