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
        windowScroll.doScroll({
          offset: -500,
          duration: 1000,
        });
    }
    if (ev.key === "ArrowDown") {
      windowScroll.doScroll({
        offset: 500,
        duration: 1000,
      });
    }
}

// const scrollable = document.getElementById("scrollable");
// const divScroll = new Scroll(scrollable);
// divScroll.scrollTo({
//     percent: 0,
//     direction: "horizontal",
// })
// windowScroll.scrollTo({
//     element: scrollable,
//     direction: "both",
// })
