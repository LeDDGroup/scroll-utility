import { Scenario, IOptions } from "."
import { delay } from "../delay"

export { scrollToPosition }

function scrollToPosition(browser: Scenario, options: IOptions = {}) {
  const duration = 0
  const initialize = browser.getManagerInit(options.elementScroll)
  describe("scroll to position", () => {
    async function scrollToPositionTest(scrollPosition: number) {
      await browser.evaluate(`
        ${initialize}
        scrollManager.scroll.toPosition(${scrollPosition}, {
          duration: ${duration},
          horizontal: ${options.horizontal}
        });
      `)

      await delay(duration)
      const lastOffset = await browser.getOffset(options)

      const expectedPosition = scrollPosition

      await browser.browser.takeScreenshot()
      expect(lastOffset).toBe(expectedPosition)
    }
    it("should scroll to certain position", async () => scrollToPositionTest(1500))
    it("should scroll to a floating value", async () => scrollToPositionTest(511.8124567))
  })
}
