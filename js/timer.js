import { answerIsWrong } from "./questions.js";

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

export function start(elem) {
  // функция запуска таймера
  stop(); //убедимся, что все интервалы очищены, это предотвращает их удвоение
  // elem.value = 90;
  window.TimerId = window.setInterval(Timer, 1000);
  time = 2;
  toggleElement.innerText = "Пауза";
  showEarth(false);
}

export function stop(earthVis) {
  // функция остановки таймера
  window.clearInterval(window.TimerId);
  time = 1;
  if(earthVis) toggleElement.innerText = "Старт";
  showEarth(earthVis);
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
function showEarth(prop) {
  const op = prop ? "1" : "0";
  const vis = prop ? "visible" : "hidden";
  document.getElementById("pauseModal").style.opacity = op;
  document.getElementById("pauseModal").style.visibility = vis;
}
