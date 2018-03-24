export {
    smoothScroll,
}

interface IProps {
    duration?: number;
    scrollBy?: (value: number) => void;
    steps?: number;
}

const STEPS = 50;
const DURATION = 500;

class smoothScroll {
    private steps: number;
    private duration: number;
    private scrollBy: (value: number) => void;
    private timeouts: number[];
    private cb: (() => void)[];
    constructor(props: IProps = {}) {
        this.scrollBy = props.scrollBy || smoothScroll.navigateWindow;
        this.duration = props.duration || DURATION;
        this.steps = props.steps || STEPS;
    }
    public go(value: number) {
        const stepDistance = value / this.steps;
        const stepDuration = this.duration / this.steps;
        for (let i = 0; i < this.steps; i++) {
            this.timeouts.push(window.setTimeout(() => {
                this.scrollBy(stepDistance);
            }, stepDuration))
        }
    }
    public stop() {
        this.timeouts.forEach((timeout: number) => {
            window.clearTimeout(timeout);
        });
    }
    private static navigateWindow(value: number) {
        const dist = value + window.pageXOffset;
        window.scroll(window.pageXOffset, dist);
    }
}
