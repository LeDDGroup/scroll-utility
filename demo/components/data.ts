import { IProps as IScrollScenario } from "./Section"
import scrollManager from "./window-scroll-manager"

export enum Direction {
  horizontal = "horizontal",
  vertical = "vertical",
  both = "both",
}

declare const window: Window & {
  scrollManager: typeof scrollManager
}

window.scrollManager = scrollManager

export const scenarios: ({
  description: string
  scenarios: IScrollScenario[]
})[] = [
  {
    description: "scroll.toPercent",
    scenarios: [getScrollToPercent(50), getScrollToPercent(100)],
  },
  {
    description: "scroll.toElement",
    scenarios: [getScrollToElement(0), getScrollToElement(50)],
  },
]

function getScrollToElement(percent: number) {
  return {
    description: `scroll to "#some-element" at ${percent}%`,
    script: () => {
      const someElement = document.getElementById("some-element")
      scrollManager.centerElement(someElement!, { value: percent })
    },
    code: `const someElement = document.getElementById("some-element") \n scrollManager.scroll.toElement(someElement, { center: ${percent}, duration: 1000 })`,
  }
}

function getScrollToPercent(percent: number) {
  return {
    description: `scroll to the ${percent}% of the page`,
    script: () => {
      scrollManager.scrollTo("percent", { value: percent })
    },
    code: `scrollManager.scroll.toPercent(${percent}, { duration: 1000 })`,
  }
}
