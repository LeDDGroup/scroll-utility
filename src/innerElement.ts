export {
    InnerElement,
}

class InnerElement {
    private element: HTMLElement;
    constructor(element: HTMLElement) {
        this.element = element;
    }
    public getSize(horizontal: boolean) {
        if (horizontal) {
            return this.width;
        } else {
            return this.height;
        }
    }
    public getPos(horizontal: boolean) {
        if (horizontal) {
            return this.left;
        } else {
            return this.top;
        }
    }
    private get top() {
        return this.rect.top;
    }
    private get left() {
        return this.rect.left;
    }
    private get right() {
        return this.rect.right;
    }
    private get bottom() {
        return this.rect.bottom;
    }
    private get height() {
        return this.bottom - this.top;
    }
    private get width() {
        return this.right - this.left;
    }
    private get rect(): ClientRect {
        return this.element.getBoundingClientRect();
    }
}

