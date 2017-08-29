export const MOTHER32_SVG_WIDTH = 467;
export const MOTHER32_SVG_HEIGHT = 199;

export function getMother32Width(scale: number): number {
  return MOTHER32_SVG_WIDTH * scale;
}

export function getMother32Height(scale: number): number {
  return MOTHER32_SVG_HEIGHT * scale;
}

export function getMother32WidthPx(scale: number): string {
  return `${getMother32Width(scale)}px`;
}

export function getMother32HeightPx(scale: number): string {
  return `${getMother32Height(scale)}px`;
}
