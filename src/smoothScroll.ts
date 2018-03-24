export {
    smoothScroll,
}

interface IProps {
    duration?: number;
    scrollTo?: (value: number) => void;
    steps?: number;
}

const STEPS = 50;
const DURATION = 500;

class smoothScroll {
    private steps: number;
    private duration: number;
    private scrollTo: (value: number) => void;
    private timeouts: number[];
    private cb: (() => void)[];
    constructor(props: IProps = {}) {
        this.scrollTo = props.scrollTo || smoothScroll.navigateWindow;
        this.duration = props.duration || DURATION;
        this.steps = props.steps || STEPS;
    }
    public go(value: number) {
    }
    public stop() {
    }
    private static navigateWindow(value: number) {
        const dist = value + window.pageXOffset;
        window.scroll(window.pageXOffset, dist);
    }
}
