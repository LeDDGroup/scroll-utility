import { Scroll } from "../src/scroll";


//inner element
const scrollable = document.getElementById("scrollable");
const scrollTo = document.getElementById("element1");
const scroll = new Scroll();
const props = {
    center: true,
    value: 20,
    smooth: true,
}

scroll.scrollToElement(scrollTo, props);
