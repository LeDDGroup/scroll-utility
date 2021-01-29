import {
	getScrollPosition,
	getScrollSize,
	scroll,
	getElementFromQuery,
	ElementOrQuery
} from "./misc";
import { AnimationManager, EasingFunction, maxMin } from "./AnimationManager";

// default easing function
function easeInOutQuad(t: number, b: number, c: number, d: number) {
	if ((t /= d / 2) < 1) return (c / 2) * t * t + b;
	return (-c / 2) * (--t * (t - 2) - 1) + b;
}
const defaultEasing = easeInOutQuad;

class ScrollAnimationManager {
	private animationManager: AnimationManager;
	constructor(private scroller: Scroller, private horizontal) {
		this.animationManager = new AnimationManager(value =>
			scroll(this.element, value, horizontal)
		);
	}

	get element() {
		return getElementFromQuery(this.scroller.element);
	}
	get scrollPosition() {
		return getScrollPosition(this.element, this.horizontal);
	}
	get scrollSize() {
		return getScrollSize(this.element, this.horizontal);
	}
	update(time) {
		const diff =
			Math.round(this.scrollPosition) -
			Math.round(maxMin(this.animationManager.position, this.scrollSize));

		this.animationManager.adjust(diff);
		this.animationManager.update(time);

		return !!diff; // external scroll detected!
	}
	scrollTo(
		position,
		duration = this.scroller.duration,
		easing = this.scroller.duration
	) {
		this.animationManager.push(
			performance.now(),
			position - this.scrollPosition,
			duration,
			easing
		);
	}
	getFinalPosition() {
		return this.animationManager.finalPosition;
	}
	stop() {
		this.animationManager.stop();
	}
}

export class Scroller {
	private verticalScroller: ScrollAnimationManager;
	private horizontalScroller: ScrollAnimationManager;

	constructor(
		public element: ElementOrQuery = window,
		public duration = 1000,
		public easing: EasingFunction = defaultEasing,
		public onScroll = () => null
	) {
		this.verticalScroller = new ScrollAnimationManager(this, false);
		this.horizontalScroller = new ScrollAnimationManager(this, true);
		const update = () =>
			window.requestAnimationFrame(time => {
				this.verticalScroller.update(time);
				this.horizontalScroller.update(time);
				update();
			});
		update();
	}

	stop() {
		this.verticalScroller.stop();
		this.horizontalScroller.stop();
	}

	get left() {
		return this.horizontalScroller.getFinalPosition();
	}
	set left(left: number) {
		this.horizontalScroller.scrollTo(left);
	}
	get top() {
		return this.verticalScroller.getFinalPosition();
	}
	set top(top: number) {
		this.verticalScroller.scrollTo(top);
	}
}

export default Scroller;
