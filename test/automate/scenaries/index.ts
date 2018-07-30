import { scrollToPercent } from "./scrollToPercent";
import { scrollToPosition } from "./scrollToPosition";
import { scope } from "./scope";
import { offset } from "./offset";
import { WebDriver } from "selenium-webdriver";
import { Scroll } from "../../../";

import { expect } from "chai";

export {
  testScenarios,
  Scenario,
  IOptions
}

interface IOptions {
  horizontal?: boolean;
  elementScroll?: boolean;
}

function testScenarios(getBrowser: () => WebDriver) {
  const options: IOptions = {};
  const browser = new Scenario(getBrowser);
  function optionTest(options: IOptions) {

    const tests = [scope, offset, scrollToPosition, scrollToPercent];
    tests.forEach((test) => {
      test(browser, Object.assign({}, options));
    });
  }
  function myDescribe(description: string, prop: string, value: boolean, funct: () => void) {
    describe(description, () => {
      options[prop] = value;
      funct();
    });
  }
  function myDirectionDescribe() {
    myDescribe("vertical scroll", "horizontal", false, () => {
      optionTest(options);
    })
    myDescribe("horizontal scroll", "horizontal", true, () => {
      optionTest(options);
    })
  }

  myDescribe("window scroll", "elementScroll", false, () => {
    myDirectionDescribe();
  })
  myDescribe("element scroll", "elementScroll", true, () => {
    describe("scroll to element", () => {
      it("should scroll to element", () => {
        const initialize = browser.getManagerInit(false);
        browser.evaluate(`${initialize}; scrollManager.scroll.toElement(${Scenario.elementSelector})`);
        browser.evaluate(`${initialize}; scrollManager.scroll.toElement(${Scenario.elementSelector}, { horizontal: true})`);
        expect(true).to.be.eq(true);
      })
    })
    myDirectionDescribe();
  })
}

class Scenario {
  constructor (private getBrowser: () => WebDriver) {}
  static elementSelector = "document.getElementById('scrollable')";
  static elementClientRect = `${Scenario.elementSelector}.getBoundingClientRect()`;

  private get browser() {
    return this.getBrowser();
  }
  public evaluate(funct: (() => void) | string, ...args): Promise<any> {
    return this.browser.executeScript(funct, ...args) as Promise<any>;
  }
  public getValue(value: string): Promise<any> {
    return this.evaluate(`return ${value}`);
  }
  public getOffset(options: IOptions): Promise<number> {
    return this.getValue(
      options.horizontal
      ? options.elementScroll
        ? `${Scenario.elementSelector}.scrollLeft`
        : "window.pageXOffset"
      : options.elementScroll
        ? `${Scenario.elementSelector}.scrollTop`
        : "window.pageYOffset"
    ) as Promise<number>;
  }
  public getSize(options: IOptions): Promise<number> {
    return this.getValue(
      options.horizontal
        ? options.elementScroll
        ? `${Scenario.elementSelector}.clientWidth`
        : "window.innerWidth"
      : options.elementScroll
        ? `${Scenario.elementSelector}.clientHeight`
        : "window.innerHeight"
    ) as Promise<number>;
  }
  public getScrollSize(options: IOptions): Promise<number> {
    return this.getValue(
      options.horizontal
        ? options.elementScroll
        ? `${Scenario.elementSelector}.scrollWidth`
        : "document.body.scrollWidth"
      : options.elementScroll
        ? `${Scenario.elementSelector}.scrollHeight`
        : "document.body.scrollHeight"
    ) as Promise<number>;
  }
  public getManagerInit(elementScroll?: boolean) {
    return elementScroll
      ? `const scrollManager = new Scroll(${Scenario.elementSelector});`
      : "const scrollManager = new Scroll();";
  }
}
