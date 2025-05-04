import type { Options } from "~schema/options-schema";

export function setGridColumns(options?: Options) {
  if (options?.gridColumns) {
    document.documentElement.style.setProperty("--grid-columns", options.gridColumns.toString());
  }
}
