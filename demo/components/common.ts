import { ChangeEvent } from "react"

export type InputTypes = HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement

export function onChange<T extends InputTypes>(handler: (value: string) => void) {
  return (ev: ChangeEvent<T>) => {
    handler(ev.target.value)
  }
}

export function toNumber(handler: (value: number) => void) {
  return (value: string) => {
    handler(parseInt(value, 10))
  }
}

export function toArray<T extends number | string>(handler: (value: T[]) => void) {
  return (value: T) => {
    handler([value])
  }
}

export default onChange
