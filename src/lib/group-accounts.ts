import type { Options } from "~schema/options-schema";

import { parseRegEx } from "./parse-reg-ex";

function createHeader(text: string) {
  const header = document.createElement("div");
  header.className = "group-header";
  header.textContent = text;
  return header;
}

function addAccountsWithHeader(fragment: DocumentFragment, headerText: string, accounts: Element[]) {
  if (accounts.length === 0) return;

  if (headerText) {
    fragment.appendChild(createHeader(headerText));
  } else {
    const spacer = document.createElement("div");
    spacer.className = "group-spacer";
    fragment.appendChild(spacer);
  }

  accounts.forEach((acc) => fragment.appendChild(acc));
}

export async function groupAccounts(options?: Options) {
  const fieldset = document.querySelector("fieldset");
  if (!fieldset) return;

  const cards = Array.from(fieldset.querySelectorAll(":scope > .saml-account.card"));
  if (cards.length === 0) return;

  const favoriteAccountIds = options?.favoriteAccounts?.split(",").map((a) => a.trim()) ?? [];
  const hasGroups = options?.groups && options.groups.length > 0;
  const hasFavorites = favoriteAccountIds.length > 0;

  // If no grouping at all, don't reorganize
  if (!hasFavorites && !hasGroups) return;

  // Assign all accounts to groups (favorites = -2, configured groups = 0-N, ungrouped = -1)
  const accountGroups = new Map<Element, number>();
  cards.forEach((account) => {
    const accountNumber = account.querySelector(".account-number")?.textContent?.trim() ?? "";

    // Check if favorite
    if (hasFavorites && favoriteAccountIds.includes(accountNumber)) {
      account.classList.add("favorite-account");
      accountGroups.set(account, -2); // Favorites group
      return;
    }

    // Check configured groups
    if (hasGroups && options.groups) {
      const accountName = account.querySelector(".saml-account-name")?.textContent?.toLowerCase();
      if (accountName) {
        const groupIndex = options.groups.findIndex((group) => parseRegEx(group.regEx)?.test(accountName));
        accountGroups.set(account, groupIndex);
        return;
      }
    }

    // Default to ungrouped
    accountGroups.set(account, -1);
  });

  const fragment = document.createDocumentFragment();

  // Add favorites group
  if (hasFavorites) {
    const favorites = cards.filter((acc) => accountGroups.get(acc) === -2);
    addAccountsWithHeader(fragment, "Favorites", favorites);
  }

  // Add configured groups
  if (hasGroups && options.groups) {
    options.groups.forEach((group, i) => {
      const groupAccounts = cards.filter((acc) => accountGroups.get(acc) === i);
      addAccountsWithHeader(fragment, group.name, groupAccounts);
    });
  }

  // Add ungrouped accounts
  const ungrouped = cards.filter((acc) => accountGroups.get(acc) === -1);
  addAccountsWithHeader(fragment, "", ungrouped);

  // Preserve and rebuild fieldset
  const otherElements = Array.from(fieldset.children).filter(
    (child) =>
      !child.classList.contains("card") &&
      !child.classList.contains("group-header") &&
      !child.classList.contains("group-spacer")
  );

  fieldset.innerHTML = "";
  fieldset.appendChild(fragment);
  otherElements.forEach((el) => fieldset.appendChild(el));
}
