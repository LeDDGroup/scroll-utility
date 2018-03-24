import { ScrollElement } from "./scrollElement";
import { InnerElement } from "./innerElement";
export {
    Scroll,
    IProps,
};

interface IProps {
    center?: boolean;
    value?: number;
}

class Scroll {
    private scrollable: ScrollElement;
    constructor(scrollable?: HTMLElement) {
        this.scrollable = new ScrollElement(scrollable);
    }
    public scrollToElement(element: HTMLElement, props?: IProps) {
        const distToScroll = this.getDistToElement(element, props);
        this.scrollAmount(distToScroll);
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
    public scrollAmount(value: number) {
        this.scrollable.scroll(value);
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
