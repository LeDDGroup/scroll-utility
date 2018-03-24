import { InnerElement } from "./innerElement";
import { ScrollElement, IProps as IScrollProps } from "./scrollElement";

export {
    Scroll,
    IProps,
    IBasicModifiers,
};

interface IProps extends IBasicModifiers {
    center?: boolean;
}

interface IBasicModifiers {
    value?: number;
    duration?: number;
}

class Scroll {
    private scrollable: ScrollElement;
    constructor(scrollable?: HTMLElement) {
        this.scrollable = new ScrollElement(scrollable);
    }
    public scrollToElement(element: HTMLElement, props: IProps = {}) {
        const distToScroll = this.getDistToElement(element, props);
        const duration = props.duration;
        this.scrollAmount(distToScroll, duration);
    }
    public scrollToStart(props: IBasicModifiers = {}) {
        const value = -this.getScrollPosition();
        this.scrollAmount(value, props.duration);
    }
    public scrollToEnd(props: IBasicModifiers = {}) {
        const documentLength = this.getScrollHeight();
        const scrollPosition = this.getScrollPosition();
        const value = documentLength - scrollPosition;
        this.scrollAmount(value, props.duration);
    }
    public scroll(value: number = 0, duration: number = 0) {
        this.scrollAmount(value, duration);
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
    private getDistToElement(element: HTMLElement, props) {
        let distToScroll = 0;
        if (element) {
            const innerElement = new InnerElement(element);
            distToScroll = innerElement.getTop();
            if (props) {
                if (!!props.center) {
                    distToScroll = innerElement.getMiddle();
                }
                if (!!props.value) {
                    distToScroll += props.value;
                }
            }
        }
        return distToScroll;
    }
}
