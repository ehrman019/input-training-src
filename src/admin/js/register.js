/* Elements */
// Question
const addQuestionButton = document.getElementById("add-question-button");
const addQuestionTop = document.getElementById("add-question-top");
const addQuestionForm = document.getElementById("add-question-form");
const decQuestionButton = document.getElementById("dec-question-button");
const decQuestionTop = document.getElementById("dec-question-top");
const decQuestionForm = document.getElementById("dec-question-form");

// Modal
const restoreModal = document.getElementById("restore-modal");
const restoreQuestionNum = document.getElementById("restore-question-num");
const restoreButton = document.getElementById("restore-button");
const restoreForm = document.getElementById("restore-form");
const resetButton = document.getElementById("reset-button");
const resetForm = document.getElementById("reset-form");

const completeModal = document.getElementById("complete-modal");
const answerButton = document.getElementById("answer-button");
const topButton = document.getElementById("top-button");

// Submit
const submitButton = document.getElementById("submit-button");

/* Scripts */
const sheetId = 0; // insert後に決定
let sheet = getLocalStorage("sheet");
let questions = getLocalStorageArray("questions");
let inputs = getLocalStorageArray("inputs");
let choices = getLocalStorageArray("choices");

const perfEntries = performance.getEntriesByType("navigation");
// ローカルストレージにデータがあるとき
// 情報を復元するか確認する（モーダル表示）
if (sheet && unfinished && perfEntries[0].type !== "reload") {
  openModal(restoreModal);
  restoreQuestionNum.value = questions.length;
  restoreModalClickHandler(registerKeys);
} else if (perfEntries[0].type === "reload") {
  //リロード時はモーダル表示なし
  restoreQuestionNum.value = questions.length;
  restoreForm.submit();
} else if (sheet) {
  // データを元にHTMLを生成
  for (const input of inputs) {
    addInput(input.question_id, input.input_id);
    addChoice(
      input.question_id,
      input.input_id,
      input.kind,
      getChoicesNum(input.sheet_id, input.question_id, input.input_id, choices)
    );
  }
  changeSheetHandler(sheetId, "sheet");
  changeQuestionsHandler(questions, "questions");
  changeInputHandler(inputs, "inputs");
  changeChoicesHandler(choices, "choices");
  setValues(sheet, questions, inputs, choices);
} else {
  // 新規作成
  setLocalStorage("sheet", { id: sheetId, name: "" });
  questions.push({ id: "", sheet_id: sheetId, question_id: 1, name: "" });
  setLocalStorage("questions", questions);
  changeSheetHandler(sheetId, "sheet");
  changeQuestionsHandler(questions, "questions");
}

// ページ遷移前の位置にスクロール
window.scrollTo({
  top: y,
  left: 0,
  behavior: "instant",
});

//フォームの再送信アラート回避
history.pushState(null, null, location.href);
window.addEventListener("popstate", function () {
  history.pushState(null, null, location.href);
});

addQuestionButton.addEventListener("click", (e) => {
  e.preventDefault();
  if (questionNum >= 10) {
    invalid.innerText = "質問は10問までです";
  } else {
    questions.push({
      id: "",
      sheet_id: sheetId,
      question_id: questionNum + 1,
      name: "",
    });
    setLocalStorage("questions", questions);
    changeQuestionsHandler(questions);
    addQuestionTop.value = window.scrollY;
    addQuestionForm.submit();
  }
});

decQuestionButton.addEventListener("click", (e) => {
  e.preventDefault();
  questions.pop();
  setLocalStorage("questions", questions);
  setLocalStorage("inputs", getRemovedInputs(questionNum, null, inputs));
  setLocalStorage("choices", getRemovedChoices(questionNum, null, choices));
  changeQuestionsHandler(questions);
  decQuestionTop.value = window.scrollY;
  decQuestionForm.submit();
});

for (let questionId = 1; questionId <= questionNum; questionId++) {
  const addInputButton = document.getElementById(
    `add-input-button-${questionId}`
  );
  const inputKind = document.getElementById(`input-kind-${questionId}`);
  const choicesNum = document.getElementById(`choices-num-${questionId}`);
  inputKind.addEventListener("change", () => {
    const kind = Number(inputKind.value);
    if (kind === 1 || kind === 2 || kind === 3) {
      choicesNum.removeAttribute("disabled", "");
      choicesNum.value = 5;
    } else {
      choicesNum.setAttribute("disabled", "");
      choicesNum.value = 0;
    }
  });
  addInputButton.addEventListener("click", () => {
    const kind = Number(inputKind.value);
    const num = Number(choicesNum.value);
    const inputId = getInputsNum(inputs, sheetId, questionId) + 1;
    addInput(questionId, inputId);
    inputs.push({
      id: "",
      sheet_id: sheetId,
      question_id: questionId,
      input_id: inputId,
      kind: kind,
      name: "",
    });
    for (let j = 0; j < num; j++) {
      choices.push({
        id: "",
        sheet_id: sheetId,
        question_id: questionId,
        input_id: inputId,
        choice_id: j + 1,
        name: "",
      });
    }
    addChoice(
      questionId,
      inputId,
      kind,
      getChoicesNum(sheetId, questionId, inputId, choices)
    );

    setLocalStorage("inputs", inputs);
    setLocalStorage("choices", choices);

    changeInputHandler(inputs, "inputs");
    changeChoicesHandler(choices, "choices");
  });

  const removeInputButton = document.getElementById(
    `remove-input-button-${questionId}`
  );
  removeInputButton.addEventListener("click", () => {
    const questionInputs = document.getElementById(
      `question-inputs-${questionId}`
    );
    const removeInputId = questionInputs.children.length;
    questionInputs.removeChild(questionInputs.lastElementChild);
    inputs = getRemovedInputs(questionId, removeInputId, inputs);
    setLocalStorage("inputs", inputs);
    choices = getRemovedChoices(questionId, removeInputId, choices);
    setLocalStorage("choices", choices);
    changeInputHandler(inputs, "inputs");
    changeChoicesHandler(choices, "choices");
  });
}

/* Submit */
submitButton.addEventListener("click", () => {
  buttonClickedStyle(submitButton, menuButtonBeforeStyle, menuButtonAfterStyle);
  setButtonMouseLeaveStyle(submitButton, menuButtonAfterStyle);

  //バリデーション
  const invalid = document.getElementById("invalid");
  sheet = getLocalStorage("sheet");
  isValidText(sheet, questions, choices);
  isValidWordLength(sheet, questions, inputs, choices);
  isValidInput(questions, inputs);
  if (questions.length === 0) {
    invalid.innerText = "⚠質問がありません";
  } else if (!isValidText(sheet, questions, choices)) {
    setButtonMouseLeaveStyle(submitButton, menuButtonBeforeStyle);
    invalid.innerText = "⚠未入力の項目があります";
  } else if (!isValidWordLength(sheet, questions, inputs, choices)) {
    setButtonMouseLeaveStyle(submitButton, menuButtonBeforeStyle);
    invalid.innerText = "⚠文字数は20文字以内です";
  } else if (!isValidInput(questions, inputs)) {
    setButtonMouseLeaveStyle(submitButton, menuButtonBeforeStyle);
    invalid.innerText = "⚠入力を設定してください";
  } else {
    invalid.innerText = "";
    const formData = {
      sheet: sheet,
      questions: questions,
      inputs: inputs,
      choices: choices,
    };

    fetch("api/insert.php", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    })
      .then((res) => res.json())
      .then((res) => {
        removeLocalStrage(registerKeys);
        openModal(completeModal);
        completeModalClickHandler(res);
      })
      .catch((err) => {
        setButtonMouseLeaveStyle(submitButton, menuButtonBeforeStyle);
        invalid.innerText = "⚠登録に失敗しました";
        console.log(err);
      });
  }
});
