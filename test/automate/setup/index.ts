import { Scroll } from "../../../index";

declare const window: Window & {
  Scroll: typeof Scroll,
};

window.Scroll = Scroll;
