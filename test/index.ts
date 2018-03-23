import { Scroll } from "../src/scroll";

const scrollable = document.getElementById("scrollable");
const scroll = new Scroll(scrollable);

scroll.scrollToEnd();
