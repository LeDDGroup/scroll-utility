import {
	getScrollPosition,
	getScrollSize,
	scroll,
	getElementFromQuery,
	ElementOrQuery,
	ScrollElement
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
	private scrollElement: ScrollElement;
	private verticalScrollContainer: ScrollContainer;
	private horizontalScrollContainer: ScrollContainer;
	private duration: number;
	private easing: EasingFunction;
	constructor(
		element: ElementOrQuery = window,
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
	set element(element: ElementOrQuery) {
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

	getTop(fn) {
		return fn({ element: this.element, horizontal: false });
	}

	get left() {
		return this.horizontalScrollContainer.getFinalPosition();
	}
	get top() {
		return this.verticalScrollContainer.getFinalPosition();
	}
	set left(left: number) {}
	set top(top: number | (() => number)) {
		console.log(top)
		const distToScroll =
			typeof top === "function"
				? top({ element: this.element, horizontal: false })
				: top;
		this.verticalScrollContainer.scrollTo(
			distToScroll,
			this.duration,
			this.easing
		);
	}
}

export default ScrollUtility;
