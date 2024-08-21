/* Register Functions */
const getQuestionKey = (sheetId, questionId, questions) => {
  const idx = questions.findIndex(
    (question) =>
      question.sheet_id === sheetId && question.question_id === questionId
  );
  return idx;
};

const getInputsKey = (sheetId, questionId, inputId, inputs) => {
  const idx = inputs.findIndex(
    (input) =>
      input.sheet_id === sheetId &&
      input.question_id === questionId &&
      input.input_id === inputId
  );

  return idx;
};

const getChoicesKey = (sheetId, questionId, inputId, choiceId, choices) => {
  const idx = choices.findIndex(
    (choice) =>
      choice.sheet_id === sheetId &&
      choice.question_id === questionId &&
      choice.input_id === inputId &&
      choice.choice_id === choiceId
  );
  return idx;
};

const getInputsNum = (inputs, sheetId, questionId) => {
  let cnt = 0;
  for (const input of inputs) {
    input.sheet_id === sheetId && input.question_id === questionId && cnt++;
  }
  return cnt;
};

const getChoicesNum = (sheetId, questionId, inputId, choices) => {
  let cnt = 0;
  if (choices) {
    for (const choice of choices) {
      choice.sheet_id === sheetId &&
        choice.question_id === questionId &&
        choice.input_id === inputId &&
        cnt++;
    }
  }
  return cnt;
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

const getRemovedInputs = (questionId, inputId, inputs) => {
  let tmpInputs = [];
  if (inputs) {
    for (const input of inputs) {
      if (inputId) {
        input.question_id !== questionId && tmpInputs.push(input);
        input.question_id === questionId &&
          input.input_id !== inputId &&
          tmpInputs.push(input);
      } else {
        input.question_id !== questionId && tmpInputs.push(input);
      }
    }
  }
  return tmpInputs;
};

const getRemovedChoices = (questionId, inputId, choices) => {
  let tmpChoices = [];
  if (choices) {
    for (const choice of choices) {
      if (inputId) {
        choice.question_id !== questionId ||
          (choice.input_id !== inputId && tmpChoices.push(choice));
      } else {
        choice.question_id !== questionId && tmpChoices.push(choice);
      }
    }
  }
  return tmpChoices;
};

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

// changeHandler
const changeSheetHandler = (sheetId, key) => {
  const sheetName = document.getElementById("sheet-name");
  sheetName.addEventListener("change", (e) => {
    sheetName.setAttribute("value", e.target.value);
    setLocalStorage(key, { id: sheetId, name: e.target.value });
  });
};

const changeQuestionsHandler = (questions, key) => {
  for (const question of questions) {
    const questionName = document.getElementById(
      `question-name-${question.question_id}`
    );
    if (questionName) {
      questionName.addEventListener("change", (e) => {
        const idx = getQuestionKey(
          Number(question.sheet_id),
          Number(question.question_id),
          questions
        );
        const data = {
          id: question.id,
          sheet_id: question.sheet_id,
          question_id: question.question_id,
          name: e.target.value,
        };
        idx >= 0 ? (questions[idx] = data) : questions.push(data);
        setLocalStorage(key, questions);
        questionName.setAttribute("value", e.target.value);
      });
    }
  }
};

const changeInputHandler = (inputs, key) => {
  for (const input of inputs) {
    const inputName = document.getElementById(
      `input-name-${input.question_id}-${input.input_id}`
    );

    if (inputName) {
      inputName.addEventListener("change", (e) => {
        const idx = getInputsKey(
          Number(input.sheet_id),
          Number(input.question_id),
          Number(input.input_id),
          inputs
        );
        const data = {
          id: input.id,
          sheet_id: input.sheet_id,
          question_id: input.question_id,
          input_id: input.input_id,
          kind: input.kind,
          name: e.target.value,
        };
        idx >= 0 ? (inputs[idx] = data) : inputs.push(data);
        setLocalStorage(key, inputs);
        inputName.setAttribute("value", e.target.value);
      });
    }
  }
};

const changeChoicesHandler = (choices, key) => {
  for (const choice of choices) {
    const choiceName = document.getElementById(
      `choice-name-${choice.question_id}-${choice.input_id}-${choice.choice_id}`
    );
    if (choiceName) {
      choiceName.addEventListener("change", (e) => {
        const idx = getChoicesKey(
          Number(choice.sheet_id),
          Number(choice.question_id),
          Number(choice.input_id),
          Number(choice.choice_id),
          choices
        );
        const data = {
          id: choice.id,
          sheet_id: choice.sheet_id,
          question_id: choice.question_id,
          input_id: choice.input_id,
          choice_id: choice.choice_id,
          name: e.target.value,
        };
        idx >= 0 ? (choices[idx] = data) : choices.push(data);
        setLocalStorage(key, choices);
        choiceName.setAttribute("value", e.target.value);
      });
    }
  }
};

// Modal
const restoreModalClickHandler = (keys) => {
  restoreButton.addEventListener("click", (e) => {
    e.preventDefault();
    buttonClickedStyle(restoreButton, buttonBeforeStyle, buttonAfterStyle);
    setTimeout(() => {
      restoreForm.submit();
    }, sec);
  });
  resetButton.addEventListener("click", (e) => {
    e.preventDefault();
    removeLocalStrage(keys);
    buttonClickedStyle(resetButton, buttonBeforeStyle, buttonAfterStyle);
    setTimeout(() => {
      resetForm.submit();
    }, sec);
  });
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
