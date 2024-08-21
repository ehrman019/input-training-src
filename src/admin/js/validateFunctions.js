// Validation
const isValidText = (sheet, questions, choices) => {
  let isValid = true;
  const sheetName = document.getElementById("sheet-name");
  if (!sheet.name) {
    setErrStyle(sheetName, "6px");
    isValid = false;
  } else {
    removeErrStyle(sheetName);
  }
  for (const question of questions) {
    const questionName = document.getElementById(
      `question-name-${question.question_id}`
    );
    if (!question.name) {
      setErrStyle(questionName, "4px");
      isValid = false;
    } else {
      removeErrStyle(questionName);
    }
  }
  for (const choice of choices) {
    const choiceName = document.getElementById(
      `choice-name-${choice.question_id}-${choice.input_id}-${choice.choice_id}`
    );
    if (!choice.name) {
      setErrStyle(choiceName, "3px");
      isValid = false;
    } else {
      removeErrStyle(choiceName);
    }
  }
  return isValid;
};

const isValidWordLength = (sheet, questions, inputs, choices) => {
  let isValid = true;
  const sheetName = document.getElementById("sheet-name");
  if (sheet.name.length > wordLength) {
    setErrStyle(sheetName, "6px");
    isValid = false;
  } else {
    removeErrStyle(sheetName);
  }
  for (const question of questions) {
    const questionName = document.getElementById(
      `question-name-${question.question_id}`
    );
    if (question.name.length > wordLength) {
      setErrStyle(questionName, "4px");
      isValid = false;
    } else {
      removeErrStyle(questionName);
    }
  }
  for (const input of inputs) {
    const inputName = document.getElementById(
      `input-name-${input.question_id}-${input.input_id}`
    );
    if (input.name.length > wordLength) {
      setErrStyle(inputName, "4px");
      isValid = false;
    }
  }

  for (const choice of choices) {
    const choiceName = document.getElementById(
      `choice-name-${choice.question_id}-${choice.input_id}-${choice.choice_id}`
    );
    if (choice.name.length > wordLength) {
      setErrStyle(choiceName, "3px");
      isValid = false;
    } else {
      removeErrStyle(choiceName);
    }
  }
  return isValid;
};

const isValidInput = (questions, inputs) => {
  let isValid = true;
  for (const question of questions) {
    const questionBack = document.getElementById(
      `question-${question.question_id}`
    );
    const inputKind = document.getElementById(
      `input-kind-${question.question_id}`
    );
    let flag = false;
    for (const input of inputs) {
      if (input.question_id === question.question_id) {
        flag = true;
        break;
      }
    }
    if (!flag) {
      setErrStyle(inputKind, "3px");
      questionBack.style.backgroundColor = "var(--errBack)";
      isValid = false;
    } else {
      removeErrStyle(inputKind);
      questionBack.style.backgroundColor = null;
    }
  }
  return isValid;
};
