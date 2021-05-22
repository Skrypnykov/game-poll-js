let elem = document.getElementById("timer");
elem.value = 90;
let time = 2;
function Timer() {
  // функция таймера (подсчёт количества секунд)
  if (elem.value <= 0) {
    window.clearInterval(window.TimerId);
    time = 1;
  } else {
    elem.value = parseInt(elem.value) - 1;
  }
}

function start() {
  // функция запуска таймера  
  stop();//убедимся, что все интервалы очищены, это предотвращает их удвоение
  window.TimerId = window.setInterval(Timer, 1000);
  time = 2;
}

function stop() {
  // функция остановки таймера
  window.clearInterval(window.TimerId);
  time = 1;
}
function event_click_startpause(event) {
  if (time === 1) {
    start();
    event.target.innerText = "Пауза";
  } else {
    stop();
    event.target.innerText = "Старт";
  }
}
let toggleElement = document.getElementById("timerpause");

toggleElement.addEventListener("click", event_click_startpause);
toggleElement.click();
start();
