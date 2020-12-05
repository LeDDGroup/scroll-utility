import { SElement } from "./misc";

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
		private horizontal: boolean = false,
		options: {
			private getScrollPosition;
			private getScrollSize;
			private scrollPosition;
		}
	);
	animations: Animation[] = [];
	virtualPosition: number = 0;
	finalPosition: number = 0;
	previousTime: number = 0;

	private update(currentTime: number) {
		const position = Math.round(this.getScrollPosition());
		const diff =
			position - Math.round(maxMin(this.virtualPosition, this.getScrollSize()));
		this.finalPosition += diff;
		onScroll && onScroll(!!diff);

		this.animations = this.animations.filter(
			({ initialTime, duration, easingFunction, distance }) => {
				function getPosition(time: number) {
					const currentDuration = maxMin(time - initialTime, duration, 0);
					const offsetPosition = this.finalPosition - distance;
					return easingFunction(
						currentDuration,
						offsetPosition,
						distance,
						duration
					);
				}
				this.virtualPosition +=
					getPosition(currentTime) - getPosition(this.previousTime);
				return currentTime < duration;
			}
		);
	}

	scrollBy(distance, duration, easingFunction) {
		const initialTime = performance.now();
		scrollAnimation.finalPosition += distance;

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
}

export class ScrollUtility {
	private verticalScrollAnimations = new ScrollContainer();
	private horizontalScrollAnimations = new ScrollContainer(true);
	constructor(
		private element = window,
		private options: {
			duration: number;
			easing: EasingFunction;
		} = {}
	) {}

	stop() {
		this.verticalScrollAnimations.stop();
		this.horizontalScrollAnimations.stop();
	}

	get scrollX() {}
	get scrollY() {}
	set scrollX(x: number) {}
	get scrollY(y: number) {}
}

// function scrollToElement(query: ElementOrQuery, value: number) {
// 	const element = getElementFromQuery(query);
// 	const to =
// 		element === myContainer.element
// 		? myContainer.scrollSize() * value
// 		: getDistToElement(element, value) + myContainer.scrollPosition();
// 	scrollToValue(to);
// }
