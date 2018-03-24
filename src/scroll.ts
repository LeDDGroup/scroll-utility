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
    // public scrollToElement(element: HTMLElement, props: IProps = {}) {
    //     const distToScroll = this.getDistToElement(element, props);
    //     const duration = props.duration;
    //     this.scrollAmount(distToScroll, duration);
    // }
    // public scrollToStart(props: IBasicModifiers = {}) {
    //     const value = -this.getScrollPosition();
    //     this.scrollAmount(value, props.duration);
    // }
    // public scrollToEnd(props: IBasicModifiers = {}) {
    //     const documentLength = this.getScrollHeight();
    //     const scrollPosition = this.getScrollPosition();
    //     const value = documentLength - scrollPosition;
    //     this.scrollAmount(value, props.duration);
    // }
    public scrollTo(props: IProps) {
        if (!!props) {
            const distToElement = this.getDistToElement(props.element);
            const offset = props.offset || 0;
            const percent = this.getPercentScroll(props.percent, props.element);
            const value = distToElement + offset + percent;
            const duration = props.duration || 0;
            this.scrollAmount(value, duration);
        } else {
            console.warn("props should not be empty, no scroll action will be emitted")
        }
    }
    private scrollAmount(value, duration) {
        this.scrollable.scroll(value, duration);
    }
    private getScrollPosition(): number {
        const scrollPosition = this.scrollable.getY();
        return scrollPosition;
    }
    private getScrollHeight(): number {
        const scrollHeight = this.scrollable.getHeight();
        return scrollHeight;
    }
    private getDistToElement(element: HTMLElement) {
        let distToScroll = 0;
        if (element) {
            const innerElement = new InnerElement(element);
            distToScroll = innerElement.getTop();
        }
        return distToScroll;
    }
    private getPercentScroll(percent: number = 0, element: HTMLElement) {
        let distToScroll = 0;
        if (element) {
            const innerElement = new InnerElement(element);
            distToScroll = innerElement.getPercentScroll(percent);
        } else {
            distToScroll = this.scrollable.getPercentScroll(percent);
        }
        return distToScroll;
    }
}
