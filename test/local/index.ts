import { Scroll } from "../../new/Scroll";

export = Scroll;

const windowScroll = new Scroll();

window.onkeydown = (ev) => {
    if (ev.key === "ArrowUp" || ev.key === "ArrowDown") {
        ev.preventDefault();
    }
};
window.onkeyup = (ev) => {
    if (ev.key === "ArrowUp") {
      windowScroll.verticalScroll().do(-500, 1000);
    }
    if (ev.key === "ArrowDown") {
      windowScroll.verticalScroll().do(500, 1000);
    }
}
