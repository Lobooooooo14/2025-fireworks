export type ColorRGB = { r: number; g: number; b: number }

export function choice<T>(array: T[]): T {
  return array[Math.floor(Math.random() * array.length)]
}

export function randomColorRGB(): ColorRGB {
  return {
    r: Math.floor(Math.random() * 255),
    g: Math.floor(Math.random() * 255),
    b: Math.floor(Math.random() * 255),
  }
}
