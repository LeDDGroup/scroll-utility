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
}

class Scenario {
  constructor (private getBrowser: () => WebDriver) {
  }
  private get browser() {
    return this.getBrowser();
  }
  public evaluate(funct: () => void): Promise<any> {
    return this.browser.executeScript(funct) as Promise<any>;
  }
  public getYOffset(): Promise<number> {
    return this.evaluate(() => {
      return window.pageYOffset;
    }) as Promise<number>;
  }
}
