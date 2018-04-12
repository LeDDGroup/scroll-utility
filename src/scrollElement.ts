import { SmoothScroll } from "./smoothScroll";
import { ICallback, IScrolling } from "./scroll";
import TimeoutManager from "timeout-utility";
import EventManager from "event-utility";

const DURATION = 50;

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
    private isUserScrolling: boolean;
    private isAutoScrolling: boolean;
    private autoScrollTimeout: TimeoutManager;
    private userScrollTimeout: TimeoutManager;
    private eventManager: EventManager;
    constructor(element: HTMLElement) {
        this.getX = this.getX.bind(this);
        this.getY = this.getY.bind(this);
        this.isAutoScrolling = false;
        this.isUserScrolling = false;
        this.scrollByX = this.scrollByX.bind(this);
        this.scrollByY = this.scrollByY.bind(this);
        this.scrollTo = this.scrollTo.bind(this);
        this.scrollToX = this.scrollToX.bind(this);
        this.scrollToY = this.scrollToY.bind(this);
        this.scrollable = element;
        if (!!element) {
            this.isWindow = false;
        } else {
            this.isWindow = true;
        }
        this.smoothScrollX = new SmoothScroll({
            scrollTo: this.scrollToX,
            getCurrentPosition: this.getX,
        });
        this.smoothScrollY = new SmoothScroll({
            scrollTo: this.scrollToY,
            getCurrentPosition: this.getY,
        });
        const scrollableElement = element || window;
        this.eventManager = new EventManager();
        this.autoScrollTimeout = new TimeoutManager({
            cb: () => {
                this.isAutoScrolling = false;
            },
            duration: DURATION,
        });
        this.userScrollTimeout = new TimeoutManager({
            cb: () => {
                this.isUserScrolling = false;
            },
            duration: DURATION,
        });
        this.eventManager.addEvent(scrollableElement, "scroll", () => {
            if (!this.isAutoScrolling) {
                this.isUserScrolling = true;
                this.userScrollTimeout.call();
            }
        });
    }
    private autoScrolled() {
        this.isAutoScrolling = true;
        this.autoScrollTimeout.call();
    }
    public scroll(x: number, y: number, duration: number = 0, cb: ICallback, noStop: boolean) {
        const smooth = duration > 0;
        if (smooth) {
            this.smoothScrollX.go(x, duration, cb, noStop);
            this.smoothScrollY.go(y, duration, cb, noStop);
        } else {
            this.scrollByX(x);
            this.scrollByY(y);
            cb();
        }
    }
    public getScrollSize(horizontal: boolean): number {
        if (horizontal) {
            return this.scrollWidth;
        } else {
            return this.scrollHeight;
        }
    }
    public get isScrolling(): IScrolling {
        const user = this.isUserScrolling;
        const auto = this.isAutoScrolling;
        return {
            user,
            auto,
            any: user || auto,
        };
    }
    private get scrollWidth(): number {
        let scrollWidth = null;
        if (this.isWindow) {
            scrollWidth = document.body.clientWidth;
        } else {
            scrollWidth = this.scrollable.scrollWidth;
        }
        return scrollWidth;
    }
    private get scrollHeight(): number {
        let scrollHeight = null;
        if (this.isWindow) {
            scrollHeight = document.body.clientHeight;
        } else {
            scrollHeight = this.scrollable.scrollHeight;
        }
        return scrollHeight;
    }
    public getSize(horizontal: boolean): number {
        if (horizontal) {
            return this.width;
        } else {
            return this.height;
        }
    }
    private get height(): number {
        let height = null;
        if (this.isWindow) {
            height = window.innerHeight;
        } else {
            height = this.scrollable.clientHeight;
        }
        return height;
    }
    private get width(): number {
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
    public getOffset(horizontal: boolean) {
        if (horizontal) {
            return this.offsetX;
        } else {
            return this.offsetY;
        }
    }
    public stop() {
        this.smoothScrollX.stop();
        this.smoothScrollY.stop();
    }
    private get offsetY() {
        if (this.isWindow) {
            return 0;
        } else {
            return - this.scrollable.getBoundingClientRect().top;
        }
    }
    private get offsetX() {
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
    private scrollToX(x): void {
        const y = this.getY();
        this.scrollTo(x, y);
    }
    private scrollToY(y): void {
        const x = this.getX();
        this.scrollTo(x, y);
    }
    private scrollTo(x, y): void {
        this.autoScrolled();
        if (this.isWindow) {
            window.scroll(x, y);
        } else {
            if (!!this.scrollable.scroll) {
                this.scrollable.scroll(x, y);
            } else {
                this.scrollable.scrollLeft = x;
                this.scrollable.scrollTop = y;
            }
        }
    }
}
