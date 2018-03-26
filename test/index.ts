import { Scroll, IProps } from "../src/scroll";

const scrollable = document.getElementById("scrollable");
const scrollElement = document.getElementById("element");
const scroll = new Scroll(scrollable);
const props: IProps = {
    element: scrollElement,
    percent: 100,
    duration: 1000,
}

scroll.scrollTo(props);
