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
    public go(value: number, duration: number, initialPosition) {
        const stepDuration = duration / this.steps;
        for (let i = 1; i <= this.steps; i++) {
            const timeout = stepDuration * i;
            const position = this.getPosition(i, initialPosition, value, this.steps);
            this.timeouts.push(window.setTimeout(() => {
                this.scrollBy(position);
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
    private getPosition(t, b, c, d) {
        t /= d;
        t--;
        return c * (t * t * t + 1) + b;
    }
}
