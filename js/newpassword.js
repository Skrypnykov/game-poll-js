// import { URL } from "./constants.js";

const newPassForm = document.getElementById("newPassForm");
const newPassText = document.getElementById("newPassText");

//  var currentURL = window.location.href;
 var currentURL = window.location.search;
 let params = (new URL(document.location)).searchParams; 
  console.log(params.get("data"));
 console.log(currentURL, typeof currentURL)

newPassForm.addEventListener("submit", function (event) {
  event.preventDefault();
  const formArray = Array.from(event.target);
  let userData = {};
  formArray.forEach((value) => {
    userData[value.name] = value.value;
  });

  if(userData.password !== userData.password2) {
    newPassText.innerText = "Пароль і його повтор не збігаються";
    setTimeout(() => {newPassText.innerText = "Пароль не менше 8 символів"}, 5000);
    return
  };   

  // signIn(userData);

  newPassText.innerText = "Пароль встановлений";

  setTimeout(() => {location.href = "../index.html"}, 4000);
});