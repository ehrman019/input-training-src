/* Elements */
const pageNum = document.getElementById("page-num");
const sheetNumber = document.getElementById("sheet-number");
const sheetDate = document.getElementById("sheet-date");
const sheetIndexNumber = document.getElementById("sheet-index-number");
const sheetIndexDate = document.getElementById("sheet-index-date");
const answerSheetDate = document.getElementById("answer-sheet-date");
const resultButton = document.getElementById("result-button");
const prevButton = document.getElementById("prev-button");
const nextButton = document.getElementById("next-button");
const score = document.getElementById("score");

/* Functions */
const getResultData = (page, resultDataList) => {
  const data = resultDataList.find((inputData) => inputData.page === page);
  return data;
};

const getAnswer = (answers, question_id, input_id) => {
  const answer = answers.find(
    (answer) =>
      answer.question_id === question_id && answer.input_id === input_id
  );
  return answer;
};

const getNumber = (page, resultDataList) => {
  const data = getResultData(page, resultDataList);
  return data ? data.answer_sheet.sheet_number : null;
};

const isCorrect = (results, page, question_id, input_id) => {
  const result = results.find(
    (result) =>
      result.page === page &&
      result.question_id === question_id &&
      result.input_id === input_id
  );
  return result.correct;
};

/* Scripts */
const resultDataList = getLocalStorageArray("resultDataList");
const results = getLocalStorageArray("results");
const resultData = getResultData(page, resultDataList);

if (!resultData) {
  redirect(`./result.php?id=${sheetId}`);
}
const answers = resultData.answers;

// 正答数の集計
let cnt = 0;
for (const question of question_inputs) {
  const inputs = question["inputs"];
  let flag = true;
  for (const input of inputs) {
    if (!isCorrect(results, page, question["question_id"], input["input_id"])) {
      flag = false;
    }
  }
  cnt += flag;
}

score.innerText = cnt;
// スコアにより色分け
if (cnt === 0) {
  score.style.color = "var(--err)";
} else if (cnt <= 5) {
  score.style.color = "var(--medium)";
}

// 入力した回答の流し込み
pageNum.innerText = resultDataList.length;
const answer_sheet = resultData.answer_sheet;
sheetNumber.value = answer_sheet.sheet_number;
sheetDate.value = answer_sheet.sheet_date;

// 間違えた問題にエラーのスタイルを加える
// シートNo.がない場合はすべてエラー
if (!answer_sheet.sheet_number) {
  sheetIndexNumber.style.backgroundColor = "var(--errBack)";
  sheetIndexDate.style.backgroundColor = "var(--errBack)";
}
if (answer_sheet.sheet_date !== answerSheetDate.value) {
  sheetIndexDate.style.backgroundColor = "var(--errBack)";
}

for (const input of inputs) {
  const answer = getAnswer(answers, input.question_id, input.input_id);
  //const answer = answers[answerKey];
  const inputData = document.getElementsByName(
    `${input.question_id}-${input.input_id}`
  );

  if (!isCorrect(results, page, input.question_id, input.input_id)) {
    const inputBack = document.getElementById(
      `input-back-${input.question_id}-${input.input_id}`
    );
    inputBack.style.backgroundColor = "var(--errBack)";
  }

  if (input.kind === 1) {
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
  } else if (input.kind === 3) {
    const options = inputData[0].children;
    for (const option of options) {
      if (option.value === answer.answer) {
        option.setAttribute("selected", "");
      } else {
        option.removeAttribute("selected", "");
      }
    }
  } else if (input.kind === 4 || input.kind === 5) {
    inputData[0].value = answer.answer;
  } else {
    inputData[0].value = answer.answer_text;
  }
}

// menu
nextButton.addEventListener("click", () => {
  buttonClickedStyle(nextButton, menuButtonBeforeStyle, menuButtonAfterStyle);
  const nextPage = Math.min(resultDataList.length, page + 1);
  setTimeout(() => {
    redirect(
      `./result_page.php?id=${sheetId}&page=${nextPage}&number=${getNumber(
        nextPage,
        resultDataList
      )}`
    );
  }, sec);
});

prevButton.addEventListener("click", () => {
  buttonClickedStyle(prevButton, menuButtonBeforeStyle, menuButtonAfterStyle);
  const prevPage = Math.max(1, page - 1);
  setTimeout(() => {
    redirect(
      `./result_page.php?id=${sheetId}&page=${prevPage}&number=${getNumber(
        prevPage,
        resultDataList
      )}`
    );
  }, sec);
});

resultButton.addEventListener("click", () => {
  buttonClickedStyle(
    resultButton,
    menuLongButtonBeforeStyle,
    menuLongButtonAfterStyle
  );
  setTimeout(() => {
    redirect(`./result.php?id=${sheetId}`);
  }, sec);
});
