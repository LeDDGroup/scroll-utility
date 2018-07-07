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
    windowScroll.verticalScroll.do(-500, 1000);
  }
  if (ev.key === "ArrowDown") {
    windowScroll.verticalScroll.do(500, 1000);
  }
}

const scrollable = document.getElementById("scrollable");
const element = document.getElementById("element");
const element1 = document.getElementById("element1");
windowScroll.scroll.toElement(element1, 1000)
const elementScroll = new Scroll(scrollable);
elementScroll.scroll.toElement(element, 1000);
