import { scrollToElement } from "./scrollToElement"
import { scrollToPercent } from "./scrollToPercent"
import { scrollToPosition } from "./scrollToPosition"
import { scope } from "./scope"
import { offset } from "./offset"
import { WebDriver } from "selenium-webdriver"

interface IOptions {
  horizontal?: boolean
  elementScroll?: boolean
}

class Scenario {
  constructor(private getBrowser: () => WebDriver) {}
  static element = "document.getElementById('element')"
  static element1 = "document.getElementById('element1')"
  static elementSelector = "document.getElementById('scrollable')"
  static elementClientRect = `${Scenario.elementSelector}.getBoundingClientRect()`

  public get browser() {
    return this.getBrowser()
  }
  public evaluate(funct: (() => void) | string, ...args: []): Promise<any> {
    return this.browser.executeScript(funct, ...args) as Promise<any>
  }
  public getValue(value: string): Promise<any> {
    return this.evaluate(`return ${value}`)
  }
  public getOffset(options: IOptions): Promise<number> {
    return this.getValue(
      options.horizontal
        ? options.elementScroll
          ? `${Scenario.elementSelector}.scrollLeft`
          : "window.pageXOffset"
        : options.elementScroll
          ? `${Scenario.elementSelector}.scrollTop`
          : "window.pageYOffset",
    ) as Promise<number>
  }
  public getSize(options: IOptions): Promise<number> {
    return this.getValue(
      options.horizontal
        ? options.elementScroll
          ? `${Scenario.elementSelector}.clientWidth`
          : "document.documentElement.clientWidth || document.body.clientWidth || window.innerWidth"
        : options.elementScroll
          ? `${Scenario.elementSelector}.clientHeight`
          : "document.documentElement.clientHeight || document.body.clientHeight || window.innerHeight",
    ) as Promise<number>
  }
  public getScrollSize(options: IOptions): Promise<number> {
    return this.getValue(
      options.horizontal
        ? options.elementScroll
          ? `${Scenario.elementSelector}.scrollWidth`
          : "Math.max(document.body.scrollWidth, document.body.offsetWidth, document.documentElement.clientWidth, document.documentElement.scrollWidth, document.documentElement.offsetWidth)"
        : options.elementScroll
          ? `${Scenario.elementSelector}.scrollHeight`
          : "Math.max(document.body.scrollHeight, document.body.offsetHeight, document.documentElement.clientHeight, document.documentElement.scrollHeight, document.documentElement.offsetHeight)",
    ) as Promise<number>
  }
  public getElementToScroll(elementScroll?: boolean) {
    return elementScroll ? Scenario.element : Scenario.element1
  }
  public getManagerInit(elementScroll?: boolean) {
    return elementScroll
      ? `const scrollManager = new ScrollUtility(${Scenario.elementSelector});`
      : "const scrollManager = new ScrollUtility();"
  }
  public getScrollOffset(options: IOptions): Promise<number> {
    return this.getValue(
      options.horizontal
        ? options.elementScroll
          ? `${Scenario.elementSelector}.getBoundingClientRect().left`
          : "0"
        : options.elementScroll
          ? `${Scenario.elementSelector}.getBoundingClientRect().top`
          : "0",
    ) as Promise<number>
  }
  public getElementScrollOffset(options: IOptions): Promise<number> {
    return this.getValue(
      options.horizontal
        ? options.elementScroll
          ? `${Scenario.element}.getBoundingClientRect().left`
          : `${Scenario.element1}.getBoundingClientRect().left`
        : options.elementScroll
          ? `${Scenario.element}.getBoundingClientRect().top`
          : `${Scenario.element1}.getBoundingClientRect().top`,
    ) as Promise<number>
  }
  public getElementSize(options: IOptions): Promise<number> {
    return this.getValue(
      options.horizontal
        ? options.elementScroll
          ? `${Scenario.element}.getBoundingClientRect().width`
          : `${Scenario.element1}.getBoundingClientRect().width`
        : options.elementScroll
          ? `${Scenario.element}.getBoundingClientRect().height`
          : `${Scenario.element1}.getBoundingClientRect().height`,
    ) as Promise<number>
  }
}

function testScenarios(getBrowser: () => WebDriver, basicTests: boolean) {
  const options: IOptions = {}
  const browser = new Scenario(getBrowser)
  function optionTest(options: IOptions) {
    const tests = [scope, offset, scrollToPosition, scrollToPercent, scrollToElement]
    tests.forEach(test => {
      test(browser, Object.assign({}, options), basicTests)
    })
  }
  function myDescribe(
    description: string,
    prop: keyof IOptions,
    value: boolean,
    funct: () => void,
  ) {
    describe(description, () => {
      options[prop] = value
      funct()
    })
  }
  function myDirectionDescribe() {
    myDescribe("vertically", "horizontal", false, () => {
      optionTest(options)
    })
    if (!basicTests) {
      myDescribe("horizontally", "horizontal", true, () => {
        optionTest(options)
      })
    }
  }

  myDescribe("in window", "elementScroll", false, () => {
    myDirectionDescribe()
  })
  if (!basicTests) {
    myDescribe("in element", "elementScroll", true, () => {
      before(async () => {
        const initialize = browser.getManagerInit(false)
        await browser.evaluate(
          `${initialize}; scrollManager.centerElement(${
            Scenario.elementSelector
          }, { horizontal: false, value: 50})`,
        )
        await browser.evaluate(
          `${initialize}; scrollManager.centerElement(${
            Scenario.elementSelector
          }, { horizontal: true, value: 50})`,
        )
      })
      myDirectionDescribe()
    })
  }
}

export { testScenarios, Scenario, IOptions }
