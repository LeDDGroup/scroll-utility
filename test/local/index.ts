import { Scroll } from "../../src/scroll";

export = Scroll;

const windowScroll = new Scroll();

window.onkeydown = ev => {
  if (
    ev.key === "ArrowUp" ||
    ev.key === "ArrowDown" ||
    ev.key === "ArrowRight" ||
    ev.key === "ArrowLeft"
  ) {
    ev.preventDefault();
  }
};
window.onkeyup = ev => {
  if (ev.key === "ArrowUp") {
    windowScroll.scroll.offset(-500, 1000).horizontal.stop();
  }
  if (ev.key === "ArrowDown") {
    windowScroll.scroll.offset(500, 1000).horizontal.stop();
  }
  if (ev.key === "ArrowLeft") {
    windowScroll.scroll.offset(-500, 1000).vertical.stop();
  }
  if (ev.key === "ArrowRight") {
    windowScroll.scroll.offset(500, 1000).vertical.stop();
  }
};

const scrollable = document.getElementById("scrollable");
const element = document.getElementById("element");
const element1 = document.getElementById("element1");
const animation = windowScroll.scroll.toElement(element1, 5000);
window.setTimeout(() => {
  animation.vertical.stop();
}, 4000);

windowScroll.scroll.offset(100, 1000);
