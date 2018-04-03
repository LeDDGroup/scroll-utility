import { Scroll } from "../../src/scroll";

export = Scroll;

const scrollable = document.getElementById("scrollable");
const element = document.getElementById("element");
const windowScroll = new Scroll();
windowScroll.scrollTo({
    offset: -200,
    element: scrollable,
    duration: 1000,
})
const scroll = new Scroll(scrollable);
scroll.scrollTo({
    element: element,
    duration: 1000,
})

window.setTimeout(() => {
    console.log(window.pageYOffset);
}, 1002);
