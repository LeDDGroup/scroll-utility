import { getElementWrapper, SElement } from "./misc";

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

// const ScrollElements: {
// 	element: HTMLElement | Window;
// 	horizontal: boolean;
// 	scrollAnimation: {
// 		scrollAnimations: {
// 			position: (time: number) => number;
// 			duration: number;
// 		}[];
// 		virtualPosition: number;
// 		finalPosition: number;
// 		previousTime: number;
// 	};
// }[] = [];

// export interface IScroll {
// 	container?: Element | Window | string;
// 	horizontal?: boolean;
// 	duration?: number;
// 	easing?:
// 		| string
// 		| ((
// 				currentStep: number,
// 				offsetValue: number,
// 				distance: number,
// 				totalSteps: number
// 		  ) => number);
// 	onStop?: null | (() => void);
// 	onScroll?: null | ((external?: boolean) => void);
// }

// function getElement({ horizontal, element }) {
// 	let index = ScrollElements.findIndex(
// 		(e) => element === e.element && horizontal === e.horizontal
// 	);
// 	if (index < 0) {
// 		index = ScrollElements.length;
// 		ScrollElements.push({
// 			element,
// 			horizontal,
// 			scrollAnimation: {
// 				scrollAnimations: [],
// 				virtualPosition: 0,
// 				finalPosition: 0,
// 				previousTime: 0,
// 			},
// 		});
// 	}
// 	return ScrollElements[index].scrollAnimation;
// }

interface Animation {}

class ScrollAnimation {
	animations: Animation[] = [];
	virtualPosition: number = 0;
	finalPosition: number = 0;
	previousTime: number = 0;
}

export class ScrollUtility {
	private myContainer = getElementWrapper(element, horizontal);
	private verticalScrollAnimations = new ScrollAnimation();
	private horizontalScrollAnimations = new ScrollAnimation();
	constructor(
		private element,
		private options: {
			duration: number;
			easing: EasingFunction;
		} = {}
	) {}

	private update(currentTime: number) {
		const position = Math.round(this.myContainer.scrollPosition());
		const diff =
			position -
			Math.round(
				maxMin(scrollAnimation.virtualPosition, this.myContainer.scrollSize())
			);
		scrollAnimation.finalPosition += diff;
		onScroll && onScroll(!!diff);
		scrollAnimation.scrollAnimations = scrollAnimation.scrollAnimations.filter(
			(animation) => {
				scrollAnimation.virtualPosition +=
					animation.position(currentTime) -
					animation.position(scrollAnimation.previousTime);
				return currentTime < animation.duration;
			}
		);
		this.myContainer.scrollBy(
			Math.round(scrollAnimation.virtualPosition) - position
		);
		scrollAnimation.previousTime = currentTime;
		!!scrollAnimation.scrollAnimations.length
			? requestAnimationFrame(update)
			: onStop && onStop();
	}

	private create(distance: number) {
		const value = maxMin(
			distance,
			this.myContainer.scrollSize() - this.myContainer.scrollPosition(),
			-this.myContainer.scrollPosition()
		);
		const initialTime = performance.now();
		scrollAnimation.finalPosition += value;
		const animation = {
			initialTime,
			duration,
			getPosition: (time: number) => {
				return easingFunction(
					maxMin(time - initialTime, duration, 0),
					scrollAnimation.finalPosition - value,
					value,
					duration
				);
			},
		};
		scrollAnimation.scrollAnimations.push(animation);
		scrollAnimation.scrollAnimations.length === 1 && update(initialTime);
	}

	public stop() {
		scrollAnimation.scrollAnimations = [];
	}

	get scrollX() {}
	get scrollY() {}
	set scrollX(x: number) {}
	get scrollY(y: number) {}
}

export function optionalScroll(options: Required<IScroll>) {
	const { container, horizontal, duration, easing, onStop, onScroll } = options;
	const easingFunction = easingFromFunction(easing);
	const element = getElementFromQuery(container);

	function resetScrollAnimation() {
		if (!scrollAnimation.scrollAnimations.length) {
			(scrollAnimation.virtualPosition = myContainer.scrollPosition()),
				(scrollAnimation.finalPosition = myContainer.scrollPosition()),
				(scrollAnimation.previousTime = performance.now());
		}
	}

	function create(distance: number) {
		const value = maxMin(
			distance,
			myContainer.scrollSize() - myContainer.scrollPosition(),
			-myContainer.scrollPosition()
		);
		const initialTime = performance.now();
		scrollAnimation.finalPosition += value;
		scrollAnimation.scrollAnimations.push({
			duration: duration + initialTime,
			position: (time: number) => {
				return easingFunction(
					maxMin(time - initialTime, duration, 0),
					scrollAnimation.finalPosition - value,
					value,
					duration
				);
			},
		});
		scrollAnimation.scrollAnimations.length === 1 && update(initialTime);
	}

	function getRelativePosition(query: ElementOrQuery): number {
		const elementRaw = getElementFromQuery(query);
		if (elementRaw === myContainer.element)
			return myContainer.scrollPosition() / myContainer.scrollSize();
		const _element = getElementWrapper(elementRaw, myContainer.horizontal);
		return getOffset(_element) / getDiff(_element);
	}
	function getDistToElement(query: ElementOrQuery, value = 0): number {
		const element = getElementWrapper(
			getElementFromQuery(query),
			myContainer.horizontal
		);
		return getOffset(element) - getDiff(element) * value;
	}
	function getElementSize(query: ElementOrQuery, value = 1): number {
		const element = getElementWrapper(
			getElementFromQuery(query),
			myContainer.horizontal
		);
		return element.size() * value;
	}
	function getOffset(el: SElement) {
		return (
			el.relativePosition() -
			myContainer.relativePosition() -
			myContainer.border()
		);
	}
	function getDiff(el: SElement) {
		return myContainer.size() - el.offset();
	}
	function scrollToValue(value: number) {
		create(value - scrollAnimation.finalPosition);
	}
	function scrollToElement(query: ElementOrQuery, value: number) {
		const element = getElementFromQuery(query);
		const to =
			element === myContainer.element
				? myContainer.scrollSize() * value
				: getDistToElement(element, value) + myContainer.scrollPosition();
		scrollToValue(to);
	}

	return Object.assign({
		getSize: myContainer.size,
		getScrollSize: myContainer.scrollSize,
		getScrollPosition: myContainer.scrollPosition,
		getRelativePosition,
		getDistToElement,
		getElementSize,
		stop,
		scrollTo(...args: [number] | [ElementOrQuery, number]) {
			resetScrollAnimation();
			const _element: ElementOrQuery | null =
				typeof args[0] === "number" ? null : args[0];
			const value = typeof args[0] === "number" ? args[0] : args[1] || 0;
			_element === null
				? scrollToValue(value)
				: scrollToElement(_element, value);
		},
		offset(...args: [number] | [ElementOrQuery, number]) {
			resetScrollAnimation();
			const _element: ElementOrQuery | null =
				typeof args[0] === "number" ? null : args[0];
			const value = typeof args[0] === "number" ? args[0] : args[1] || 0;
			_element === null
				? create(value)
				: create(getElementSize(_element, value));
		},
	});
}
