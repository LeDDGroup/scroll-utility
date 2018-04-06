import { SmoothScroll } from "./smoothScroll";
import { ICallback } from "./scroll";
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
    private smoothScrollX: SmoothScroll;
    private smoothScrollY: SmoothScroll;
    constructor(element: HTMLElement) {
        this.scrollByY = this.scrollByY.bind(this);
        this.scrollTo = this.scrollTo.bind(this);
        this.getY = this.getY.bind(this);
        this.getX = this.getX.bind(this);
        this.scrollable = element;
        if (!!element) {
            this.isWindow = false;
        } else {
            this.isWindow = true;
        }
        this.smoothScrollX = new SmoothScroll({
            scrollBy: this.scrollByX,
        });
        this.smoothScrollY = new SmoothScroll({
            scrollBy: this.scrollByY,
        });
    }
    public scroll(x: number, y: number, duration: number = 0, cb: ICallback) {
        const smooth = duration > 0;
        if (smooth) {
            this.smoothScrollX.go(x, duration, cb);
            this.smoothScrollY.go(y, duration, cb);
        } else {
            this.scrollByX(x);
            this.scrollByY(y);
            cb();
        }
    }
    public getScrollWidth(): number {
        let scrollWidth = null;
        if (this.isWindow) {
            scrollWidth = document.body.clientWidth;
        } else {
            scrollWidth = this.scrollable.scrollWidth;
        }
        return scrollWidth;
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
    public getWidth(): number {
        let width = null;
        if (this.isWindow) {
            width = window.innerWidth;
        } else {
            width = this.scrollable.clientWidth;
        }
        return width;
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
    public getOffset() {
        if (this.isWindow) {
            return 0;
        } else {
            return - this.scrollable.getBoundingClientRect().top;
        }
    }
    public getOffsetX() {
        if (this.isWindow) {
            return 0;
        } else {
            return - this.scrollable.getBoundingClientRect().left;
        }
    }
    private scrollByX(value: number) {
        const x = this.getX() + value;
        const y = this.getY();
        this.scrollTo(x, y);
    }
    private scrollByY(value: number) {
        const x = this.getX();
        const y = this.getY() + value;
        this.scrollTo(x, y);
    }
    private scrollTo(x, y): void {
        if (this.isWindow) {
            window.scroll(x, y);
        } else {
            this.scrollable.scroll(x, y);
        }
    }
}
