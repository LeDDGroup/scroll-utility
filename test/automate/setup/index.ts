import { Scroll } from "../../../";

declare const window: Window & {
  Scroll: typeof Scroll,
};

window.Scroll = Scroll;
