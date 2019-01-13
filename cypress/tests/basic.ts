context("ScrollUtility", () => {
  before(() => {
    cy.visit("http://localhost:8080")
  })
  it("should be defined", () => {
    cy.window().should("have.property", "ScrollUtility")
  })
})
