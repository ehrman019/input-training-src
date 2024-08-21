/* Edit Functions */
const setValues = (sheet, questions, inputs, choices) => {
  if (sheet.name) {
    const sheetName = document.getElementById("sheet-name");
    sheetName.setAttribute("value", sheet.name);
  }
  if (questions) {
    for (const question of questions) {
      const questionName = document.getElementById(
        `question-name-${question.question_id}`
      );
      question.name && questionName.setAttribute("value", question.name);
    }
  }
  if (inputs) {
    for (const input of inputs) {
      const inputName = document.getElementById(
        `input-name-${input.question_id}-${input.input_id}`
      );

      input.name && inputName.setAttribute("value", input.name);
    }
  }
  if (choices) {
    for (const choice of choices) {
      const choiceName = document.getElementById(
        `choice-name-${choice.question_id}-${choice.input_id}-${choice.choice_id}`
      );
      choice.name && choiceName.setAttribute("value", choice.name);
    }
  }
};

const getSheetValue = (sheetId) => {
  const sheetName = document.getElementById("sheet-name");
  return { id: sheetId, name: sheetName.value };
};

const getQuestionValues = (questions) => {
  let data = [];
  for (const question of questions) {
    const questionName = document.getElementById(
      `question-name-${question.question_id}`
    );
    data.push({
      id: question.id,
      sheet_id: question.sheet_id,
      question_id: question.question_id,
      name: questionName.value,
    });
  }
  return data;
};

const getInputValues = (inputs) => {
  let data = [];
  for (const input of inputs) {
    const inputName = document.getElementById(
      `input-name-${input.question_id}-${input.input_id}`
    );
    data.push({
      id: input.id,
      sheet_id: input.sheet_id,
      question_id: input.question_id,
      input_id: input.input_id,
      kind: input.kind,
      name: inputName.value,
    });
  }
  return data;
};

const getChoiceValues = (choices) => {
  let data = [];
  for (const choice of choices) {
    const choiceName = document.getElementById(
      `choice-name-${choice.question_id}-${choice.input_id}-${choice.choice_id}`
    );

    data.push({
      id: choice.id,
      sheet_id: choice.sheet_id,
      question_id: choice.question_id,
      input_id: choice.input_id,
      choice_id: choice.choice_id,
      name: choiceName.value,
    });
  }
  return data;
};

const completeModalClickHandler = (id) => {
  answerButton.addEventListener("click", () => {
    buttonClickedStyle(answerButton, buttonBeforeStyle, buttonAfterStyle);
    setTimeout(() => {
      redirect(`./answer.php?id=${id}`);
    }, sec);
  });
  topButton.addEventListener("click", () => {
    buttonClickedStyle(topButton, buttonBeforeStyle, buttonAfterStyle);
    setTimeout(() => {
      redirect("./index.php");
    }, sec);
  });
};

const addInput = (questionId, inputId) => {
  const questionInputs = document.getElementById(
    `question-inputs-${questionId}`
  );

  questionInputs.innerHTML += `
    <li id="input-choices-${questionId}-${inputId}" class="register-choices">
      <div class="register-choices-title">
        <label>ラベル</label>
        <input type="text" id="input-name-${questionId}-${inputId}" placeholder="任意入力" />
      </div>
    </li>
  `;
};

const addChoice = (questionId, inputId, kind, num) => {
  const inputChoices = document.getElementById(
    `input-choices-${questionId}-${inputId}`
  );

  switch (kind) {
    case 1:
      inputChoices.innerHTML += `
        <div class="register-choice-item">
          <input type="radio" id="" name="${questionId}-${inputId}" checked class="readonly"/>
          <input type="text" id="choice-name-${questionId}-${inputId}-1" placeholder="項目を入力.." />
        </div>
      `;
      for (let i = 1; i < num; i++) {
        inputChoices.innerHTML += `
        <div class="register-choice-item">
          <input type="radio" id="" name="${questionId}-${inputId}" class="readonly"/>
          <input type="text" id="choice-name-${questionId}-${inputId}-${
          i + 1
        }" placeholder="項目を入力.." />
        </div>
      `;
      }
      break;
    case 2:
      inputChoices.innerHTML += `
        <div class="register-choice-item">
          <input type="checkbox" id="" name="${questionId}-${inputId}" checked class="readonly"/>
          <input type="text" id="choice-name-${questionId}-${inputId}-1" placeholder="項目を入力.." />
        </div>
      `;
      for (let i = 1; i < num; i++) {
        inputChoices.innerHTML += `
        <div class="register-choice-item">
          <input type="checkbox" id="" name="${questionId}-${inputId}" class="readonly"/>
          <input type="text" id="choice-name-${questionId}-${inputId}-${
          i + 1
        }" placeholder="項目を入力.." />
        </div>
      `;
      }
      break;
    case 3:
      for (let i = 0; i < num; i++) {
        inputChoices.innerHTML += `
        <div class="register-choice-item">
          <input type="text" id="choice-name-${questionId}-${inputId}-${
          i + 1
        }" placeholder="項目を入力.."/>
        </div>
      `;
      }
      break;
    case 4:
      inputChoices.innerHTML += `
      <div class="register-choice-item">
        <input type="date" id=""/>
      </div>`;
      break;

    case 5:
      inputChoices.innerHTML += `
      <div class="register-choice-item">
        <input type="time" id="" list="select-time"/>
        <datalist id="select-time">

        </datalist>
      </div>`;
      const selectTime = document.getElementById("select-time");
      addSelectTime(selectTime);
      break;

    case 6:
      inputChoices.innerHTML += `
      <div class="register-choice-item">
        <input type="text" id="" placeholder=".."/>
      </div>`;
      break;

    case 7:
      inputChoices.innerHTML += `
      <div class="register-choice-item">
        <textarea placeholder=".."></textarea>
      </div>`;
      break;

    default:
      break;
  }
};

const getChoicesNum = (sheetId, questionId, inputId, choices) => {
  const array = choices.filter(
    (choice) =>
      choice.sheet_id === sheetId &&
      choice.question_id === questionId &&
      choice.input_id === inputId
  );
  return array.length;
};

const addSelectTime = (elm) => {
  for (let i = 4; i <= 27; i++) {
    for (let j = 0; j <= 45; j += 15) {
      const h = `0${i % 24}`.slice(-2);
      const m = `0${j}`.slice(-2);
      elm.innerHTML += `
      <option value="${h}:${m}">${h}:${m}</option>
      `;
    }
  }
};
