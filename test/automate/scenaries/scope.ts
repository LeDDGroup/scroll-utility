import { Scenario, IOptions } from ".";

export {
  scope,
}

function scope(browser: Scenario, options: IOptions = {}) {
  const initialize = browser.getManagerInit(options.elementScroll)
  it("should create a scope", async () => {
      await browser.evaluate(`${initialize}`);
  });
}
