// tslint:disable
import { ISettings } from "./scroll"

export type EasingFunction = (
  currentStep: number,
  offsetValue: number,
  distance: number,
  totalSteps: number,
) => number

export const defaultEasingFunction: EasingFunction = (
  currentStep: number,
  offsetValue: number,
  distance: number,
  totalSteps: number,
) => {
  currentStep /= totalSteps / 2
  if (currentStep < 1) return (distance / 2) * currentStep * currentStep + offsetValue
  currentStep--
  return (-distance / 2) * (currentStep * (currentStep - 2) - 1) + offsetValue
}

export const defaultSettings: ISettings = {
  easing: defaultEasingFunction,
  onScroll: null,
  onUtilityScroll: null,
  onExternalScroll: null,
  options: {
    duration: 1000,
    horizontal: false,
  },
}

export default defaultSettings
