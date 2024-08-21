/* Elements */
const registerButton = document.getElementById("register-button");
const editButton = document.getElementById("edit-button");
const answerButton = document.getElementById("answer-button");
const deleteButton = document.getElementById("delete-button");
const deleteModal = document.getElementById("delete-modal");
const deleteCompleteModal = document.getElementById("delete-complete-modal");
const topButton = document.getElementById("top-button");
const modalDeleteButton = document.getElementById("modal-delete-button");
const completeTopButton = document.getElementById("complete-top-button");
const deleteSheetName = document.getElementById("delete-sheet-name");
const deleteCompleteText = document.getElementById("delete-complete-text");
const selectEditSheet = document.getElementById("select-edit-sheet");

/* Functions */
const getSheet = (sheetId, sheets) => {
  const sheet = sheets.find((sheet)=> sheet.id === sheetId)
  return sheet;
};

/* Scripts */
registerButton.addEventListener("click", () => {
  buttonClickedStyle(registerButton, buttonBeforeStyle, buttonAfterStyle);
  setTimeout(() => {
    redirect("./register.php");
  }, sec);
});

editButton.addEventListener("click", () => {
  buttonClickedStyle(editButton, buttonBeforeStyle, buttonAfterStyle);
  const id = selectEditSheet.value;
  setTimeout(() => {
    redirect(`./edit.php?id=${id}`);
  }, sec);
});

answerButton.addEventListener("click", () => {
  buttonClickedStyle(answerButton, buttonBeforeStyle, buttonAfterStyle);
  const id = selectEditSheet.value;
  setTimeout(() => {
    redirect(`./answer.php?id=${id}`);
  }, sec);
});

deleteButton.addEventListener("click", () => {
  buttonClickedStyle(deleteButton, buttonBeforeStyle, buttonAfterStyle);
  setButtonMouseLeaveStyle(deleteButton, buttonAfterStyle);
  const id = Number(selectEditSheet.value);
  const sheet = getSheet(id, sheets);
  if (!sheet) {
    deleteSheetName.innerText = "該当シートは存在しません";
  } else {
    deleteSheetName.innerText = sheet.name;
  }
  setTimeout(() => {
    openModal(deleteModal);
  }, sec);
});

topButton.addEventListener("click", () => {
  buttonClickedStyle(topButton, buttonBeforeStyle, buttonAfterStyle);
  setTimeout(() => {
    setButtonStyle(deleteButton, buttonBeforeStyle);
    setButtonMouseLeaveStyle(deleteButton, buttonBeforeStyle);
    closeModal(deleteModal);
  }, sec);
});

modalDeleteButton.addEventListener("click", () => {
  buttonClickedStyle(modalDeleteButton, buttonBeforeStyle, buttonAfterStyle);
  setTimeout(() => {
    closeModal(deleteModal);
    const id = selectEditSheet.value;
    fetch("api/delete.php", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: id,
    })
      .then((res) => res.json())
      .then((res) => {
        openModal(deleteCompleteModal);
        deleteCompleteText.innerText = "削除しました";
      })
      .catch((err) => {
        openModal(deleteCompleteModal);
        deleteCompleteText.innerText = "削除に失敗しました";
        console.log(err);
      });
  }, sec);
});

completeTopButton.addEventListener("click", () => {
  buttonClickedStyle(completeTopButton, buttonBeforeStyle, buttonAfterStyle);
  setTimeout(() => {
    setButtonStyle(deleteButton, buttonBeforeStyle);
    setButtonMouseLeaveStyle(deleteButton, buttonBeforeStyle);
    closeModal(deleteCompleteModal);
    redirect("./index.php");
  }, sec);
});
