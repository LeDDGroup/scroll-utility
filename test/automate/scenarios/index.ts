import { offset } from "./offset";
import { WebDriver } from "selenium-webdriver";

export {
  scenarios,
}

const scenarios: Array<((getBrowser: () => WebDriver) => any)> = [offset];
