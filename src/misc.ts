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

export const getScrollWidth = (el: ScrollElement) =>
	getScrollWidth(el) - getWidth(el);
export const getScrollHeight = (el: ScrollElement) =>
	getScrollHeight(el) - getHeight(el);

export const getScrollWidth = (el: ScrollElement) =>
	isWindow(el) ? window.pageXOffset : el.scrollLeft;
export const getScrollHeight = (el: ScrollElement) =>
	isWindow(el) ? window.pageYOffset : el.scrollTop;

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
export const getLeftRelativePosition = (el: ScrollElement) =>
	isWindow(el) ? 0 : el.getBoundingClientRect().left;
export const getTopRelativePosition = (el: ScrollElement) =>
	isWindow(el) ? 0 : el.getBoundingClientRect().top;

export const scrollTop = (el, value) => el.scrollBy(value, 0);
export const scrollLeft = (el, value) => el.scrollBy(0, value);

export {
	getWidth,
	getHeight,
	getRealScrollHeight,
	getRealScrollWidth,
	getScrollWidth,
	getScrollHeight,
	getScrollWidth,
	getScrollHeight,
	getOffsetWidth,
	getOffsetHeight,
	getBorderWidth,
	getBorderHeight,
	getLeftRelativePosition,
	getTopRelativePosition,
	scrollTop,
	scrollLeft,
};
