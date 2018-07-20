import { Scenario } from ".";

export {
  sample,
}

function sample(browser: Scenario) {
  describe("sample scenario description", () => {
    it("should do something", async () => {
      await browser.evaluate(() => {
      });

    })
  });
}
