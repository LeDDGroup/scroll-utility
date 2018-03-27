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

const STEPS_PER_SECOND = 100;

class SmoothScroll {
    private scrollTo: (value: number) => void;
    private timeouts: number[];
    constructor(props: IProps = {}) {
        this.scrollTo = props.scrollTo || SmoothScroll.navigateWindow;
        this.timeouts = [];
    }
    public go(value: number, duration: number, initialPosition) {
        const steps = duration / 1000 * STEPS_PER_SECOND;
        const stepDuration = duration / steps;
        for (let i = 1; i <= steps; i++) {
            const timeout = stepDuration * i;
            const position = this.getPosition(i, initialPosition, value, steps);
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
