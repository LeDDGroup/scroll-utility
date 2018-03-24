import { ScrollElement } from "./scrollElement";
export {
    Scroll,
};

class Scroll {
    private scrollable: ScrollElement;
    constructor(scrollable?: HTMLElement) {
        this.scrollable = new ScrollElement(scrollable);
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
