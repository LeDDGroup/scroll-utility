import {
	getScrollPosition,
	getScrollSize,
	scroll,
	getElementFromQuery
} from "./misc";
import { ScrollContainer, EasingFunction } from "./ScrollContainer";

// default easing function
function easeInOutQuad(t: number, b: number, c: number, d: number) {
	if ((t /= d / 2) < 1) return (c / 2) * t * t + b;
	return (-c / 2) * (--t * (t - 2) - 1) + b;
}
const defaultEasing = easeInOutQuad;

function getScrollContainer(element, horizontal, onScroll) {
	return new ScrollContainer(
		() => getScrollPosition(element, horizontal),
		() => getScrollSize(element, horizontal),
		value => scroll(element, value, horizontal),
		onScroll || (() => null)
	);
}

export class ScrollUtility {
	private scrollElement: Element;
	private verticalScrollContainer: ScrollContainer;
	private horizontalScrollContainer: ScrollContainer;
	private duration: number;
	private easing: EasingFunction;
	constructor(
		element = window,
		public options: {
			duration?: number;
			easing?: EasingFunction;
			onScroll?: () => void;
		} = {}
	) {
		this.element = element;
		this.duration = options.duration ?? 1000;
		this.easing = options.easing ?? defaultEasing;
	}
	stop() {
		this.verticalScrollContainer.stop();
		this.horizontalScrollContainer.stop();
	}

	get element() {
		return this.scrollElement;
	}
	set element(element) {
		this.scrollElement = getElementFromQuery(element);
		this.verticalScrollContainer = getScrollContainer(
			this.scrollElement,
			false,
			this.options.onScroll
		);
		this.horizontalScrollContainer = getScrollContainer(
			this.scrollElement,
			true,
			this.options.onScroll
		);
	}
	get scrollLeft() {
		return this.horizontalScrollContainer.getFinalPosition();
	}
	get scrollTop() {
		return this.verticalScrollContainer.getFinalPosition();
	}
	set scrollLeft(left: number) {}
	set scrollTop(top: number) {
		this.verticalScrollContainer.scrollTo(top, this.duration, this.easing);
	}
}

export default ScrollUtility;
