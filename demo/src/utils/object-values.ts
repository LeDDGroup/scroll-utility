export { ObjectValues };

function ObjectValues<T, K extends keyof T>(obj: T): T[K][] {
  const keys: K[] = Object.keys(obj) as K[];
  return keys.map((key) => obj[key]);
}
