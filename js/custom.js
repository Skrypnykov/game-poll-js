<<<<<<< HEAD
// import { register, signIn } from "./users.js";
import "./questions.js";

const registerForm = document.getElementById("signUpForm");
const signInForm = document.getElementById("signInForm");

// registerForm.addEventListener("submit", function (event) {
//   event.preventDefault();
//   const formArray = Array.from(event.target);
//   let userData = {};
//   formArray.forEach((value) => {
//     userData[value.id] = value.value;
//   });
//   register(userData);
// });

// signInForm.addEventListener("submit", function (event) {
//   event.preventDefault();
//   const formArray = Array.from(event.target);
//   let userData = {};
//   formArray.forEach((value) => {
//     userData[value.id] = value.value;
//   });
//   signIn(userData);
// });

// questions();
=======
import { verifyAuth, register, signIn } from "./users.js";

const registerForm = document.getElementById("signUpForm");
const signInForm = document.getElementById("signInForm");
const signInOutButton = document.getElementById("signInOutButton");

registerForm.addEventListener("submit", function (event) {
  event.preventDefault();
  const formArray = Array.from(event.target);
  let userData = {};
  formArray.forEach((value) => {
    userData[value.id] = value.value;
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
>>>>>>> origin/valid
