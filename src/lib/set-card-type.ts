// Adds the "card" class to all account elements, transforming them into cards.
// Additionally, it sets the card color based on regular expressions defined in the options.

import type { Options } from "~schema/options-schema";

import { parseRegEx } from "./parse-reg-ex";

// Sets the card color based on the account name
export async function setCardType(account: HTMLElement, options?: Options) {
  account.classList.add("card");

  if (!options) return;

  const orangeRegEx = parseRegEx(options.cautionCardRegEx);
  const blueRegEx = parseRegEx(options.infoCardRegEx);
  const pinkRegEx = parseRegEx(options.color1CardRegEx);
  const tealRegEx = parseRegEx(options.color2CardRegEx);
  const purpleRegEx = parseRegEx(options.color3CardRegEx);

  const accountNameElement = account.querySelector(".saml-account-name");

  if (accountNameElement?.textContent) {
    const accountName = accountNameElement.textContent.toLowerCase();
    const classes = [];

    if (orangeRegEx?.test(accountName)) {
      classes.push("orange");
    }
    if (blueRegEx?.test(accountName)) {
      classes.push("blue");
    }
    if (pinkRegEx?.test(accountName)) {
      classes.push("pink");
    }
    if (tealRegEx?.test(accountName)) {
      classes.push("teal");
    }
    if (purpleRegEx?.test(accountName)) {
      classes.push("purple");
    }

    if (classes.length > 0) {
      account.classList.add(...classes);
    }
  }
}
