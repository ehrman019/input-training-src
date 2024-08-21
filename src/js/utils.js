/* Functions */
const redirect = (url) => {
  window.location.href = url;
};

const getLocalStorage = (key) => {
  return localStorage.getItem(key)
    ? JSON.parse(localStorage.getItem(key))
    : null;
};

const getLocalStorageArray = (key) => {
  return localStorage.getItem(key) ? JSON.parse(localStorage.getItem(key)) : [];
};

const setLocalStorage = (key, data) => {
  localStorage.setItem(key, JSON.stringify(data));
};

const removeLocalStorage = (keys) => {
  for (const key of keys) {
    localStorage.removeItem(key);
  }
};

const setButtonStyle = (button, style) => {
  style["width"] && (button.style.width = style["width"]);
  style["height"] && (button.style.height = style["height"]);
  style["margin"] && (button.style.margin = style["margin"]);
  style["padding"] && (button.style.padding = style["padding"]);
  style["fontSize"] && (button.style.fontSize = style["fontSize"]);
};

const setButtonMouseLeaveStyle = (button, style) => {
  button.addEventListener("mouseleave", () => {
    setButtonStyle(button, style);
  });
};

const buttonClickedStyle = (button, beforeStyle, afterStyle) => {
  button.style.transition = "0.1s";
  setButtonStyle(button, beforeStyle);
  setTimeout(() => {
    button.style.transition = "0.2s";
    setButtonStyle(button, afterStyle);
  }, 100);
};

const openModal = (modal) => {
  modal.style.visibility = "visible";
  modal.style.opacity = "1";
};

const closeModal = (modal) => {
  modal.style.visibility = "hidden";
  modal.style.opacity = "0";
};

/* Parameters */
const sec = 180;
const menuButtonBeforeStyle = {
  height: "28px",
  width: "80px",
  padding: "4px",
  margin: "10px 12px",
  fontSize: "15px",
};

const menuButtonAfterStyle = {
  height: "32px",
  width: "88px",
  padding: "3px",
  margin: "8px 8px",
  fontSize: "16px",
};

const menuLongButtonBeforeStyle = {
  height: "28px",
  width: "110px",
  padding: "4px",
  margin: "10px 12px",
  fontSize: "15px",
};

const menuLongButtonAfterStyle = {
  height: "32px",
  width: "118px",
  padding: "3px",
  margin: "8px 8px",
  fontSize: "16px",
};

const buttonBeforeStyle = {
  height: "36px",
  width: "150px",
  paddig: "8.5px",
  margin: "10px 25px",
  fontSize: "16px",
};

const buttonAfterStyle = {
  height: "38px",
  width: "160px",
  paddig: "9px",
  margin: "9px 20px",
  fontSize: "17px",
};

const resultKeys = [
  "resultDataList",
  "resultSheetId",
  "resultSheetName",
  "resultPages",
  "resultQuestions",
  "resultDate",
  "results",
];
