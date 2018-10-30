import { Scenario, IOptions } from "."
import { delay } from "../delay"
import { expectCloseBy } from "./expect-close-by"

export { scrollToPosition }

function scrollToPosition(browser: Scenario, options: IOptions, basicTests: boolean) {
  const duration = 0
  const initialize = browser.getManagerInit(options.elementScroll)
  describe("scroll to position", () => {
    async function scrollToPositionTest(scrollPosition: number) {
      await browser.evaluate(`
        ${initialize}
        scrollManager.scrollTo("value", ${scrollPosition}, {
          duration: ${duration},
          horizontal: ${options.horizontal}
        });
      `)

      await delay(duration)
      const lastOffset = await browser.getOffset(options)

      const expectedPosition = scrollPosition

      await browser.browser.takeScreenshot()
      expectCloseBy(lastOffset, expectedPosition)
    }

    it("should scroll to certain position", async () => scrollToPositionTest(1500))
    if (!basicTests) {
      it("should scroll to a floating value", async () => scrollToPositionTest(511.8124567))
    }
  })
}
