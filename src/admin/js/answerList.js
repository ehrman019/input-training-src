const searchSheetNumber = document.getElementById("search-sheet-number");
const searchButton = document.getElementById("search-button");
const backButton = document.getElementById("back-button");

searchButton.addEventListener("click", () => {
  buttonClickedStyle(searchButton, menuButtonBeforeStyle, menuButtonAfterStyle);
  $number = searchSheetNumber.value;
  setTimeout(() => {
    redirect(`./answer.php?id=${sheetId}&number=${$number}`);
  }, sec);
});
backButton.addEventListener("click", () => {
  buttonClickedStyle(backButton, menuButtonBeforeStyle, menuButtonAfterStyle);
  setTimeout(() => {
    redirect(`./answer.php?id=${sheetId}`);
  }, sec);
});
