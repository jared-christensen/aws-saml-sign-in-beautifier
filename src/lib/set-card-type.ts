import type { Options } from "~schema/options-schema";

import { parseRegEx } from "./parse-reg-ex";

// Sets the card type based on the account name
export async function setCardType(account: HTMLElement, options: Options | undefined) {
  if (!options) return;

  const cautionRegEx = parseRegEx(options.cautionCardRegEx);
  const infoRegEx = parseRegEx(options.infoCardRegEx);

  const accountNameElement = account.querySelector(".saml-account-name");

  account.classList.add("card");

  if (accountNameElement?.textContent) {
    const text = accountNameElement.textContent.toLowerCase();
    const classes = [];

    if (cautionRegEx?.test(text)) {
      classes.push("caution");
    }
    if (infoRegEx?.test(text)) {
      classes.push("info");
    }

    if (classes.length > 0) {
      account.classList.add(...classes);
    }
  }
}
