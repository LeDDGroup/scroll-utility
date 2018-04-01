import { InnerElement } from "./innerElement";
import { ScrollElement } from "./scrollElement";


export {
    Scroll,
    IProps,
    ICallback,
};

type ICallback = () => void

interface IProps {
    element?: HTMLElement;
    percent?: number;
    offset?: number;
    duration?: number;
    cb?: ICallback;
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
            const offset = props.offset || 0;
            const percent = this.getPercentScroll(props.percent, props.element);
            const duration = props.duration || 0;
            const value = offset + percent;
            const scrollPosition = this.getScrollPosition();
            const distToScroll = value - scrollPosition;
            this.scroll(distToScroll, duration, props.cb);
        } else {
            console.warn("props should not be empty, no scroll action will be emitted")
        }
    }
    public scrollBy(value, duration?: number, cb?: ICallback) {
        this.scroll(value, duration, cb);
    }
    private scroll(value, duration = 0, cb?: ICallback) {
        cb = cb || (() => null);
        this.scrollable.scroll(value, duration, cb);
    }
    private getScrollPosition(): number {
        const scrollPosition = this.scrollable.getY();
        return scrollPosition;
    }
    private getHeight(): number {
        const scrollHeight = this.scrollable.getHeight();
        return scrollHeight;
    }
    private getScrollHeight(): number {
        const scrollHeight = this.scrollable.getScrollHeight();
        return scrollHeight;
    }
    private getPercentScroll(percent: number = 0, element: HTMLElement) {
        let distToScroll = 0;
        if (element) {
            const innerElement = new InnerElement(element);
            const scrollPosition = this.getScrollPosition();
            const top = innerElement.getTop();
            const offset = this.scrollable.getOffset();
            const posTop = scrollPosition + top + offset;
            const windowHeight = this.getHeight();
            const height = innerElement.getHeight();
            const value = (windowHeight - height) * (percent / 100);
            distToScroll = posTop - value;
        } else {
            const documentLength = this.getScrollHeight();
            const windowHeight = this.getHeight();
            distToScroll = (documentLength - windowHeight) * percent / 100;
        }
        return distToScroll;
    }
}
