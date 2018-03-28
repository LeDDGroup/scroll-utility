import { Scroll, IProps } from "../src/scroll";
import { getBody } from "./body";


window.onload = () => {
    document.body.innerHTML = getBody();
    const scrollable = document.getElementById("scrollable");
    const scrollElement = document.getElementById("element");
    const scroll = new Scroll(scrollable);
    const props: IProps = {
        element: scrollElement,
        percent: 50,
        duration: 1000,
    }

    const windowScroll = new Scroll();
    scroll.scrollTo(props);
    windowScroll.scrollTo({
        element: scrollable,
        percent: 50,
        duration: 1000,
    });
};
