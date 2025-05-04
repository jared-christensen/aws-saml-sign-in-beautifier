import type { Options } from "~schema/options-schema";

export function setGridColumns(options?: Options) {
  if (options?.gridColumns) {
    document.documentElement.style.setProperty("--grid-columns", options.gridColumns.toString());
    if (Number(options?.gridColumns) <= 2) {
      document.documentElement.style.setProperty("--grid-container-width", "740px");
    }
  }
}
