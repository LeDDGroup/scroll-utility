import { InnerElement } from "./innerElement";
import { ScrollElement } from "./scrollElement";

export {
    Scroll,
    IProps,
    ICallback,
    IDirection,
    IScrolling,
};

type IDirection = "horizontal" | "vertical" | "both";
type ICallback = () => void
interface IScrolling {
    user: boolean,
    auto: boolean,
    any: boolean,
}

interface IProps {
    element?: HTMLElement;
    percent?: number;
    offset?: number;
    duration?: number;
    cb?: ICallback;
    direction?: IDirection;
    noStop?: boolean;
}

class Scroll {
    private scrollable: ScrollElement;
    constructor(scrollable?: HTMLElement) {
        this.scrollable = new ScrollElement(scrollable);
    }
    public set steps(value: number) {
        // this.scrollable.steps = value;
    }
    public scrollTo(props: IProps) {
        if (!!props) {
            const cb = props.cb || (() => null);
            const noStop = props.noStop || false;
            const direction = props.direction || "vertical";
            const hasX = direction === "horizontal" || direction === "both";
            const hasY = direction === "vertical" || direction === "both";
            const offset = props.offset || 0;
            const percentX = this.getPercentScroll(props.percent, props.element, true);
            const percentY = this.getPercentScroll(props.percent, props.element, false);
            const duration = props.duration || 0;
            const x = hasX ? offset + percentX : 0;
            const y = hasY ? offset + percentY : 0;
            this.scroll(x, y, duration, cb, noStop);
        } else {
            console.warn("props should not be empty, no scroll action will be emitted")
        }
    }
    public get isScrolling(): IScrolling {
        return this.scrollable.isScrolling;
    }
    public stop() {
        this.scrollable.stop();
    }
    private scroll(x: number, y: number, duration = 0, cb: ICallback, noStop: boolean) {
        this.scrollable.scroll(x, y, duration, cb, noStop);
    }
    private getScrollPosition(horizontal: boolean): number {
        if (horizontal) {
            return this.scrollable.getX();
        } else {
            return this.scrollable.getY();
        }
    }
    private getSize(horizontal): number {
        const size = this.scrollable.getSize(horizontal);
        return size;
    }
    private getScrollSize(horizontal): number {
        const scrollSize = this.scrollable.getScrollSize(horizontal);
        return scrollSize;
    }
    private getPercentScroll(percent, element: HTMLElement, horizontal: boolean = false) {
        let distToScroll = 0;
        const windowSize = this.getSize(horizontal);
        if (element) {
            const innerElement = new InnerElement(element);
            const pos = innerElement.getPos(horizontal);
            const offset = this.scrollable.getOffset(horizontal);
            const size = innerElement.getSize(horizontal);
            const value = (windowSize - size) * (percent || 0) / 100;
            distToScroll = pos + offset - value;
        } else {
            if (percent !== null && percent !== undefined) {
                const documentLength = this.getScrollSize(horizontal);
                distToScroll = (documentLength - windowSize) * percent / 100;
                const scrollPosition = this.getScrollPosition(horizontal);
                distToScroll -= scrollPosition;
            }
        }
        return distToScroll;
    }
}
