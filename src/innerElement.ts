export {
    InnerElement,
}

class InnerElement {
    private element: HTMLElement;
    constructor(element: HTMLElement) {
        this.element = element;
    }
    public getHeight() {
        return this.height;
    }
    public getTop() {
        return this.top;
    }
    private get top() {
        return this.rect.top;
    }
    private get bottom() {
        return this.rect.bottom;
    }
    private get height() {
        return this.bottom - this.top;
    }
    private get rect(): ClientRect {
        return this.element.getBoundingClientRect();
    }
}
