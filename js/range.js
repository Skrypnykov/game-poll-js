let nr,
  nd,
  nu = 0;
let ed = "";
let p = document.getElementById("gen");
let rng = document.getElementById("numRight");
//restart(nr);

function catchNum() { //выводит числовое значение ползунка в абзац
  p.innerHTML = rng.value;
}

window.onload = function (nr) {
  nr = 20; //правильный ответ из базы данных
  nd = 18; //правильный нижний диапазон числа из базы данных
  nu = 22; //правильный верхний диапазон числа из базы данных
  ed = "%"; //единицы измерения из базы данных
  document.getElementById("enter").innerHTML = "Перевірити";
  document.getElementById("numRight").value = "";
  document.getElementById("gen").value = "";
}
function onClickNum() {
  
  let sms = "";
  let enter = document.getElementById("enter");

  if (p.innerHTML == "") { //проверка на то, что ползунок не двигали
    show('1', 'visible'); //вывод модального окна
    
  } else {//если ползунок двигали, сравниваем его значение с нижней и верхней границей
    if ((rng.valueAsNumber >= nd) && (rng.valueAsNumber <= nu)) {
      enter.style.backgroundColor = "rgba(76, 161, 70, 0.6)";//правильный ответ - зеленая кнопка
    } else {
      enter.style.backgroundColor = "rgba(229, 35, 61, 0.6)";//неправильный ответ - красная кнопка
    }
    sms = nr + ed + " (від " + nd + " до " + nu + ")";//правильный ответ
    enter.innerHTML = sms;//вывод правильного ответа в кнопку
  }
}

//modal window
function show(op, vis) {
  document.getElementById("rangeModal").style.opacity = op;
  document.getElementById("rangeModal").style.visibility = vis;
  
}
