import answerIsWrong from "./questions.js";

let elem = document.getElementById("timer");
elem.value = 90;
let time = 2;
function Timer() {
  // функция таймера (подсчёт количества секунд)
  if (elem.value <= 0) {
    window.clearInterval(window.TimerId);
    time = 1;
    answerIsWrong();
  } else {
    elem.value = parseInt(elem.value) - 1;
  }
}

export default function start(elem) {
  // функция запуска таймера
  stop(); //убедимся, что все интервалы очищены, это предотвращает их удвоение
  // elem.value = 90;
  window.TimerId = window.setInterval(Timer, 1000);
  time = 2;
  toggleElement.innerText = "Пауза";
  showEarth("0", "hidden");
}

function stop() {
  // функция остановки таймера
  window.clearInterval(window.TimerId);
  time = 1;
  toggleElement.innerText = "Старт";
  showEarth("1", "visible");
}
function event_click_startpause(event) {
  if (time === 1) {
    start(elem.value);
  } else {
    stop(elem.value);
  }
}
let toggleElement = document.getElementById("timerpause");
let toggleElementModal = document.getElementById("pauseModal");

toggleElement.addEventListener("click", event_click_startpause);
toggleElementModal.addEventListener("click", event_click_startpause);
toggleElement.click();
start();

//modal window
function showEarth(op, vis) {
  document.getElementById("pauseModal").style.opacity = op;
  document.getElementById("pauseModal").style.visibility = vis;
}
