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
  toggleElement.innerText = "Пауза";
}

function stop() {
  // функция остановки таймера
  window.clearInterval(window.TimerId);
  time = 1;
  toggleElement.innerText = "Старт";
}
function event_click_startpause(event) {
  if (time === 1) {
    start();
  } else {
    stop();

  }
}
let toggleElement = document.getElementById("timerpause");

toggleElement.addEventListener("click", event_click_startpause);
toggleElement.click();
start();
