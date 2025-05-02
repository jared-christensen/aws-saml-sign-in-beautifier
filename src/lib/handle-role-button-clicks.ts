// When you click a role button, this picks the role and submits the form
export function handleRoleButtonClicks() {
  const form = document.querySelector("#saml_form");

  if (form instanceof HTMLFormElement) {
    document.querySelectorAll("button[data-role-value]").forEach((button) => {
      if (button instanceof HTMLButtonElement) {
        button.addEventListener("click", (e: MouseEvent & { currentTarget: HTMLButtonElement }) => {
          const hiddenInput = document.createElement("input");
          hiddenInput.type = "hidden";
          hiddenInput.name = "roleIndex";
          hiddenInput.value = e.currentTarget.dataset.roleValue;
          form.appendChild(hiddenInput);
          form.submit();
        });
      }
    });
  }
}
