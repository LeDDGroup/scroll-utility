export {
    InnerElement,
}

class InnerElement {
    private element: HTMLElement;
    constructor(element: HTMLElement) {
        this.element = element;
    }
    public getMiddle() {
        return this.middleY - this.windowHeight / 2;
    }
    public getTop() {
        return this.top;
    }
    private get top() {
        return this.rect.top;
    }
    private get left() {
        return this.rect.left;
    }
    private get bottom() {
        return this.rect.bottom;
    }
    private get right() {
        return this.rect.right;
    }
    private get height() {
        return this.bottom - this.top;
    }
    private get width() {
        return this.right - this.left;
    }
    private get middleX() {
        return (this.rect.left + this.rect.right) / 2;
    }
    private get middleY() {
        return (this.rect.top + this.rect.bottom) / 2;
    }
    private get rect(): ClientRect {
        return this.element.getBoundingClientRect();
    }
    private get windowHeight(): number {
        return window.innerHeight;
    }
}
