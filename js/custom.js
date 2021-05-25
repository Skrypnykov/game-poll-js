import { verifyAuth, register, signIn } from "./users.js";

const registerForm = document.getElementById("signUpForm");
const signInForm = document.getElementById("signInForm");
const signInOutButton = document.getElementById("signInOutButton");
const btnStart = document.querySelector(".btn-start");

btnStart.addEventListener("click", onClickSpin);

function onClickSpin() {
  document.getElementById("buttons-animate").classList.toggle("animated");
  setTimeout(() => location.href = "pages/question.html", 1000);
}

registerForm.addEventListener("submit", function (event) {
  event.preventDefault();
  const formArray = Array.from(event.target);
  let userData = {};
  formArray.forEach((value) => {
    userData[value.name] = value.value;
  });
  register(userData);
});

signInForm.addEventListener("submit", function (event) {
  event.preventDefault();
  const formArray = Array.from(event.target);
  let userData = {};
  formArray.forEach((value) => {
    userData[value.name] = value.value;
  });
  signIn(userData);
});

verifyAuth();
