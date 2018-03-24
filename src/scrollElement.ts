import { SmoothScroll, IProps as ISmoothProps } from "./smoothScroll";

export {
    IProps,
    ScrollElement,
}

interface IProps {
    duration?: number;
    steps?: number;
    smooth?: boolean;
}

class ScrollElement {
    private scrollable: HTMLElement;
    private isWindow: boolean;
    private smoothScroll: SmoothScroll;
    constructor(element: HTMLElement) {
        this.scrollBy = this.scrollBy.bind(this);
        this.getY = this.getY.bind(this);
        this.getX = this.getX.bind(this);
        this.scrollable = element;
        if (!!element) {
            this.isWindow = false;
        } else {
            this.isWindow = true;
        }
        const props: ISmoothProps = {
            scrollBy: this.scrollBy,
        };
        this.smoothScroll = new SmoothScroll(props);
    }
    public scrollTo(value: number = 0, duration: number) {
        const currentPosition = this.getY();
        const distToScroll = (value - currentPosition);
        this.scroll(distToScroll, duration);
    }
    public scroll(value: number = 0, duration: number = 0) {
        const smooth = duration > 0;
        if (smooth) {
            this.smoothScroll.go(value, duration);
        } else {
            this.scrollBy(value);
        }
    }
    public getScrollHeight(): number {
        let scrollHeight = null;
        if (this.isWindow) {
            scrollHeight = document.body.clientHeight;
        } else {
            scrollHeight = this.scrollable.scrollHeight;
        }
        return scrollHeight;
    }
    public getHeight(): number {
        let height = null;
        if (this.isWindow) {
            height = window.innerHeight;
        } else {
            height = this.scrollable.clientHeight;
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
    private scrollBy(value: number) {
        const x = this.getX();
        const y = this.getY() + value;
        if (this.isWindow) {
            window.scroll(x, y);
        } else {
            this.scrollable.scroll(x, y);
        }
    }
}
