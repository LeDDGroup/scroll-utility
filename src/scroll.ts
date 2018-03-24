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
        if (element) {
            const innerElement = new InnerElement(element);
            let distToScroll = innerElement.getTop();
            if (props) {
                if (!!props.center) {
                    distToScroll = innerElement.getMiddle();
                }
                if (!!props.value) {
                    distToScroll += props.value;
                }
            }
            this.scrollable.scroll(distToScroll);
        }
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
}
