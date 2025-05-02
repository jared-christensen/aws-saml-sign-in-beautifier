import type { Options } from "~schema/options-schema";

import { parseRegEx } from "./parse-reg-ex";

// Prettifies the buttons by removing any unwanted text and setting button prominence
export async function prettifyButtons(account: HTMLElement, options: Options) {
  const removeFromButtonLabelRegEx = parseRegEx(options.removeFromButtonLabelRegEx);
  const primaryButtonRegEx = parseRegEx(options.primaryButtonRegEx);

  account.querySelectorAll(".saml-role.clickable-radio").forEach((container) => {
    const radioElement = container.querySelector('input[type="radio"]');
    if (radioElement instanceof HTMLInputElement) {
      const radio = radioElement;
      const label = container.querySelector("label");

      const roleValue = radio.value;

      let labelText = label.textContent.trim();
      labelText = labelText.replace(removeFromButtonLabelRegEx, "");

      const button = document.createElement("button");
      button.type = "button";
      button.textContent = labelText;
      button.classList.add("btn");
      button.dataset.roleValue = roleValue;

      if (primaryButtonRegEx && primaryButtonRegEx.test(labelText)) {
        button.classList.add("primary-btn");
      } else {
        button.classList.add("secondary-btn");
      }

      container.replaceWith(button);
    }
  });
}
