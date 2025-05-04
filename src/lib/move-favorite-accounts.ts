// Rearranges favorite accounts in the DOM based on user preferences.

import type { Options } from "~schema/options-schema";

export function moveFavoriteAccounts(account: HTMLElement, options?: Options) {
  const favoriteAccounts = options?.favoriteAccounts?.split(",").map((a) => a.trim()) ?? [];

  const accountNumber = account.querySelector(".account-number")?.textContent?.trim() ?? "";
  const index = favoriteAccounts.indexOf(accountNumber);

  if (index === -1) return;

  account.classList.add("favorite-account");
  // account.style.gridColumn = "span 2";

  const parent = account.parentElement;
  if (!parent) {
    console.warn("Parent element is null. Skipping account rearrangement.");
    return;
  }

  const siblings = Array.from(parent.children);

  const insertBeforeIndex = siblings.findIndex((sibling) => {
    if (sibling === account) return false;
    const siblingNumber = sibling.querySelector(".account-number")?.textContent?.trim() ?? "";
    const siblingIndex = favoriteAccounts.indexOf(siblingNumber);
    return siblingIndex > index || siblingIndex === -1;
  });

  const currentIndex = siblings.indexOf(account);
  const targetNode = siblings[insertBeforeIndex];

  if (insertBeforeIndex === -1) {
    if (parent.lastElementChild !== account) {
      parent.appendChild(account);
    }
  } else if (siblings[insertBeforeIndex] !== account && currentIndex !== insertBeforeIndex) {
    parent.insertBefore(account, targetNode);
  }
}
