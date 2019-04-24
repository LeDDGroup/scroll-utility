function takeScreenShot(delay: number = 0) {
  cy.wait(delay).then(() => cy.screenshot("basic", { capture: "viewport" }))
}

export { takeScreenShot }
