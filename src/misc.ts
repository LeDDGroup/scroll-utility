export type ElementOrQuery = Element | Window | string;
export type ScrollElement = Element | Window;

const getWindowWidth = () =>
	document.documentElement.clientWidth ||
	document.body.clientWidth ||
	window.innerWidth;

const getWindowHeight = () =>
	document.documentElement.clientHeight ||
	document.body.clientHeight ||
	window.innerHeight;

const getElementWidth = (el: Element) => el.clientWidth;
const getElementHeight = (el: Element) => el.clientHeight;

function isWindow(el) {
	return el === window;
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

const withWindow = (wFn, eFn) => (el: ScrollElement) => {
	return isWindow(el) ? wFn() : eFn(el);
};

const withDirection = (hFn, vFn) => (el: ScrollElement, horizontal: boolean) =>
	horizontal ? hFn(el) : vFn(el);

export const getWidth = withWindow(getWindowWidth, getElementWidth);
export const getHeight = withWindow(getWindowHeight, getElementHeight);
export const getSize = withDirection(getWidth, getHeight);

export const getRealWindowScrollWidth = () =>
	Math.max(
		document.body.scrollWidth,
		document.body.offsetWidth,
		document.documentElement.clientWidth,
		document.documentElement.scrollWidth,
		document.documentElement.offsetWidth
	);

export const getRealWindowScrollHeight = () =>
	Math.max(
		document.body.scrollHeight,
		document.body.offsetHeight,
		document.documentElement.clientHeight,
		document.documentElement.scrollHeight,
		document.documentElement.offsetHeight
	);

export const getRealElementScrollHeight = el => el.scrollHeight;
export const getRealElementScrollWidth = el => el.scrollWidth;

export const getRealScrollWidth = withWindow(
	getRealWindowScrollWidth,
	getRealElementScrollWidth
);
export const getRealScrollHeight = withWindow(
	getRealWindowScrollHeight,
	getRealElementScrollHeight
);
export const getRealScrollSize = withDirection(
	getRealScrollWidth,
	getRealScrollHeight
);

export const getScrollWidth = (el: ScrollElement) =>
	getRealScrollWidth(el) - getWidth(el);
export const getScrollHeight = (el: ScrollElement) =>
	getRealScrollHeight(el) - getHeight(el);
export const getScrollSize = withDirection(getScrollWidth, getScrollHeight);

export const getWindowScrollLeft = () => window.pageXOffset;
export const getElementScrollLeft = el => el.scrollLeft;

export const getWindowScrollTop = () => window.pageYOffset;
export const getElementScrollTop = el => el.scrollTop;

export const getScrollLeft = withWindow(
	getWindowScrollLeft,
	getElementScrollLeft
);
export const getScrollTop = withWindow(getWindowScrollTop, getElementScrollTop);
export const getScrollPosition = withDirection(getScrollLeft, getScrollTop);

export const getWindowOffsetWidth = () =>
	document.documentElement.clientWidth ||
	document.body.clientWidth ||
	window.innerWidth;
export const getElementOffsetWidth = el => el.offsetWidth;
export const getWindowOffsetHeight = () =>
	document.documentElement.clientHeight ||
	document.body.clientHeight ||
	window.innerHeight;
export const getElementOffsetHeight = el => el.offsetHeight;

export const getOffsetWidth = withWindow(
	getWindowOffsetWidth,
	getElementOffsetWidth
);
export const getOffsetHeight = withWindow(
	getWindowOffsetHeight,
	getElementOffsetHeight
);
export const getOffsetSize = withDirection(getOffsetWidth, getOffsetHeight);

export const getWindowBorderWidth = () => 0;
export const getWindowBorderHeight = () => 0;

function getElementIntProperty(el, prop) {
	return parseInt(getComputedStyle(el, null).getPropertyValue(prop), 10) || 0;
}
export const getElementBorderWidth = el =>
	getElementIntProperty(el, "border-left-width") +
	getElementIntProperty(el, "border-right-width");
export const getElementBorderHeight = el =>
	getElementIntProperty(el, "border-top-width") +
	getElementIntProperty(el, "border-bottom-width");

export const getBorderWidth = withWindow(
	getWindowBorderWidth,
	getElementBorderWidth
);
export const getBorderHeight = withWindow(
	getWindowBorderHeight,
	getElementBorderHeight
);
export const getBorder = withDirection(getBorderWidth, getBorderHeight);

export const getElementLeftPosition = el => el.getBoundingClientRect().left;
export const getElementTopPosition = el => el.getBoundingClientRect().top;
export const getLeftPosition = withWindow(() => 0, getElementLeftPosition);
export const getTopPosition = withWindow(() => 0, getElementTopPosition);
export const getPosition = withDirection(getLeftPosition, getTopPosition);

export const scrollTop = (el, value) => el.scrollBy(0, value);
export const scrollLeft = (el, value) => el.scrollBy(value, 0);
export const scroll = (el, value, horizontal) =>
	horizontal ? scrollLeft(el, value) : scrollTop(el, value);

export const getOffset = (
	container: ScrollElement,
	element: ScrollElement,
	horizontal: boolean
) =>
	getPosition(element, horizontal) -
	getPosition(container, horizontal) -
	getBorder(container, horizontal);

export function getDiff(
	container: ScrollElement,
	element: ScrollElement,
	horizontal: boolean
) {
	return getSize(container, horizontal) - getPosition(element, horizontal);
}

export function getRelativePosition(
	container: ScrollElement,
	element: ScrollElement,
	horizontal: boolean
): number {
	if (element === container) {
		return (
			getScrollPosition(element, horizontal) /
			getScrollSize(element, horizontal)
		);
	}
	return (
		getOffset(container, element, horizontal) /
		getDiff(container, element, horizontal)
	);
}

export function getDistToElement(
	container: ScrollElement,
	element: ScrollElement,
	horizontal
): number {
	return (
		getOffset(container, element, horizontal) -
		getDiff(container, element, horizontal)
	);
}

export function distTo(element) {
	return ({ element: container, horizontal }) =>
		getDistToElement(container, element, horizontal);
}

// function scrollToElement(query: ElementOrQuery, value: number) {
// 	const element = getElementFromQuery(query);
// 	const to =
// 		element === myContainer.element
// 		? myContainer.scrollSize() * value
// 		: getDistToElement(element, value) + myContainer.scrollPosition();
// 	scrollToValue(to);
// }
