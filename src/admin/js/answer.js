/* Elements */
const sheetNumber = document.getElementById("sheet-number");
const sheetDate = document.getElementById("sheet-date");
const invalid = document.getElementById("invalid");
const menuSubmitInvalid = document.getElementById("menu-submit-invalid");
const updateModal = document.getElementById("update-modal");
const updateButton = document.getElementById("update-button");
const correctButton = document.getElementById("correct-button");
const searchSheetNumber = document.getElementById("search-sheet-number");
const searchButton = document.getElementById("search-button");
const deleteButton = document.getElementById("delete-button");
const listButton = document.getElementById("list-button");
const submitButton = document.getElementById("submit-button");

/* Functions */
const updateModalClickHandler = (formData) => {
  updateButton.addEventListener("click", () => {
    buttonClickedStyle(updateButton, buttonBeforeStyle, buttonAfterStyle);
    setTimeout(() => {
      fetch("api/insert_answer.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      })
        .then((res) => res.json())
        .then((res) => {
          closeModal(updateModal);
          redirect(
            `./answer.php?id=${res.sheet_id}&register=${res.sheet_number}`
          );
        })
        .catch((err) => {
          closeModal(updateModal);
          invalid.innerText = "⚠登録に失敗しました";
          console.log(err);
        });
    }, sec);
  });
  correctButton.addEventListener("click", () => {
    buttonClickedStyle(correctButton, buttonBeforeStyle, buttonAfterStyle);
    setTimeout(() => {
      setButtonStyle(submitButton, menuButtonBeforeStyle);
      setButtonMouseLeaveStyle(submitButton, menuButtonBeforeStyle);
      closeModal(updateModal);
    }, sec);
  });
};

/* Scripts */
const perfEntries = performance.getEntriesByType("navigation");
if (perfEntries[0].type === "reload") {
  redirect(`./answer.php?id=${sheetId}`);
}
submitButton.addEventListener("click", () => {
  buttonClickedStyle(submitButton, menuButtonBeforeStyle, menuButtonAfterStyle);
  setButtonMouseLeaveStyle(submitButton, menuButtonAfterStyle);
  //バリデーション：ナンバーのみ
  let isValid = true;
  if (!sheetNumber.value.match(/^\d{1,255}$/)) {
    setErrStyle(sheetNumber, "6px");
    invalid.innerText = "⚠No. に数字を入力してください";
    invalid.style.color = "var(--err)";
    invalid.style.fontWeight = "500";
    isValid = false;
  } else {
    invalid.innerText = "";
    removeErrStyle(sheetNumber);
  }

  let tmpData = [];
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
    tmpData.push({
      id: "",
      answer_sheet_id: "",
      question_id: input.question_id,
      input_id: input.input_id,
      answer: answer,
      answer_text: answerText,
    });
  }
  if (isValid) {
    const formData = {
      update: false,
      answer_sheet: {
        id: "",
        sheet_id: sheetId,
        sheet_number: sheetNumber.value,
        sheet_date: sheetDate.value,
      },
      answers: tmpData,
    };
    fetch("api/insert_answer.php", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    })
      .then((res) => res.json())
      .then((res) => {
        if (!res.update) {
          redirect(`./answer.php?id=${sheetId}&register=${sheetNumber.value}`);
        } else {
          // 上書きOKかのアラート
          openModal(updateModal);
          updateModalClickHandler(res);
        }
      })
      .catch((err) => {
        invalid.innerText = "⚠登録に失敗しました";
        console.log(err);
      });
  }
});

searchButton.addEventListener("click", () => {
  buttonClickedStyle(searchButton, menuButtonBeforeStyle, menuButtonAfterStyle);
  number = searchSheetNumber.value;
  setTimeout(() => {
    redirect(`./answer.php?id=${sheetId}&number=${number}`);
  }, sec);
});

deleteButton.addEventListener("click", () => {
  buttonClickedStyle(deleteButton, menuButtonBeforeStyle, menuButtonAfterStyle);
  number = searchSheetNumber.value;
  setTimeout(() => {
    fetch("api/delete_answer.php", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: sheetId, number: number }),
    })
      .then((res) => res.json())
      .then((res) => {
        if (res) {
          redirect(`./answer.php?id=${sheetId}&delete=${number}`);
        } else {
          menuSubmitInvalid.innerText = "このNo.は存在しません";
        }
      })
      .catch((err) => {
        menuSubmitInvalid.innerText = "⚠エラーが起きました";
        console.log(err);
      });
  }, sec);
});

listButton.addEventListener("click", () => {
  buttonClickedStyle(listButton, menuButtonBeforeStyle, menuButtonAfterStyle);
  setTimeout(() => {
    redirect(`./answer_list.php?id=${sheetId}`);
  }, sec);
});
