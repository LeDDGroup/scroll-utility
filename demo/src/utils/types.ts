export { ElementToScroll, ScrollType };

enum ElementToScroll {
  e1 = "e1",
  e2 = "e2",
  e3 = "e3",
}

enum ScrollType {
  percent = "toPercent",
  position = "toPosition",
  element = "toElement",
  offset = "offset",
}
