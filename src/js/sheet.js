/* Elements */
const pageNum = document.getElementById("page-num");
const sheetNumber = document.getElementById("sheet-number");
const sheetDate = document.getElementById("sheet-date");
const firstButton = document.getElementById("first-button");
const prevButton = document.getElementById("prev-button");
const nextButton = document.getElementById("next-button");
const deletePageButtonContainer = document.getElementById(
  "delete-page-button-container"
);
const finishButton = document.getElementById("finish-button");
const sheetModal = document.getElementById("sheet-modal");
const modalFinishButton = document.getElementById("modal-finish-button");
const modalBackButton = document.getElementById("modal-back-button");

/* Functions */
const getInputDataList = (inputDataList, sheetId) => {
  const list = inputDataList.filter(
    (inputData) => inputData.answer_sheet.sheet_id === sheetId
  );
  return list;
};

const getRemovedInputDataList = (inputDataList, page) => {
  const list = inputDataList.filter((inputData) => inputData.page !== page);
  return list;
};

const getInputDataKey = (inputDataList, page, sheetId) => {
  const idx = inputDataList.findIndex(
    (inputData) =>
      inputData.page === page && inputData.answer_sheet.sheet_id === sheetId
  );
  return idx;
};

const setData = (sheetId, page) => {
  let answers = [];

  for (const input of inputs) {
    const inputData = document.getElementsByName(
      `${input.question_id}-${input.input_id}`
    );
    let answer = "";
    let answerText = "";
    if (input.kind === 1) {
      for (const data of inputData) {
        if (data.checked) {
          answer = data.value;
          break;
        }
      }
    } else if (input.kind === 2) {
      for (const data of inputData) {
        if (data.checked) {
          answer += `${data.value},`;
        }
      }
      answer = answer.slice(0, -1);
    } else if (input.kind === 3 || input.kind === 4 || input.kind === 5) {
      answer = inputData[0].value;
    } else {
      answerText = inputData[0].value;
    }
    answers.push({
      id: "",
      answer_sheet_id: "",
      question_id: input.question_id,
      input_id: input.input_id,
      answer: answer,
      answer_text: answerText,
    });
  }

  const tmpInputData = {
    page: page,
    answer_sheet: {
      id: "",
      sheet_id: sheetId,
      sheet_number: sheetNumber.value,
      sheet_date: sheetDate.value,
    },
    answers: answers,
  };

  const inputDataList = getLocalStorageArray("inputDataList");
  const idx = getInputDataKey(inputDataList, page, sheetId);
  idx >= 0
    ? (inputDataList[idx] = tmpInputData)
    : inputDataList.push(tmpInputData);
  setLocalStorage("inputDataList", inputDataList);
};

const getData = (inputDataList, page) => {
  const data = inputDataList.find((inputData) => inputData.page === page);
  return data;
};

const getAnswerKey = (answers, question_id, input_id) => {
  let res = -1;
  let key = 0;
  for (const answer of answers) {
    if (answer.question_id === question_id && answer.input_id === input_id) {
      res = key;
    }
    key++;
  }
  return res;
};

const insertDeletePageButton = () => {
  deletePageButtonContainer.innerHTML =
    '<button type="button" class="menu-button menu-button-long menu-button-inversion" id="delete-page-button" data-menu-button="long">ページ消去</button>';
};

const clickDeletePageButtonHandler = () => {
  const deletePageButton = document.getElementById("delete-page-button");
  deletePageButton.addEventListener("click", () => {
    buttonClickedStyle(
      deletePageButton,
      menuLongButtonBeforeStyle,
      menuLongButtonAfterStyle
    );
    setTimeout(() => {
      if (page === inputDataList.length) {
        const inputDataList = getLocalStorageArray("inputDataList");
        setLocalStorage(
          "inputDataList",
          getRemovedInputDataList(inputDataList, page)
        );
      }
      redirect(`./sheet.php?id=${sheetId}&page=${page - 1}`);
    }, sec);
  });
};

/* Scripts */
const inputDataList = getInputDataList(
  getLocalStorageArray("inputDataList"),
  sheetId
);
const data = getData(inputDataList, page);

// 入力済みデータの流し込み
if (!data) {
  if (page !== 1) {
    insertDeletePageButton();
    buttonsStyle();
    clickDeletePageButtonHandler();
  }
  pageNum.innerText = inputDataList.length + 1;
} else {
  if (page === inputDataList.length && page !== 1) {
    insertDeletePageButton();
    buttonsStyle();
    clickDeletePageButtonHandler();
  }
  pageNum.innerText = inputDataList.length;
  const answer_sheet = data.answer_sheet;
  sheetNumber.value = answer_sheet.sheet_number;
  sheetDate.value = answer_sheet.sheet_date;

  const answers = data.answers;
  for (const input of inputs) {
    const answerKey = getAnswerKey(answers, input.question_id, input.input_id);
    const answer = answers[answerKey];
    const inputData = document.getElementsByName(
      `${input.question_id}-${input.input_id}`
    );

    if (input.kind === 1 || input.kind === 3) {
      for (const data of inputData) {
        if (data.value === answer.answer) {
          data.checked = true;
          break;
        }
      }
    } else if (input.kind === 2) {
      for (const data of inputData) {
        const valueArray = answer.answer.split(",");
        for (const value of valueArray) {
          if (data.value === value) {
            data.checked = true;
          }
        }
      }
    } else if (input.kind === 4 || input.kind === 5) {
      inputData[0].value = answer.answer;
    } else {
      inputData[0].value = answer.answer_text;
    }
  }
}

nextButton.addEventListener("click", () => {
  buttonClickedStyle(nextButton, menuButtonBeforeStyle, menuButtonAfterStyle);
  setData(sheetId, page);
  setTimeout(() => {
    redirect(`./sheet.php?id=${sheetId}&page=${page + 1}`);
  }, sec);
});

prevButton.addEventListener("click", () => {
  buttonClickedStyle(prevButton, menuButtonBeforeStyle, menuButtonAfterStyle);
  setData(sheetId, page);
  setTimeout(() => {
    redirect(`./sheet.php?id=${sheetId}&page=${Math.max(1, page - 1)}`);
  }, sec);
});

firstButton.addEventListener("click", () => {
  buttonClickedStyle(
    firstButton,
    menuLongButtonBeforeStyle,
    menuLongButtonAfterStyle
  );
  setData(sheetId, page);
  setTimeout(() => {
    redirect(`./sheet.php?id=${sheetId}&page=1`);
  }, sec);
});

finishButton.addEventListener("click", () => {
  buttonClickedStyle(finishButton, buttonBeforeStyle, buttonAfterStyle);
  setButtonMouseLeaveStyle(finishButton, buttonAfterStyle);
  setData(sheetId, page);
  setTimeout(() => {
    openModal(sheetModal);
  }, sec);
});

modalFinishButton.addEventListener("click", () => {
  buttonClickedStyle(modalFinishButton, buttonBeforeStyle, buttonAfterStyle);
  setTimeout(() => {
    setButtonMouseLeaveStyle(finishButton, buttonBeforeStyle);
    redirect(`./result.php?id=${sheetId}`);
  }, sec);
});

modalBackButton.addEventListener("click", () => {
  buttonClickedStyle(modalBackButton, buttonBeforeStyle, buttonAfterStyle);
  setTimeout(() => {
    setButtonStyle(finishButton, buttonBeforeStyle);
    setButtonMouseLeaveStyle(finishButton, buttonBeforeStyle);
    closeModal(sheetModal);
  }, sec);
});
