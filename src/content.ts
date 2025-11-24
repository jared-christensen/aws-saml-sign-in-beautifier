import type { PlasmoCSConfig } from "plasmo";

import { Storage } from "@plasmohq/storage";

import { addAccountFilter } from "~lib/add-account-filter";
import { groupAccounts } from "~lib/group-accounts";
import { handleRoleButtonClicks } from "~lib/handle-role-button-clicks";
import { prettifyAccountLabels } from "~lib/prettify-account-labels";
import { prettifyButtons } from "~lib/prettify-buttons";
import { setCardType } from "~lib/set-card-type";
import { setGridColumns } from "~lib/set-grid-columns";
import type { Options } from "~schema/options-schema";

import "~styles/content/button.css";
import "~styles/content/card.css";
import "~styles/content/field.css";
import "~styles/content/layout.css";

export const config: PlasmoCSConfig = {
  matches: ["https://signin.aws.amazon.com/saml", "https://*.signin.aws.amazon.com/saml"],
  run_at: "document_end",
};

export {};

const processAccounts = async () => {
  const storage = new Storage();
  const options = await storage.get<Options>("options");

  setGridColumns(options);

  const accountElements = document.querySelectorAll("fieldset > .saml-account");

  for (const account of accountElements) {
    if (!(account instanceof HTMLElement)) continue;

    await Promise.all([
      prettifyAccountLabels(account, options),
      setCardType(account, options),
      prettifyButtons(account, options),
    ]);
  }

  await groupAccounts(options);
  addAccountFilter();
  handleRoleButtonClicks();

  const containerElement = document.getElementById("container");
  if (containerElement) {
    containerElement.style.display = "block";
  }

  // Focus filter input after all DOM operations
  const filterInput = document.getElementById("filter-input") as HTMLInputElement;
  if (filterInput) {
    filterInput.focus();
  }
};

processAccounts();
