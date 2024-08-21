const buttons = document.querySelectorAll("[data-button]");
const menuButtons = document.querySelectorAll("[data-menu-button]");

for (const button of buttons) {
  button.style.transition = null;
  setButtonStyle(button, buttonBeforeStyle);
  button.addEventListener("mouseover", () => {
    button.style.transition = "0.3s";
    setButtonStyle(button, buttonAfterStyle);
  });

  button.addEventListener("mouseleave", () => {
    setButtonStyle(button, buttonBeforeStyle);
  });
}

for (const menuButton of menuButtons) {
  menuButton.style.transition = null;
  setButtonStyle(menuButton, menuButtonBeforeStyle);
  menuButton.addEventListener("mouseover", () => {
    menuButton.style.transition = "0.3s";
    setButtonStyle(menuButton, menuButtonAfterStyle);
  });
  menuButton.addEventListener("mouseleave", () => {
    setButtonStyle(menuButton, menuButtonBeforeStyle);
  });
}
