/* Elements */
const selectSheet = document.getElementById("select-sheet");
const startButton = document.getElementById("start-button");
const resultButton = document.getElementById("result-button");
const indexModal = document.getElementById("index-modal");
const modalRestartButton = document.getElementById("modal-restart-button");
const modalStartButton = document.getElementById("modal-start-button");

/* Functions */
const inputDataExists = (inputDataList, sheetId) => {
  const data = inputDataList.find(
    (inputData) => inputData.answer_sheet.sheet_id === sheetId
  );
  return data ? true : false;
};

const getRemovedInputDataList = (inputDataList, sheetId) => {
  const list = inputDataList.filter(
    (inputData) => inputData.answer_sheet.sheet_id !== sheetId
  );
  return list;
};

/* Scripts */
startButton.addEventListener("click", () => {
  buttonClickedStyle(startButton, buttonBeforeStyle, buttonAfterStyle);
  const id = Number(selectSheet.value);
  const inputDataList = getLocalStorageArray("inputDataList");
  if (!inputDataExists(inputDataList, id)) {
    setTimeout(() => {
      removeLocalStorage(resultKeys);
      redirect(`./sheet.php?id=${id}&page=1`);
    }, sec);
  } else {
    setTimeout(() => {
      openModal(indexModal);
    }, sec);
  }
});

resultButton.addEventListener("click", () => {
  buttonClickedStyle(resultButton, buttonBeforeStyle, buttonAfterStyle);
  const id = Number(selectSheet.value);
  setTimeout(() => {
    redirect(`./result.php?id=${id}&prev=1`);
  }, sec);
});

modalRestartButton.addEventListener("click", () => {
  buttonClickedStyle(modalRestartButton, buttonBeforeStyle, buttonAfterStyle);
  const id = Number(selectSheet.value);
  setTimeout(() => {
    removeLocalStorage(resultKeys);
    redirect(`./sheet.php?id=${id}&page=1`);
  }, sec);
});

modalStartButton.addEventListener("click", () => {
  buttonClickedStyle(modalStartButton, buttonBeforeStyle, buttonAfterStyle);
  const id = Number(selectSheet.value);
  const inputDataList = getLocalStorageArray("inputDataList");
  setLocalStorage("inputDataList", getRemovedInputDataList(inputDataList, id));
  setTimeout(() => {
    removeLocalStorage(resultKeys);
    redirect(`./sheet.php?id=${id}&page=1`);
  }, sec);
});
