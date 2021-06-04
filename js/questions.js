import { apiGet } from "./getData.js";
import create from "./create.js";
// import { URL, questionMax, wrongColor, trueColor } from "./constants.js";
import { URL, wrongColor, trueColor, wonPhrases } from "./constants.js";
import { verifyAuth } from "./users.js";
import setData from "./setData.js";
import { start, stop } from "./timer.js";

const questionsQuantity = document.getElementById("questionsQuantity"),
  // URL = "http://127.0.0.1:3000/",
  questionsScore = document.getElementById("questionsScore"),
  questionBlock = document.getElementById("questionBlock"),
  answersBlock = document.getElementById("answersBlock"),
  headerBlock = document.querySelector(".header-wrapper"),
  userInfo = document.getElementById("userInfo"),
  quitBtn = document.getElementById("quit"),
  questionText = document.getElementById("question"),
  modalText = document.getElementById("modalText"),
  goals = document.querySelector(".goals"),
  bg = document.querySelector(".page"),
  timer = document.getElementById("timer"),
  emptyAnswerText = "Необхідно дати відповідь :-)",
  fullUrl = URL + "questions/all";

let questionNum = 1,
  catchAnswer = false,
  questionMax = 5,
  qtyWrong = 0,
  qtyCorrect = 0,
  scores = 0,
  trueAnswer,
  question = {},
  trueAnswerBlock = {},
  questionsArr = [];

// Переход на главную при переключении вкладок браузера
// document.addEventListener("visibilitychange", () => { if(document.hidden) location.href = "/" });

async function handler() {
  apiGet(fullUrl).then((responseData) => {
    const questions = responseData;
    if (questions) {
      setQuestion(questions);
      questionMax = questions.length;
    }
    setUserInfo();
  });
  // ПОСЛЕ РАЗРАБОТКИ РАСКОММЕНТИРОВАТЬ
  // .catch((error) => {
  // console.log(error.message);
  // });
}

const quit = () => {
  $("#modalQuit").modal("show");
};

quitBtn.addEventListener("click", quit);

const seeResult = () => {
  const token = localStorage.getItem("token");
  const userId = localStorage.getItem("userId");
  const userData = JSON.parse(localStorage.getItem("userData"));
  if(token && userId && userData) {
    const fullUrl = URL + "users/" + userId;
    setData(fullUrl, token, {score: scores}).then((res) => {
      if(res.status) newPassText.innerText = "Пароль встановлений";
    })
    .catch((error) => {console.log(error)});
  }
  localStorage.setItem("result", scores);
  setTimeout(() => (location.href = "./result.html"), 1000);
};

const nextQuestion = () => {
  if (questionNum >= questionMax) seeResult();
  else {
    questionNum = questionNum + 1;
    questionText.innerText = "";
    answersBlock.innerText = "";
    timer.value = 90;
    start(timer.value);
    setQuestion();
  }
};

const showModal = (showText) => {
  modalText.innerText = showText;
  $("#modalRange").modal("show"); 
  setTimeout(() => $("#modalRange").modal("hide"), 6000); 
  setTimeout(() => modalText.innerText = emptyAnswerText, 6500);
};

const answerIsTrue = () => {
  stop();
  qtyCorrect++;
  console.log(qtyCorrect % 4)
  if(qtyCorrect % 4 === 0) {
    const qty = qtyCorrect / 4;
    showModal(wonPhrases[qty]);
  };
  scores = scores + 5;
  console.log("true");
  qtyWrong = 0;
  setTimeout(() => nextQuestion(), 2500);
};

export const answerIsWrong = (target) => {
  stop();
  qtyWrong++;
  if (qtyWrong > 1) scores--;
  console.log("wrong", trueAnswer);
  if(question.tip) {
    setTimeout(() => nextQuestion(), 6500); 
    showModal(question.tip);
  } else { 
    setTimeout(() => nextQuestion(), 2000); 
   };
};

const verifyAnswer = (target) => {
  if(catchAnswer) return;
  catchAnswer = true;
  if (!Array.isArray(target)) {
    const answer = target.innerText;
    if (answer === trueAnswer) {
      answerIsTrue(target);
      target.style.backgroundColor = trueColor;
    } else {
      answerIsWrong(target);
      target.style.backgroundColor = wrongColor;
      trueAnswerBlock.style.backgroundColor = trueColor;
    }
  }
};

const questionsQuantityUpdate = () => {
  questionsQuantity.innerText = questionNum;
};

const questionsScoreUpdate = () => {
  questionsScore.innerText = scores;
};

const setUserInfo = () => {
  const userData = JSON.parse(localStorage.getItem("userData"));
  if (userData) verifyAuth();
    else location.href = "/";
  if (userData) userInfo.innerText = "Вітаємо " + userData.email;
};

const setQuestion = (questions) => {
  if (questions) questionsArr = questions;
  if (questionsArr) {
    catchAnswer = false;
    questionsQuantityUpdate();
    questionsScoreUpdate();
    question = questionsArr[questionNum - 1];
    trueAnswer = question.view === "checklist" ? question.trueAnswer : question.trueAnswer.join();
    console.log(question, typeof trueAnswer, trueAnswer);
    questionBlock.classList = `questions_page${question.category} questions`;
    headerBlock.classList = `header-wrapper header-logo-bg${question.category}`;
    goals.src = `../img/questions/GOALS_Ukr${question.category}.png`;
    bg.style.backgroundImage = `url(../img/bg/bg_${question.category}.jpg)`;
    questionText.innerText = `${question.question}`;
    switch (question.view) {
      case "range":
        setRange(question.answers);
        break;
      case "checklist":
        setList(question.answers);
        break;
      case "countriesCheckList":
        setList(question.answers);
        break;
      default:
        setButtons(question.answers);
    }
  }
};

const setButtons = (answers) => {
  const btnsArr = [];
  let naviButtons;

  if (answers.length > 2)
    naviButtons = create("div", "navi-buttons", null, answersBlock);
  else naviButtons = create("div", "three-buttons", null, answersBlock);

  answers.forEach((answer, i) => {
    let btn;
    if (answers.length > 2) btn = create("button", `item${i}`, answer);
    else btn = create("button", `i${i + 1} item${i + 1}`, answer);
    btn.addEventListener("click", (e) => verifyAnswer(e.target), {
      once: true,
    });
    if (answer === trueAnswer) trueAnswerBlock = btn;
    btnsArr.push(btn);
  });

  const skipClass = answers.length > 2 ? "item3" : "i3 item3 skip-answer";

  const btnSkip = create(
    "button",
    skipClass,
    "Пропустити питання",
    null,
    ["type", "button"],
    ["id", "skip"]
  );
  btnSkip.addEventListener("click", (e) => verifyAnswer(e.target), {
    once: true,
  });
  btnsArr.push(btnSkip);
  let itemBlock1;
  let itemBlock2;

  if (answers.length > 2) {
    itemBlock1 = create("div", "item-block1", btnsArr.slice(0, 2), naviButtons);
    itemBlock2 = create("div", "item-block2", btnsArr.slice(2), naviButtons);
  } else
    itemBlock1 = create("div", "item-block1", btnsArr, naviButtons, [
      "id",
      "buttons3",
    ]);
};

const setRange = (answers) => {
  const trueAnswerArr = trueAnswer.split("-");
  const nd = trueAnswerArr[0]; //правильный нижний диапазон числа из базы данных
  const nu = trueAnswerArr[1]; //правильный верхний диапазон числа из базы данных
  const min = answers[0];
  const max = answers[1];
  const ed = answers[2]; //единицы измерения из базы данных
  let answer = "";
  const p = create("p", "myRange", "", null, ["id", "gen"]);

  const naviButtons = create("div", "navi-buttons", null, answersBlock, [
    "id",
    "rangeBlock",
  ]);

  const inputRange = create(
    "input",
    "myRange",
    "",
    null,
    ["type", "range"],
    ["id", "numRight"],
    ["min", min],
    ["max", max]
  );
  const btnEnter = create(
    "button",
    "myRange",
    "Дати відповідь",
    null,
    ["type", "button"],
    ["id", "enter"]
  );
  const btnSkip = create(
    "button",
    "myRange",
    "Пропустити питання",
    null,
    ["type", "button"],
    ["id", "skip"]
  );
  const rangeBlock1 = create(
    "div",
    "range-block1",
    [inputRange, p],
    naviButtons
  );
  const rangeBlock2 = create(
    "div",
    "range-block2",
    [btnEnter, btnSkip],
    naviButtons
  );

  inputRange.addEventListener("change", (e) => {
    answer = e.target.value;
    p.innerText = answer;
  });

  btnEnter.addEventListener("click", () => verifyRange(p), { once: true });
  btnSkip.addEventListener("click", () => verifyRange("wrong"), { once: true });

  const verifyRange = (range) => {
    if(catchAnswer) return;
    catchAnswer = true;
    let sms = "";
    let enter = document.getElementById("enter");

    if (p.innerHTML === "" && range !== "wrong") {
      $("#modalRange").modal("show");
      setTimeout(() => $("#modalRange").modal("hide"), 3000);
      catchAnswer = false;
      btnEnter.addEventListener("click", () => verifyRange(p), { once: true });
      btnSkip.addEventListener("click", () => verifyRange("wrong"), { once: true });
    } else {
      if (inputRange.valueAsNumber >= nd && inputRange.valueAsNumber <= nu) {
        enter.style.backgroundColor = trueColor; //правильный ответ - зеленая кнопка
        setTimeout(() => answerIsTrue(), 1000);
      } else {
        enter.style.backgroundColor = wrongColor; //неправильный ответ - красная кнопка
        setTimeout(() => answerIsWrong(), 2000);
      }
      sms = trueAnswer + ed + " (від " + nd + " до " + nu + ")"; //правильный ответ
      enter.innerHTML = sms; //вывод правильного ответа в кнопку
    }
  };
};

const setList = (answers) => {
  let answer;

  const btnEnter = create(
    "button",
    "i2 item2",
    "Дати відповідь",
    null,
    ["type", "submit"],
    ["form", "listup"],
    ["id", "enter"]
  );
  const btnSkip = create(
    "button",
    "i3 item3",
    "Пропустити питання",
    null,
    ["type", "button"],
    ["id", "skip"]
  );

  btnSkip.addEventListener("click", () => {
    setTimeout(() => answerIsWrong(), 1000);
    btnEnter.style.backgroundColor = wrongColor;
  });

  const selectDivs = [];
  answers.forEach((answer, i) => {
    const s = "s" + i;
    const label = create("label", "selectLabel", answer, null, ["for", s]);
    const input = create(
      "input",
      "selectInput",
      answer,
      null,
      ["id", s],
      ["type", "checkbox"],
      ["value", answer],
      ["name", "selectAnsw"]
    );
    const selectDiv = create("div", "selectDiv", [label, input], null);
    selectDivs.push(selectDiv);
  });

  const listItem1 = create(
    "button",
    "list-item1",
    "Оберіть варіанти",
    null,
    ["type", "button"],
    ["id", "btnList", "onclick", "listshow()"]
  );
  const arrow = create("div", "arrow", null, null);

  listItem1.addEventListener("click", listshow);
  arrow.addEventListener("click", listshow);

  const selectDivCommon = create("div", "selectDivCommon", selectDivs, null);
  const scrollSelect = create(
    "div",
    "scrollSelect hover",
    selectDivCommon,
    null,
    ["id", "dropup"]
  );
  const listup = create(
    "form",
    "listup",
    [listItem1, scrollSelect, arrow],
    null,
    ["id", "listup"]
  );
  const listBlock = create("div", "list-block", [listup], null);
  const itemBlock1 = create(
    "div",
    "item-block1",
    [listBlock, btnEnter, btnSkip],
    null,
    ["id", "list"]
  );
  const naviList = create(
    "div",
    "three-buttons navi-list",
    [itemBlock1],
    answersBlock
  );

  listup.addEventListener("submit", function (event) {
    event.preventDefault();
    const formArray = Array.from(event.target);
    let answer = [];
    formArray.forEach((value) => {
      if (value.checked) answer.push(value.value);
    });
    if (answer.length < 1) $("#modalRange").modal("show");
    else verifyList(answer);
  });

  function listshow() {
    let list = document.getElementById("dropup");

    list.classList.remove("hover");
    list.classList.toggle("showList");
  }

  const verifyList = (answer) => {
    let count = 0;
    answer.forEach((ans) => {
      if(trueAnswer.indexOf(ans) !== -1) count++;
    });
    console.log(count, answer, trueAnswer);

    if (count >= answer.length) {
      answerIsTrue();
      btnEnter.style.backgroundColor = trueColor;
    } else {
      answerIsWrong();
      btnEnter.style.backgroundColor = wrongColor;
    }
  };
};

handler();
