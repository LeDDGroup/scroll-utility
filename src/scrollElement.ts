import { SmoothScroll, IProps as ISmoothProps } from "./smoothScroll";

export {
    ScrollElement,
}

class ScrollElement {
    private scrollable: HTMLElement;
    private isWindow: boolean;
    private smoothScroll: SmoothScroll;
    constructor(element: HTMLElement) {
        this.scrollBy = this.scrollBy.bind(this);
        if (!!element) {
            this.scrollable = element;
        } else {
            this.isWindow = true;
        }
        const props: ISmoothProps = {
            scrollBy: this.scrollBy,
        };
        this.smoothScroll = new SmoothScroll(props);
    }
    public scroll(value: number, smooth: boolean = false) {
        this.smoothScroll.go(value);
    }
    private scrollBy(value: number) {
        const x = this.getX();
        const y = this.getY() + value;
        if (this.isWindow) {
            window.scroll(x, y);
        } else {
            this.scrollable.scroll(x, y);
        }
    }
    public getHeight(): number {
        let height = null;
        if (this.isWindow) {
            height = document.body.clientHeight;
        } else {
            height = this.scrollable.scrollHeight;
        }
        return height;
    }
    public getX(): number {
        let x = null;
        if (this.isWindow) {
            x = window.pageXOffset;
        } else {
            x = this.scrollable.scrollLeft;
        }
        return x;
    }
    public getY(): number {
        let y = null;
        if (this.isWindow) {
            y = window.pageYOffset;
        } else {
            y = this.scrollable.scrollTop;
        }
        return y;
    }
}
