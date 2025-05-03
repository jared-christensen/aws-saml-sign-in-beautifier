import type { Options } from "~schema/options-schema";

import { parseRegEx } from "./parse-reg-ex";

// Replaces SAML role radio containers with buttons, cleaning up labels and styling by regex match.
export function prettifyButtons(account: HTMLElement, options?: Options) {
  const removeFromButtonLabelRegEx = parseRegEx(options?.removeFromButtonLabelRegEx);
  const primaryButtonRegEx = parseRegEx(options?.primaryButtonRegEx);

  account.querySelectorAll(".saml-role.clickable-radio").forEach((container) => {
    const radioElement = container.querySelector('input[type="radio"]');
    const label = container.querySelector("label");

    if (!(radioElement instanceof HTMLInputElement) || !label?.textContent) {
      return;
    }

    const roleValue = radioElement.value;
    let labelText = label.textContent.trim();
    labelText = labelText.replace(removeFromButtonLabelRegEx, "");

    const button = document.createElement("button");
    button.type = "button";
    button.textContent = labelText;
    button.classList.add("btn");
    button.dataset.roleValue = roleValue;

    if (primaryButtonRegEx?.test(labelText)) {
      button.classList.add("primary-btn");
    } else {
      button.classList.add("secondary-btn");
    }

    container.replaceWith(button);
  });
}
