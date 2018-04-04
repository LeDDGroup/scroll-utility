import { Scroll } from "../../src/scroll";

export = Scroll;

const scrollable = document.getElementById("scrollable");
const element = document.getElementById("element");
const windowScroll = new Scroll();
const scroll = new Scroll(scrollable);

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
