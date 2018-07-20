import { scope } from "./scope";
import { offset } from "./offset";
import { WebDriver } from "selenium-webdriver";

export {
  testScenarios,
  Scenario,
}

function testScenarios(getBrowser: () => WebDriver) {
  const browser = new Scenario(getBrowser);
  offset(browser);
  scope(browser);
}

class Scenario {
  constructor (private getBrowser: () => WebDriver) {
  }
  private get browser() {
    return this.getBrowser();
  }
  public async evaluate(funct: () => void) {
    return await this.browser.executeScript(funct);
  }
  public async getYOffset() {
    return await this.browser.executeScript(() => {
      return window.pageYOffset;
    })
  }
}
