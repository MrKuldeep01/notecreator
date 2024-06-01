document.addEventListener("DOMContentLoaded", () => {
  const newnameInput = document.getElementById("newname");

  newnameInput.addEventListener("input", (event) => {
    const value = event.target.value;
    if (/\./.test(value)) {
      event.target.value = value.replace(/\./g, "");
    }
  });

  newnameInput.addEventListener("keypress", (event) => {
    if (event.key === ".") {
      event.preventDefault();
    }
  });
});
