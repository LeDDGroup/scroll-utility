export {
    Scroll,
};

class Scroll {
    public scrollToStart() {
        const value = -window.scrollY;
        window.scrollBy(0, value);
    }
    public scrollToEnd() {
        const documentLength = this.getScrollHeight();
        const scrollPosition = this.getScrollPosition();
        const value = documentLength - scrollPosition;
        window.scrollBy(0, value);
    }
    public dist(value: number) {
        window.scrollBy(0, value);
    }
    private getScrollHeight(): number {
        return document.body.scrollHeight;
    }
    private getScrollPosition(): number {
        return window.scrollY;
    }
}
