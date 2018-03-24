import { InnerElement } from "./innerElement";
import { ScrollElement } from "./scrollElement";

export {
    Scroll,
    IProps,
};

interface IProps {
    center?: boolean;
    value?: number;
    smooth?: boolean;
}

class Scroll {
    private scrollable: ScrollElement;
    constructor(scrollable?: HTMLElement) {
        this.scrollable = new ScrollElement(scrollable);
    }
    public scrollToElement(element: HTMLElement, props: IProps = {}) {
        const distToScroll = this.getDistToElement(element, props);
        const smooth = props.smooth;
        this.scrollAmount(distToScroll, props.smooth);
    }
    public scrollToStart() {
        const value = -this.getScrollPosition();
        this.scrollAmount(value);
    }
    public scrollToEnd() {
        const documentLength = this.getScrollHeight();
        const scrollPosition = this.getScrollPosition();
        const value = documentLength - scrollPosition;
        this.scrollAmount(value);
    }
    public scrollAmount(value: number, smooth: boolean = false) {
        this.scrollable.scroll(value, smooth);
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
