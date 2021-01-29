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
		this.animationManager = new AnimationManager();
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

	get diff() {
		return (
			Math.round(this.scrollPosition) -
			Math.round(maxMin(this.animationManager.position, this.scrollSize))
		);
	}

	update(time) {
		const isIdle = this.animationManager.isIdle;
		const externalScroll = !!this.diff;
		if (externalScroll) {
			this.animationManager.adjust(this.diff);
		}
		if (!isIdle) {
			this.animationManager.update(time);

			if (this.diff) {
				scroll(
					this.element,
					Math.round(this.animationManager.position - this.scrollPosition),
					this.horizontal
				);
			}
		}

		return externalScroll;
	}
	scrollTo(
		position,
		duration = this.scroller.duration,
		easing = this.scroller.easing
	) {
		this.animationManager.push(
			performance.now(),
			maxMin(position, this.scrollSize) - this.animationManager.finalPosition,
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
