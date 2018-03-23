export {
    Scroll,
};

class Scroll {
    private scrollable: HTMLElement;
    constructor(scrollable?: HTMLElement) {
        if (!!scrollable) {
            this.scrollable = scrollable;
        } else {
            this.scrollable = document.body;
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
        this.scrollable.scrollBy(0, value);
    }
    private getScrollHeight(): number {
        const scrollHeight = this.scrollable.scrollHeight;
        return scrollHeight;
    }
    private getScrollPosition(): number {
        const scrollPosition = this.scrollable.scrollTop;
        return scrollPosition;
    }
}
