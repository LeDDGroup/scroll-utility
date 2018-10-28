import { Data } from "./components/Section"
import BasicUsage from "./docs/basic-usage.md"
import Installation from "./docs/installation.md"
import ScrollContainer from "./docs/scroll-container.md"
import Support from "./docs/support.md"

export enum Colors {
  primary = "dodgerblue",
  secondary = "#3f4c6b",
  tertiary = "#4f85bb",
  black = "#2B2D27",
  background = "#fcfff4",
  transparent = "rgba(252, 255, 244, 0.8)",
}

const data: Data[] = [
  {
    title: "Basic usage",
    content: [BasicUsage],
  },
  {
    title: "Installation",
    content: [Installation],
  },
  {
    title: "Usage",
    content: [
      {
        title: "Specify scroll container",
        content: [ScrollContainer],
      },
      {
        title: "Scroll to specific places in scroll",
        content: [],
      },
    ],
  },
  {
    title: "Support",
    content: [Support],
  },
]

export { data }
