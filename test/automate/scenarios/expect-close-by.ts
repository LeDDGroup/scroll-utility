import expect from "expect"

export function expectCloseBy(actual: number, expected: number, amount: number = 1) {
  expect(actual).toBeGreaterThanOrEqual(expected - amount)
  expect(actual).toBeLessThanOrEqual(expected + amount)
}
