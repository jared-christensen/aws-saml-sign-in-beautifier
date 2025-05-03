// Adds the "card" class to all account elements, transforming them into cards.
// Additionally, it sets the type of each card (e.g., caution or info) based on regular expressions defined in the options.

import type { Options } from "~schema/options-schema";

import { parseRegEx } from "./parse-reg-ex";

// Sets the card type based on the account name
export async function setCardType(account: HTMLElement, options?: Options) {
  account.classList.add("card");

  if (!options) return;

  const cautionRegEx = parseRegEx(options.cautionCardRegEx);
  const infoRegEx = parseRegEx(options.infoCardRegEx);

  const accountNameElement = account.querySelector(".saml-account-name");

  if (accountNameElement?.textContent) {
    const accountName = accountNameElement.textContent.toLowerCase();
    const classes = [];

    if (cautionRegEx?.test(accountName)) {
      classes.push("caution");
    }
    if (infoRegEx?.test(accountName)) {
      classes.push("info");
    }

    if (classes.length > 0) {
      account.classList.add(...classes);
    }
  }
}
