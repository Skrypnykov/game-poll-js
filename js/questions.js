import { apiGet } from "./getData.js";
import create from "./create.js";

const url = "https://pollgame-be.herokuapp.com/questions";

let questionNum = 1;
let questionMax = 20;
let trueAnswer = "";
let questionsArr = [];
let questionText = document.getElementById("question");
const questionsProgress = document.getElementById("questionsProgress");
const questionBlock = document.getElementById("questionBlock");
const answersBlock = document.getElementById("answersBlock");

async function handler() {
  apiGet(url)
    .then((responseData) => {
      const questions = responseData;
      // записываем в локал объект с вопросами для передачи на другую страницу
      // localStorage.setItem("questionsArr", JSON.stringify(questionsArr));
      if (questions) {
        setQuestion(questions);
      }
    })
    // ПОСЛЕ РАЗРАБОТКИ РАСКОММЕНТИРОВАТЬ
    // .catch((error) => {
      // console.log(error.message);
    // });
}

const seeResult = () => {
  console.log("you result");
};

const nextQuestion = () => {
  if(questionNum === questionMax) seeResult();
    else {
      questionNum = questionNum + 1;
      questionText.innerText = "";
      answersBlock.innerText = "";
      setQuestion();
    }
};

const answerIsTrue = (target) => {
  console.log("true")
  nextQuestion();
};

const answerIsWrong = (target) => {
  console.log("wrong")
  nextQuestion();
};

const verifyAnswer = (target) => {
  const answer = target.innerText;
  console.log(answer, trueAnswer)
  if (answer === trueAnswer) answerIsTrue(target);
    else answerIsWrong(target);
};

const questionProgressUpdate = () => { questionsProgress.innerText =` ${questionNum} / ${questionMax} ` };

const setQuestion = (questions) => {
  if (questions) questionsArr = questions;
  if (questionsArr) {
    questionProgressUpdate();
    const question = questionsArr[questionNum - 1];
    trueAnswer = question.trueAnswer;
    console.log(question);
    questionBlock.classList=`questions_page${question.category} questions`;
    questionText.innerText = `${question.question}`;
    switch (question.view) {
      case "range":
        setRange(question.answers);
        break
      case "checklist":
        setList(question.answers);
        break
      case "countriesCheckList":
        setList(question.answers);
        break
      default:
        setButtons(question.answers);
    };
  }
}

const setButtons = (answers) => { 
  const btnsArr = [];
  answers.forEach((answer, i) => {
    const btn = create("button", `item${i}`, answer);
    btn.addEventListener("click", e => verifyAnswer(e.target))
    btnsArr.push(btn);
  });

  const itemBlock1 = create("div", "item-block1", btnsArr, answersBlock);   
};

const setRange = (answers) => {
  console.log(answers)
  let answer = "";
  const p = create("p", "myRange", "", null);
  const inputRange = create("input", "myRange", null, null, ["type", "range"], ["id", "numRight"], ["min", "1"], ["max", "100"]);
  const btnEnter = create("button", "myRange", "Перевірити", null, ["type", "button"], ["id", "enter"]);
  const btnSkip = create("button", "myRange", "Скасовати", null, ["type", "button"], ["id", "skip"]);
  const rangeBlock1 = create("div", "range-block1", [inputRange, p], answersBlock);
  const rangeBlock2 = create("div", "range-block2", [btnEnter, btnSkip], answersBlock);
  
  inputRange.addEventListener("change", e => {
    answer = e.target.value;
    p.innerText = answer;
  });
  
  btnEnter.addEventListener("click", () => verifyAnswer(p));
  btnSkip.addEventListener("click", () => answerIsWrong());
  // <div class="range-block1">
  //     <input
  //       type="range"
  //       id="numRight"
  //       min="1"
  //       max="100"
  //       class="myRange"
  //       oninput="catchNum()"
  //       />
  //       <p id="gen" class="myRange"></p>
  //     </div>
  //     <div class="range-block2">
  //       <button
  //         type="button"
  //         onclick="onClickNum()"
  //         id="enter"
  //         class="myRange"
  //       ></button>
  //       <button type="button" id="skip" class="myRange"></button>
  //     </div>
};

const setList = (answers) => {console.log(answers) };

handler();
