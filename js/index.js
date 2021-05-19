import { question } from "./getData.js";

const btnStart = document.querySelector(".btn-start");

btnStart.addEventListener("click", onClickSpin);

function onClickSpin() {
  document.getElementById("buttons-animate").classList.toggle("animated");
  setTimeout(function () {
    handler();
  }, 1000);
}

function handler() {
  location.href = "pages/page1.html";
  question();
}
