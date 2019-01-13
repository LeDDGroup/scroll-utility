import * as ScrollUtility from "../"

function takeScreenShot(delay: number = 0) {
  cy.wait(delay).then(() => cy.screenshot("basic", { capture: "viewport" }))
}

async function withWindow<T = void>(
  f: (window: Window & { ScrollUtility: typeof ScrollUtility }) => T,
) {
  return cy.window().then(wind => {
    f(wind as Window & { ScrollUtility: typeof ScrollUtility })
  })
}

async function withScrollManager<T = void>(f: (scrollManager: ScrollUtility.Scroll) => T) {
  return withWindow(window => {
    f(window.ScrollUtility.default)
  })
}

export { withWindow, takeScreenShot, withScrollManager }
