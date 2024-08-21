/* Elements */
const submitButton = document.getElementById("submit-button");
const invalid = document.getElementById("invalid");
const completeModal = document.getElementById("complete-modal");
const answerButton = document.getElementById("answer-button");
const topButton = document.getElementById("top-button");

/* Scripts */
for (const input of inputs) {
  addInput(input.question_id, input.input_id, input.name);
  addChoice(
    input.question_id,
    input.input_id,
    input.kind,
    getChoicesNum(input.sheet_id, input.question_id, input.input_id, choices)
  );
}
setValues(sheet, questions, inputs, choices);

//フォームの再送信アラート回避
history.pushState(null, null, location.href);
window.addEventListener("popstate", function () {
  history.pushState(null, null, location.href);
});

/* Submit */
submitButton.addEventListener("click", () => {
  buttonClickedStyle(submitButton, menuButtonBeforeStyle, menuButtonAfterStyle);
  setButtonMouseLeaveStyle(submitButton, menuButtonAfterStyle);

  sheet = getSheetValue(sheetId);
  questions = getQuestionValues(questions);
  inputs = getInputValues(inputs);
  choices = getChoiceValues(choices);
  //バリデーション
  isValidText(sheet, questions, choices);
  isValidWordLength(sheet, questions, inputs, choices);
  if (!isValidText(sheet, questions, choices)) {
    setButtonMouseLeaveStyle(submitButton, menuButtonBeforeStyle);
    invalid.innerText = "⚠未入力の項目があります";
  } else if (!isValidWordLength(sheet, questions, inputs, choices)) {
    setButtonMouseLeaveStyle(submitButton, menuButtonBeforeStyle);
    invalid.innerText = "⚠文字数は20文字以内です";
  } else {
    invalid.innerText = "";
    const formData = {
      sheet: sheet,
      questions: questions,
      inputs: inputs,
      choices: choices,
    };

    fetch("api/update.php", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    })
      .then((res) => res.json())
      .then((res) => {
        if (res) {
          removeLocalStrage(editKeys);
          openModal(completeModal);
          completeModalClickHandler(sheetId);
        } else {
          setButtonMouseLeaveStyle(submitButton, menuButtonBeforeStyle);
          invalid.innerText = "⚠更新に失敗しました";
        }
      })
      .catch((err) => {
        setButtonMouseLeaveStyle(submitButton, menuButtonBeforeStyle);
        invalid.innerText = "⚠更新に失敗しました";
        console.log(err);
      });
  }
});
