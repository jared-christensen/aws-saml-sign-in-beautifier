import type { Options } from "~schema/options-schema";

// Moves favorite accounts to the top

export async function moveFavoriteAccounts(account: HTMLElement, options: Options) {
  const favoriteAccountsArray = options.favoriteAccounts;

  const favoriteAccounts = favoriteAccountsArray
    ? favoriteAccountsArray.split(",").map((account) => account.trim())
    : [];

  const accountNumber = account.querySelector(".account-number")?.textContent;
  const index = favoriteAccounts.indexOf(accountNumber);

  if (index !== -1) {
    account.classList.add("favorite-account");
    account.style.gridColumn = "span 2";

    const parent = account.parentElement;
    const siblings = Array.from(parent.children);

    // Find where to insert based on favoriteAccounts order
    const insertBeforeIndex = siblings.findIndex((sibling) => {
      const siblingNumber = sibling.querySelector(".account-number")?.textContent;
      const siblingIndex = favoriteAccounts.indexOf(siblingNumber);
      return siblingIndex > index || siblingIndex === -1;
    });

    if (insertBeforeIndex === -1) {
      parent.appendChild(account); // move to end
    } else {
      parent.insertBefore(account, siblings[insertBeforeIndex]);
    }
  }
}
