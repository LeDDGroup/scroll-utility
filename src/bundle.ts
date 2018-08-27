import { Scroll } from "./scroll";

declare const window: Window & {
  __ScrollUtility: typeof Scroll;
};

window.__ScrollUtility = Scroll

export { Scroll };