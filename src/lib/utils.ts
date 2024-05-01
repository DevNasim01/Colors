import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import { colord, extend } from "colord";
import a11yPlugin from "colord/plugins/a11y";

extend([a11yPlugin]);

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const handelTextColor = (color: string) => {
  const lumi = colord(color).luminance();

  return lumi < 0.3 ? "white" : "black";
}
