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
        const value = this.getScrollPosition();
        this.scrollable.scrollBy(0, -value);
    }
    public scrollToEnd() {
        const documentLength = this.getScrollHeight();
        const scrollPosition = this.getScrollPosition();
        const value = documentLength - scrollPosition;
        this.scrollable.scrollBy(0, value);
    }
    public dist(value: number) {
        this.scrollable.scrollBy(0, value);
    }
    private getScrollHeight(): number {
        return this.scrollable.scrollHeight;
    }
    private getScrollPosition(): number {
        return this.scrollable.scrollTop;
    }
}
