import { InnerElement } from "./innerElement";
import { ScrollElement } from "./scrollElement";

export {
    Scroll,
    IProps,
    ICallback,
    IDirection,
};

type IDirection = "horizontal" | "vertical" | "both";
type ICallback = () => void

interface IProps {
    element?: HTMLElement;
    percent?: number;
    offset?: number;
    duration?: number;
    cb?: ICallback;
    direction?: IDirection;
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
            const direction = props.direction || "vertical";
            const hasX = direction === "horizontal" || direction === "both";
            const hasY = direction === "vertical" || direction === "both";
            const offset = props.offset || 0;
            const percentX = this.getPercentScrollX(props.percent, props.element);
            const percentY = this.getPercentScrollY(props.percent, props.element);
            const duration = props.duration || 0;
            const x = hasX ? offset + percentX : 0;
            const y = hasY ? offset + percentY : 0;
            this.scroll(x, y, duration, props.cb);
        } else {
            console.warn("props should not be empty, no scroll action will be emitted")
        }
    }
    private scroll(x: number, y: number, duration = 0, cb?: ICallback) {
        cb = cb || (() => null);
        this.scrollable.scroll(x, y, duration, cb);
    }
    private getScrollPosition(): number {
        const scrollPosition = this.scrollable.getY();
        return scrollPosition;
    }
    private getXScrollPosition(): number {
        const scrollPosition = this.scrollable.getX();
        return scrollPosition;
    }
    private getHeight(): number {
        const height = this.scrollable.getHeight();
        return height;
    }
    private getWidth(): number {
        const width = this.scrollable.getWidth();
        return width;
    }
    private getScrollHeight(): number {
        const scrollHeight = this.scrollable.getScrollHeight();
        return scrollHeight;
    }
    private getScrollWidth(): number {
        const scrollWidth = this.scrollable.getScrollWidth();
        return scrollWidth;
    }
    private getPercentScrollY(percent, element: HTMLElement) {
        let distToScroll = 0;
        const windowHeight = this.getHeight();
        if (element) {
            const innerElement = new InnerElement(element);
            const top = innerElement.getTop();
            const offset = this.scrollable.getOffset();
            const posTop = top + offset;
            const height = innerElement.getHeight();
            const value = (windowHeight - height) * (percent || 0) / 100;
            distToScroll = posTop - value;
        } else {
            if (percent !== null && percent !== undefined) {
                const documentLength = this.getScrollHeight();
                distToScroll = (documentLength - windowHeight) * percent / 100;
                const scrollPosition = this.getScrollPosition();
                distToScroll -= scrollPosition;
            }
        }
        return distToScroll;
    }
    private getPercentScrollX(percent, element: HTMLElement) {
        let distToScroll = 0;
        const windowWidth = this.getWidth();
        if (element) {
            const innerElement = new InnerElement(element);
            const left = innerElement.getLeft();
            const offset = this.scrollable.getOffsetX();
            const posLeft = left + offset;
            const width = innerElement.getWidth();
            const value = (windowWidth - width) * (percent || 0) / 100;
            distToScroll = posLeft - value;
        } else {
            if (percent !== null && percent !== undefined) {
                const documentLength = this.getScrollWidth();
                distToScroll = (documentLength - windowWidth) * percent / 100;
                const scrollPosition = this.getXScrollPosition();
                distToScroll -= scrollPosition;
            }
        }
        return distToScroll;
    }
}
