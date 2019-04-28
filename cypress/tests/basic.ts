import * as ScrollUtility from "../../"

context("ScrollUtility", () => {
  before(() => {
    cy.visit("http://localhost:8080")
  })
  it("should be defined", () => {
    cy.window().should("have.property", "ScrollUtility")
  })
  centerTest("html", "#scrollable")
  centerTest("#scrollable", "#some-element")
})

function centerTest(wrapper: string, element: string) {
  describe(`centering element "${element}" in "${wrapper}"`, () => {
    ;[0, 100, 50].forEach(percent => {
      it(`should center at ${percent.toString()}%`, done => {
        cy.window()
          .then(window => {
            const Scroll = (window as Window & { ScrollUtility: typeof ScrollUtility })
              .ScrollUtility.Scroll
            new Scroll(wrapper, true).scrollTo(element, 50)
            new Scroll(wrapper).scrollTo(element, percent)
          })
          .wait(10)
          .window()
          .then(window => {
            const Scroll = (window as Window & { ScrollUtility: typeof ScrollUtility })
              .ScrollUtility.Scroll
            const scroll = new Scroll(wrapper)
            const innerScroll = new Scroll(element)
            expect(
              ((innerScroll.offset - scroll.offset) / (scroll.size - innerScroll.sizeWithBorders)) *
                100,
            ).to.be.eq(percent)
          })
          .screenshot(`${wrapper}-${element}-${percent}%`, { capture: "viewport" })
          .then(() => done())
      })
    })
  })
}
