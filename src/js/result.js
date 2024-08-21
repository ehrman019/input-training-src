/* Elements */
const resultPageButton = document.getElementById("result-page-button");
const canvas = document.getElementById("canvas");
const resultImg = document.getElementById("result-img");
const resultText = document.getElementById("result-text");

/* Functions */
const getResultDataList = (inputDataList, sheetId) => {
  const list = inputDataList.filter(
    (inputData) => inputData.answer_sheet.sheet_id === sheetId
  );
  return list;
};

const getRemovedInputDataList = (inputDataList, sheetId) => {
  const list = inputDataList.filter(
    (inputData) => inputData.answer_sheet.sheet_id !== sheetId
  );
  return list;
};

const getFirstAnswerNumber = (resultDataList) => {
  const data = resultDataList.find((resultData) => resultData.page === 1);
  const sheetNumber = data.answer_sheet.sheet_number;
  return sheetNumber;
};

const drawResult = () => {
  const sheetName = getLocalStorage("resultSheetName");
  const date = getLocalStorage("resultDate");
  const pages = getLocalStorageArray("resultPages");
  const questions = getLocalStorageArray("resultQuestions");
  const results = getLocalStorageArray("results");
  // スコアを計算
  const sum = pages.length * questions.length;
  let questionScore = [];
  let score = 0;
  for (const question of questions) {
    let cnt = 0;
    for (const page of pages) {
      let flag = true;
      for (const result of results) {
        if (
          page === result.page &&
          question.question_id === result.question_id &&
          !result.correct
        ) {
          flag = false;
        }
      }
      cnt += flag;
      score += flag;
    }
    questionScore.push({
      question_id: question.question_id,
      score: cnt,
      sum: pages.length,
    });
  }
  // Canvasで描写
  draw(score, sum, sheetName, questionScore, date);
  if (sum) {
    // 描写後、画像で保存出来るようにする
    setTimeout(() => {
      resultImg.style.transition = "0.3s";
      resultImg.style.visibility = "visible";
      resultImg.style.opacity = "1";
    }, 700);
    setTimeout(() => {
      const img = canvas.toDataURL("image/jpg");
      resultImg.style.pointerEvents = "auto";
      resultImg.href = img;
    }, 1000);
  } else {
    resultText.innerText = "⚠データが存在しません";
    resultText.style.color = "var(--err)";
    resultImg.style.display = "none";
    resultPageButton.style.display = "none";
  }
};

/* Scripts */

if (sheetId === getLocalStorage("resultSheetId")) {
  drawResult();
} else {
  const inputDataList = getLocalStorageArray("inputDataList");
  const resultDataList = getResultDataList(inputDataList, sheetId);

  if (!resultDataList || prev) {
    resultText.innerText = "⚠データが存在しません";
    resultText.style.color = "var(--err)";
    resultImg.style.display = "none";
    resultPageButton.style.display = "none";
  } else {
    setLocalStorage("resultDataList", resultDataList);
    setLocalStorage("inputDataList", getRemovedInputDataList(inputDataList, sheetId));
    const formData = {
      sheet_id: sheetId,
      list: resultDataList,
    };
    fetch("api/get_result.php", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    })
      .then((res) => res.json())
      .then((res) => {
        setLocalStorage("resultSheetId", res.sheet_id);
        setLocalStorage("resultSheetName", res.sheet_name);
        setLocalStorage("resultPages", res.pages);
        setLocalStorage("resultQuestions", res.questions);
        setLocalStorage("results", res.results);

        const today = new Date();
        const date = `${today.getFullYear()}/${
          today.getMonth() + 1
        }/${today.getDate()}`;
        setLocalStorage("resultDate", date);

        drawResult();
      })
      .catch((err) => {
        resultText.innerText = "⚠データの送信に失敗しました";
        resultText.style.color = "var(--err)";
        resultImg.style.display = "none";
        console.log(err);
      });
  }
}

resultPageButton.addEventListener("click", () => {
  buttonClickedStyle(resultPageButton, buttonBeforeStyle, buttonAfterStyle);
  setTimeout(() => {
    const resultDataList = getLocalStorageArray("resultDataList");
    const sheetNumber = getFirstAnswerNumber(resultDataList);
    redirect(`./result_page.php?id=${sheetId}&page=1&number=${sheetNumber}`);
  }, sec);
});
