import { InnerElement } from "./innerElement";
import { ScrollElement, IProps as IScrollProps } from "./scrollElement";

export {
    Scroll,
    IProps,
};

interface IProps {
    element?: HTMLElement;
    percent?: number;
    offset?: number;
    duration?: number;
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
            const scrollTop = this.getScrollPosition();
            const value = offset + percent;
            this.scroll(value, duration);
        } else {
            console.warn("props should not be empty, no scroll action will be emitted")
        }
    }
    private scroll(value, duration) {
        this.scrollable.scrollTo(value, duration);
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
            const posTop = scrollPosition + top;
            const windowHeight = this.getHeight();
            const height = innerElement.getHeight();
            const value = (windowHeight - height) * (percent / 100);
            distToScroll = posTop - value;
        } else {
            console.log("hi");
            const documentLength = this.getScrollHeight();
            const windowHeight = this.getHeight();
            distToScroll = (documentLength - windowHeight) * percent / 100;
        }
        return distToScroll;
    }
}
