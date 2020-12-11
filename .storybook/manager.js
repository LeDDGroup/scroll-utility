import { addons } from "@storybook/addons";
import theme from "./theme";

addons.setConfig({
	isFullscreen: false,
	showPanel: false,
	sidebarAnimations: true,
	enableShortcuts: false,
	isToolshown: false,
	theme,
	// initialActive: 'sidebar',
	// showRoots: false,
});
