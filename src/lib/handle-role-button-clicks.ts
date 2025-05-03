// This file defines the `handleRoleButtonClicks` function, which adds event listeners to role buttons on a SAML form.
// When a button is clicked, it dynamically creates a hidden input field,
// sets its value based on the button's dataset,
// appends it to the form, and submits the form.

export function handleRoleButtonClicks() {
  const form = document.querySelector("#saml_form");

  if (form instanceof HTMLFormElement) {
    document.querySelectorAll("button[data-role-value]").forEach((button) => {
      if (button instanceof HTMLButtonElement) {
        button.addEventListener("click", function (this: HTMLButtonElement, e: MouseEvent) {
          const hiddenInput = document.createElement("input");
          hiddenInput.type = "hidden";
          hiddenInput.name = "roleIndex";
          hiddenInput.value = this.dataset.roleValue || ""; // Fallback to an empty string if undefined
          form.appendChild(hiddenInput);
          form.submit();
        });
      }
    });
  }
}
