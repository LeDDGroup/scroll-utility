export {
    Scroll,
};

class Scroll {
    private scrollable: HTMLElement;
    private isWindow: boolean;
    constructor(scrollable?: HTMLElement) {
        if (!!scrollable) {
            this.scrollable = scrollable;
        } else {
            this.isWindow = true;
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
        const horizontalPosition = this.getHorizontalPosition();
        const verticalPosition = this.getScrollTop();
        if (this.isWindow) {
            window.scroll(horizontalPosition, value + verticalPosition);
        } else {
            this.scrollable.scroll(horizontalPosition, value + verticalPosition);
        }
    }
    private getScrollHeight(): number {
        let scrollHeight = null;
        if (this.isWindow) {
            scrollHeight = document.body.clientHeight;
        } else {
            scrollHeight = this.scrollable.scrollHeight;
        }
        return scrollHeight;
    }
    private getScrollPosition(): number {
        const scrollPosition = this.getScrollTop();
        return scrollPosition;
    }
    private getHorizontalPosition(): number {
        let scrollLeft = null;
        if (this.isWindow) {
            scrollLeft = window.pageXOffset;
        } else {
            scrollLeft = this.scrollable.scrollLeft;
        }
        return scrollLeft;
    }
    private getScrollTop(): number {
        let scrollTop = null;
        if (this.isWindow) {
            scrollTop = window.pageYOffset;
        } else {
            scrollTop = this.scrollable.scrollTop;
        }
        return scrollTop;
    }
}
