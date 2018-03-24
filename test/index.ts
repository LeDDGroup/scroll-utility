import { Scroll } from "../src/scroll";


//inner element
const scrollable = document.getElementById("scrollable");
const scroll = new Scroll(scrollable);
scroll.scrollToEnd();
const randomValue = (Math.random() - 0.5) * 200;
scroll.scrollAmount(randomValue);

