import type { Options } from "~schema/options-schema";

import { parseRegEx } from "./parse-reg-ex";

// Sets the card type based on the account name

export async function setCardType(account: HTMLElement, options: Options) {
  const cautionCardRegEx = parseRegEx(options.cautionCardRegEx);
  const infoCardRegEx = parseRegEx(options.infoCardRegEx);
  const nameElement = account.querySelector(".saml-account-name");

  account.classList.add("card");
  if (nameElement) {
    const text = nameElement.textContent.toLowerCase();
    if (cautionCardRegEx && cautionCardRegEx.test(text)) {
      account.classList.add("caution");
    }
    if (infoCardRegEx && infoCardRegEx.test(text)) {
      account.classList.add("info");
    }
  }
}
