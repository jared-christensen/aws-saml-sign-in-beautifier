// This file defines the `addAccountFilter` function, which dynamically adds a filter input field to the DOM.
// The filter allows users to search and filter account cards by their names in real-time.

function filterCards(filterValue: string) {
  const cards = document.querySelectorAll(".card");

  cards.forEach((card) => {
    const nameElement = card.querySelector(".saml-account-name");
    const accountName = nameElement?.textContent?.toLowerCase().replace(/[-_\s]/g, "") || "";

    if (accountName.includes(filterValue)) {
      card.classList.add("show");
      card.classList.remove("hide");
    } else {
      card.classList.add("hide");
      card.classList.remove("show");
    }
  });
}

export function addAccountFilter() {
  const filterContainer = document.createElement("div");
  filterContainer.classList.add("field", "filter");

  const filterInput = document.createElement("input");
  filterInput.id = "filter-input";
  filterInput.type = "text";
  filterInput.placeholder = "Filter by account name...";

  filterContainer.appendChild(filterInput);

  const form = document.querySelector("form");
  if (!form) {
    return;
  }

  form.insertBefore(filterContainer, form.firstChild);
  filterInput.focus();

  filterInput.addEventListener("input", (e: Event) => {
    const target = e.target;
    if (target instanceof HTMLInputElement) {
      const filterValue = target.value.toLowerCase().replace(/[-_\s]/g, "");
      filterCards(filterValue);
    }
  });
}
