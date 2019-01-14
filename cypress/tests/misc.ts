import { withScrollManager, withWindow } from "../common"
import * as ScrollUtility from "../../"

context("Misc", () => {
  before(() => {
    cy.visit("http://localhost:8080")
  })
  beforeEach(() => {
    withScrollManager(scrollManager => {
      scrollManager.misc.scrollTo(0, 0, false)
      scrollManager.misc.scrollTo(0, 0, true)
    })
  })
  describe("getDistToElement", () => {
    it("should work", () => {
      withWindow(window => {
        centerElement(window, 0)
          .screenshot("top", { capture: "viewport" })
          .then(() => centerElement(window, 50))
          .screenshot("centered", { capture: "viewport" })
          .then(() => centerElement(window, 100))
          .screenshot("bottom", { capture: "viewport" })
      })
    })
  })
})

function centerElement(window: Window & { ScrollUtility: typeof ScrollUtility }, percent: number) {
  const scrollManager = window.ScrollUtility.default
  const element = window.document.getElementById("some-element")
  const v = scrollManager.misc.getDistToElement(element, percent)
  const h = scrollManager.misc.getDistToElement(element, 50, true)
  scrollManager.scrollBy(v, 0)
  scrollManager.scrollBy(h, 0, true)
  return cy.wait(1)
}
