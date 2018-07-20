import { scrollToPercent } from "./scrollToPercent";
import { scrollToPosition } from "./scrollToPosition";
import { scope } from "./scope";
import { offset } from "./offset";
import { WebDriver } from "selenium-webdriver";

export {
  testScenarios,
  Scenario,
}

function testScenarios(getBrowser: () => WebDriver) {
  const browser = new Scenario(getBrowser);
  scope(browser);
  offset(browser);
  scrollToPosition(browser);
  scrollToPercent(browser);
}

class Scenario {
  constructor (private getBrowser: () => WebDriver) {
  }
  private get browser() {
    return this.getBrowser();
  }
  public evaluate(funct: () => void, ...args): Promise<any> {
    return this.browser.executeScript(funct, ...args) as Promise<any>;
  }
  public getYOffset(): Promise<number> {
    return this.evaluate(() => {
      return window.pageYOffset;
    }) as Promise<number>;
  }
  public getScrollHeight(): Promise<number> {
    return this.evaluate(() => {
      return document.body.scrollHeight;
    }) as Promise<number>;
  }
  public getWindowHeight(): Promise<number> {
    return this.evaluate(() => {
      return window.innerHeight;
    }) as Promise<number>;
  }
}
