import * as ScrollUtility from "../../"

context("Misc", () => {
  before(() => {
    cy.visit("http://localhost:8080")
  })
  beforeEach(done => {
    cy.window()
      .then(wind => {
        const Scroll = (wind as Window & { ScrollUtility: typeof ScrollUtility }).ScrollUtility
          .Scroll
        new Scroll().scrollTo(0)
        new Scroll(document.documentElement, true).scrollTo(0)
      })
      .then(() => done())
  })
  describe("getDistToElement", () => {
    it("should work", done => {
      centerElement(0)
        .screenshot("top", { capture: "viewport" })
        .then(() => centerElement(50))
        .screenshot("centered", { capture: "viewport" })
        .then(() => centerElement(100))
        .screenshot("bottom", { capture: "viewport" })
        .then(() => done())
    })
  })
})

function centerElement(percent: number) {
  return cy
    .window()
    .then(wind => {
      const Scroll = (wind as Window & { ScrollUtility: typeof ScrollUtility }).ScrollUtility.Scroll
      const element = wind.document.getElementById("some-element")
      new Scroll((wind as Window).document.documentElement, true).centerElement(element, 50)
      new Scroll((wind as Window).document.documentElement).centerElement(element, percent)
    })
    .wait(1000)
}
