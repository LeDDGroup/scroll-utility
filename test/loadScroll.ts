import { Scroll } from "../src/scroll";

interface IScrollWindow extends Window {
    divScroll: Scroll;
    Scroll: Scroll;
    scrollable: HTMLElement;
    element: HTMLElement;
    element1: HTMLElement;
}

declare const window: IScrollWindow;

const scrollable = document.getElementById("scrollable");
const element = document.getElementById("element");
const element1 = document.getElementById("element1");
window.divScroll = new Scroll(scrollable);
window.Scroll = new Scroll();
window.scrollable = scrollable;
window.element = element;
window.element1 = element1;

