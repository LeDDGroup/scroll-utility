import {
	getScrollPosition,
	getScrollSize,
	scroll,
	getElementFromQuery,
	ElementOrQuery,
	ScrollElement
} from "./misc";
import { AnimationManager, EasingFunction } from "./AnimationManager";

// default easing function
function easeInOutQuad(t: number, b: number, c: number, d: number) {
	if ((t /= d / 2) < 1) return (c / 2) * t * t + b;
	return (-c / 2) * (--t * (t - 2) - 1) + b;
}
const defaultEasing = easeInOutQuad;

class ScrollAnimationManager {
	private animationManager: AnimationManager;
	constructor(private scroller: Scroller, horizontal) {
		this.animationManager = new AnimationManager(value =>
			scroll(this.scrollElement, value, horizontal)
		);
		// () => this.onScroll?.(...args);
		// () => ,
		// () => getScrollSize(this.scrollElement, horizontal),
	}
	update() {}
	scrollTo(to, duration, easing) {
		const initialTime = performance.now();
		const from = getScrollPosition(this.scrollElement, horizontal);
		const distance = to - from;
		this.animationManager.animate(initialTime, distance, duration, easing);
	}
	getFinalPosition() {}
}

export class Scroller {
	private verticalScroller = new ScrollAnimationManager(this, false);
	private horizontalScroller = new ScrollAnimationManager(this, true);

	constructor(
		public element: ElementOrQuery = window,
		public duration = 1000,
		public easing: EasingFunction = defaultEasing,
		public onScroll = () => null
	) {
		const update = () =>
			window.requestAnimationFrame(time => {
				this.verticalScroller.update();
				this.horizontalScroller.update();
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
		this.horizontalScroller.scrollTo(left, duration, easing);
	}
	get top() {
		return this.verticalScroller.getFinalPosition();
	}
	set top(top: number) {
		this.verticalScroller.scrollTo(top, duration, easing);
	}
}

export default Scroller;
