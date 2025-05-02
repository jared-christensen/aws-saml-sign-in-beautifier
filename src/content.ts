import type { PlasmoCSConfig } from "plasmo";

import { prettifyAccountLabels } from "~lib/prettify-account-labels";
import { prettifyButtons } from "~lib/prettify-buttons";

import "~styles/content/layout.css";
import "~styles/content/card.css";
import "~styles/content/button.css";
import "~styles/content/field.css";

import { Storage } from "@plasmohq/storage";

import { addAccountFilter } from "~lib/add-account-filter";
import { handleRoleButtonClicks } from "~lib/handle-role-button-clicks";
import { moveFavoriteAccounts } from "~lib/move-favorite-accounts";
import { setCardType } from "~lib/set-card-type";
import type { Options } from "~schema/options-schema";

export const config: PlasmoCSConfig = {
  matches: ["https://signin.aws.amazon.com/saml"],
  run_at: "document_end",
};

export {};

const processAccounts = async () => {
  const storage = new Storage();
  const options = await storage.get<Options>("options");

  const accountElements = document.querySelectorAll("fieldset > .saml-account");

  for (const account of accountElements) {
    if (account instanceof HTMLElement) {
      await Promise.all([
        prettifyAccountLabels(account, options),
        setCardType(account, options),
        prettifyButtons(account, options),
        moveFavoriteAccounts(account, options),
      ]);

      const containerElement = document.getElementById("container");
      if (containerElement) {
        containerElement.style.display = "block";
      }
    }
  }

  addAccountFilter();
  handleRoleButtonClicks();
};

processAccounts();
