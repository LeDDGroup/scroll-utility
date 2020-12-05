type ScrollElement = Element | Window;

export const getWidth = (el: ScrollElement) =>
	isWindow(el)
		? document.documentElement.clientWidth ||
		  document.body.clientWidth ||
		  window.innerWidth
		: el.clientWidth;
export const getHeight = (el: ScrollElement) =>
	isWindow(el)
		? document.documentElement.clientHeight ||
		  document.body.clientHeight ||
		  window.innerHeight
		: el.clientHeight;
export const getSize = (el: ScrollElement, horizontal) =>
	horizontal ? getWidth(el) : getHeight(el);

export const getRealScrollHeight = (el: ScrollElement) =>
	isWindow(el)
		? Math.max(
				document.body.scrollHeight,
				document.body.offsetHeight,
				document.documentElement.clientHeight,
				document.documentElement.scrollHeight,
				document.documentElement.offsetHeight
		  )
		: el.scrollHeight;
export const getRealScrollWidth = (el: ScrollElement) =>
	isWindow(el)
		? Math.max(
				document.body.scrollWidth,
				document.body.offsetWidth,
				document.documentElement.clientWidth,
				document.documentElement.scrollWidth,
				document.documentElement.offsetWidth
		  )
		: el.scrollWidth;
export const getRealScrollSize = (el: ScrollElement, horizontal) =>
	horizontal ? getRealScrollWidth(el) : getRealScrollHeight(el);

export const getScrollWidth = (el: ScrollElement) =>
	getScrollWidth(el) - getWidth(el);
export const getScrollHeight = (el: ScrollElement) =>
	getScrollHeight(el) - getHeight(el);
export const getScrollSize = (el: ScrollElement, horizontal) =>
	horizontal ? getScrollWidth(el) : getScrollHeight(el);

export const getScrollTop = (el: ScrollElement) =>
	isWindow(el) ? window.pageXOffset : el.scrollLeft;
export const getScrollLeft = (el: ScrollElement) =>
	isWindow(el) ? window.pageYOffset : el.scrollTop;
export const getScrollPosition = (el: ScrollElement, horizontal) =>
	horizontal ? getScrollLeft(el) : getScrollTop(el);

export const getOffsetWidth = (el: ScrollElement) =>
	isWindow(el)
		? document.documentElement.clientWidth ||
		  document.body.clientWidth ||
		  window.innerWidth
		: el.offsetWidth;
export const getOffsetHeight = (el: ScrollElement) =>
	isWindow(el)
		? document.documentElement.clientHeight ||
		  document.body.clientHeight ||
		  window.innerHeight
		: el.offsetHeight;
export const getOffsetSize = (el: ScrollElement, horizontal) =>
	horizontal ? getOffsetWidth(el) : getOffsetHeight(el);

export const getBorderWidth = (el: ScrollElement) =>
	isWindow(el)
		? 0
		: (parseInt(
				getComputedStyle(el, null).getPropertyValue("border-left-width"),
				10
		  ) || 0) +
		  (parseInt(
				getComputedStyle(el, null).getPropertyValue("border-right-width"),
				10
		  ) || 0);
export const getBorderHeight = (el: ScrollElement) =>
	isWindow(el)
		? 0
		: (parseInt(
				getComputedStyle(el, null).getPropertyValue("border-top-width"),
				10
		  ) || 0) +
		  (parseInt(
				getComputedStyle(el, null).getPropertyValue("border-bottom-width"),
				10
		  ) || 0);
export const getBorder = (el: ScrollElement, horizontal) =>
	horizontal ? getBorderWidth(el) : getBorderHeight(el);

export const getLeftPosition = (el: ScrollElement) =>
	isWindow(el) ? 0 : el.getBoundingClientRect().left;
export const getTopPosition = (el: ScrollElement) =>
	isWindow(el) ? 0 : el.getBoundingClientRect().top;
export const getPosition = (el: ScrollElement, horizontal) =>
	horizontal ? getLeftPosition(el) : getTopPosition(el);

export const scrollTop = (el, value) => el.scrollBy(value, 0);
export const scrollLeft = (el, value) => el.scrollBy(0, value);
export const scroll = (el, value, horizontal) =>
	horizontal ? scrollLeft(value) : scrollTop(value);

export const getOffset = (
	container: ScrollElement,
	el: ScrollElement,
	horizontal: boolean
) =>
	getPosition(el, horizontal) -
	getPosition(container, horizontal) -
	getBorder(container, horizontal);

function getDiff(
	container: ScrollElement,
	el: ScrollElement,
	horizontal: boolean
) {
	return getSize(container, horizontal) - getPosition(el, horizontal);
}

export function getRelativePosition(
	container: ScrollElement,
	element: ScrollElement,
	horizontal: boolean
): number {
	if (element === myContainer.element) {
		return getScrollPosition() / getScrollSize();
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
