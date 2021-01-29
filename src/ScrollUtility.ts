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

		function getScrollContainer(horizontal) {
			return new ScrollContainer(
				() => getScrollPosition(this.scrollElement, horizontal),
				() => getScrollSize(this.scrollElement, horizontal),
				value => scroll(this.scrollEle, value, horizontal),
				onScroll || (() => null)
			);
		}

		this.verticalScrollContainer = getScrollContainer(false);
		this.horizontalScrollContainer = getScrollContainer(true);
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
	set top(top: number) {
		this.verticalScrollContainer.scrollTo(top, this.duration, this.easing);
	}
}

export default ScrollUtility;
