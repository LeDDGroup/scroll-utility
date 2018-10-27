import { Scenario, IOptions } from "."
import { delay } from "../delay"
import { expectCloseBy } from "./expect-close-by"

export { offset }

function offset(browser: Scenario, options: IOptions, basicTests: boolean) {
  describe("offset scroll position", () => {
    async function offsetTest(scrollDistance: number) {
      const duration = 0
      const initialOffset = await browser.getOffset(options)
      const initialize = browser.getManagerInit(options.elementScroll)
      await browser.evaluate(`
        ${initialize}
        scrollManager.scrollBy("value", {
          value: ${scrollDistance},
          duration: ${duration},
          horizontal: ${options.horizontal},
        });
      `)
      await delay(duration)
      const lastOffset = await browser.getOffset(options)

      const expectedPosition = scrollDistance + initialOffset

      await browser.browser.takeScreenshot()
      expectCloseBy(lastOffset, expectedPosition)
    }

    it("should do scroll with offset fixed", async () => offsetTest(1000))

    if (!basicTests) {
      it("should do scroll with offset some floating", async () => offsetTest(-16.76))
      it("should do scroll with offset some floating again", async () => offsetTest(16))
    }
  })
}
