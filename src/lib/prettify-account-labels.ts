// Prettifies the account labels by removing the account prefix and any unwanted text

import type { Options } from "~schema/options-schema";

import { parseRegEx } from "./parse-reg-ex";

export async function prettifyAccountLabels(account: HTMLElement, options: Options | undefined) {
  const removeFromAccountLabelRegEx = parseRegEx(options?.removeFromAccountLabelRegEx);
  const accountNameElement = account.querySelector(".saml-account-name");

  if (accountNameElement && accountNameElement.textContent) {
    accountNameElement.innerHTML = accountNameElement.textContent
      .replace(/\((\d+)\)/, '<span class="account-number">$1</span>')
      .replace(/^Account:\s*/, "")
      .replace(removeFromAccountLabelRegEx, "");
  }
}
