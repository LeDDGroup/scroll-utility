import { getScrollPosition, getScrollSize } from "./misc";

export type EasingFunction = (
	currentStep: number,
	offsetValue: number,
	distance: number,
	totalSteps: number
) => number;

export type ElementOrQuery = Element | Window | string;

// default easing function
function easeInOutQuad(t: number, b: number, c: number, d: number) {
	if ((t /= d / 2) < 1) return (c / 2) * t * t + b;
	return (-c / 2) * (--t * (t - 2) - 1) + b;
}

export function getElementFromQuery(
	elementOrQuery: ElementOrQuery
): HTMLElement | Window {
	if (!elementOrQuery)
		throw new Error(`elementOrQuery should not be a ${typeof elementOrQuery}`);
	const element =
		typeof elementOrQuery === "string"
			? document.querySelector(elementOrQuery)
			: elementOrQuery;
	if (!element)
		throw new Error(`no element matched querySelector ${elementOrQuery}`);
	if (element !== window && !(element instanceof Element))
		throw new Error("element should be an instance of Element"); // TODO improve warning
	return element === document.documentElement
		? window
		: (element as HTMLElement);
}

function maxMin(value: number, max: number, min: number = 0) {
	return Math.max(Math.min(value, max), min);
}

interface Animation {
	initialTime: number;
	duration: number;
	easingFunction: EasingFunction;
	distance: number;
}

class ScrollContainer {
	constructor(
		private getScrollPosition,
		private getScrollSize,
		public onScroll
	) {}
	animations: Animation[] = [];
	virtualPosition: number = 0;
	finalPosition: number = 0;
	previousTime: number = 0;

	private update(currentTime: number) {
		const position = Math.round(this.getScrollPosition());
		const diff =
			position - Math.round(maxMin(this.virtualPosition, this.getScrollSize()));
		this.finalPosition += diff;
		this.onScroll && this.onScroll(!!diff);

		this.animations = this.animations.filter(
			({ initialTime, duration, easingFunction, distance }) => {
				const getPosition = (time: number) => {
					const currentDuration = maxMin(time - initialTime, duration, 0);
					const offsetPosition = this.finalPosition - distance;
					return easingFunction(
						currentDuration,
						offsetPosition,
						distance,
						duration
					);
				};
				this.virtualPosition +=
					getPosition(currentTime) - getPosition(this.previousTime);
				return currentTime < duration;
			}
		);
	}

	scrollBy(distance, duration, easingFunction = easeInOutQuad) {
		const initialTime = performance.now();
		this.finalPosition += distance;

		const value = maxMin(
			distance,
			this.getScrollSize() - this.getScrollPosition(),
			-this.getScrollPosition()
		);

		const animation: Animation = {
			initialTime,
			duration,
			easingFunction,
			distance: value,
		};

		this.animations.push(animation);
		this.animations.length === 1 && this.update(initialTime);
	}

	stop() {
		this.animations = [];
		this.finalPosition = this.virtualPosition;
	}
}

export class ScrollUtility {
	private verticalScrollAnimations: ScrollContainer;
	private horizontalScrollAnimations: ScrollContainer;
	constructor(
		private element = window,
		public options: {
			duration?: number;
			easing?: EasingFunction;
			onScroll?: () => void;
		} = {}
	) {
		this.verticalScrollAnimations = new ScrollContainer(
			() => getScrollPosition(this.element, false),
			() => getScrollSize(this.element, false),
			options.onScroll
		);
		this.horizontalScrollAnimations = new ScrollContainer(
			() => getScrollPosition(this.element, true),
			() => getScrollSize(this.element, true),
			options.onScroll
		);
	}

	stop() {
		this.verticalScrollAnimations.stop();
		this.horizontalScrollAnimations.stop();
	}

	get scrollX() {
		return 0;
	}
	get scrollY() {
		return 0;
	}
	set scrollX(x: number) {}
	set scrollY(y: number) {}
}

// function scrollToElement(query: ElementOrQuery, value: number) {
// 	const element = getElementFromQuery(query);
// 	const to =
// 		element === myContainer.element
// 		? myContainer.scrollSize() * value
// 		: getDistToElement(element, value) + myContainer.scrollPosition();
// 	scrollToValue(to);
// }
