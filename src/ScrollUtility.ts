import { getScrollPosition, getScrollSize, scroll } from "./misc";
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
	private verticalScrollContainer: ScrollContainer;
	private horizontalScrollContainer: ScrollContainer;
	private duration: number;
	private easing: EasingFunction;
	constructor(
		private element = window,
		public options: {
			duration?: number;
			easing?: EasingFunction;
			onScroll?: () => void;
		} = {}
	) {
		this.verticalScrollContainer = getScrollContainer(
			this.element,
			false,
			options.onScroll
		);
		this.horizontalScrollContainer = getScrollContainer(
			this.element,
			true,
			options.onScroll
		);
		this.duration = options.duration ?? 1000;
		this.easing = options.easing ?? defaultEasing;
	}
	stop() {
		this.verticalScrollContainer.stop();
		this.horizontalScrollContainer.stop();
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
