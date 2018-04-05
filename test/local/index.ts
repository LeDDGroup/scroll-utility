import { Scroll } from "../../src/scroll";

export = Scroll;

const windowScroll = new Scroll();

window.onkeydown = (ev) => {
    if (ev.key === "ArrowUp" || ev.key === "ArrowDown") {
        ev.preventDefault();
    }
};
window.onkeyup = (ev) => {
    if (ev.key === "ArrowUp") {
        windowScroll.scrollTo({
            offset: -100,
            duration: 1000,
        });
    }
    if (ev.key === "ArrowDown") {
        windowScroll.scrollTo({
            offset: 100,
            duration: 1000,
        });
    }
}
