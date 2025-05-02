export function addAccountFilter() {
  const filterContainer = document.createElement("div");
  filterContainer.classList.add("field");
  filterContainer.classList.add("filter");

  const filterInput = document.createElement("input");
  filterInput.id = "filter-input";
  filterInput.type = "text";
  filterInput.placeholder = "Filter by account name...";

  filterContainer.appendChild(filterInput);

  const form = document.querySelector("form");
  if (form) {
    form.insertBefore(filterContainer, form.firstChild);
  }

  filterInput.focus();

  filterInput.addEventListener("input", (e: Event) => {
    const target = e.target;
    if (target instanceof HTMLInputElement) {
      const filterValue = target.value.toLowerCase().replace(/[-_\s]/g, "");
      const cards = document.querySelectorAll(".card");

      cards.forEach((card) => {
        const accountName = card
          .querySelector(".saml-account-name")
          .textContent.toLowerCase()
          .replace(/[-_\s]/g, "");
        if (accountName.includes(filterValue)) {
          card.classList.add("show");
          card.classList.remove("hide");
        } else {
          card.classList.add("hide");
          card.classList.remove("show");
        }
      });
    }
  });
}
