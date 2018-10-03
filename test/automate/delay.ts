export function delay(duration: number): Promise<void> {
  return new Promise<void>(success => {
    setTimeout(() => {
      success()
    }, duration)
  })
}
