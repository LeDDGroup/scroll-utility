import { Scroll } from "../src/scroll";

interface IScrollWindow extends Window {
    Scroll,
}

declare const window: IScrollWindow;

window.Scroll = Scroll;
