import { Scroll } from "../src/scroll";

interface IScrollWindow extends Window {
    divScroll: Scroll;
    Scroll: Scroll;
    scrollable: HTMLElement;
}

declare const window: IScrollWindow;

const scrollable = document.getElementById("scrollable");
window.divScroll = new Scroll(scrollable);
window.Scroll = new Scroll();
window.scrollable = scrollable;
