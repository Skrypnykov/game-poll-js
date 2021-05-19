import { apiGet } from "./getData.js";

const btnStart = document.querySelector(".btn-start");
const url = "https://pollgame-be.herokuapp.com/questions";

btnStart.addEventListener("click", onClickSpin);

function onClickSpin() {
  document.getElementById("buttons-animate").classList.toggle("animated");
  setTimeout(function () {
    handler();
  }, 1000);
}

async function handler() {
  apiGet(url)
    .then((responseData) => {
      const questionsArr = responseData;
      // записываем в локал объект с вопросами для передачи на другую страницу
      localStorage.setItem("questionsArr", JSON.stringify(questionsArr));

      if (questionsArr) {
        location.href = "pages/page1.html";

        let questionsArr = JSON.parse(localStorage.getItem("questionsArr"));
        let questionsText = document.querySelector(".questions-text");

        questionsText.innerText = `${questionsArr[0].question}`;
        console.log(questionsArr[0].question);
        // TODO вопрос получается, надо как-то обновить поле
      }
    })
    .catch((error) => {
      console.log(error.message);
    });
}
