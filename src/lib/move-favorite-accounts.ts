import type { Options } from "~schema/options-schema";

// Moves favorite accounts to the top

export async function moveFavoriteAccounts(account: HTMLElement, options: Options | undefined) {
  const favoriteAccountsArray = options?.favoriteAccounts;

  const favoriteAccounts = favoriteAccountsArray
    ? favoriteAccountsArray.split(",").map((account) => account.trim())
    : [];

  const accountNumber = account.querySelector(".account-number")?.textContent || "";
  const index = favoriteAccounts.indexOf(accountNumber);

  if (index !== -1) {
    account.classList.add("favorite-account");
    account.style.gridColumn = "span 2";

    const parent = account.parentElement;
    if (!parent) {
      console.warn("Parent element is null. Skipping account rearrangement.");
      return;
    }

    const siblings = Array.from(parent.children);

    const insertBeforeIndex = siblings.findIndex((sibling) => {
      const siblingNumber = sibling.querySelector(".account-number")?.textContent || "";
      const siblingIndex = favoriteAccounts.indexOf(siblingNumber);
      return siblingIndex > index || siblingIndex === -1;
    });

    if (insertBeforeIndex === -1) {
      parent.appendChild(account);
    } else {
      parent.insertBefore(account, siblings[insertBeforeIndex]);
    }
  }
}
