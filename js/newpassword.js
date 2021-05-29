import { URL } from "./constants.js";
import setData from "./setData.js";

const newPassForm = document.getElementById("newPassForm");
const newPassText = document.getElementById("newPassText");

var currentURL = window.location.search;
const prefs = currentURL.split("&");
const userId = prefs[0].slice(6);
const token = prefs[1].slice(6);

newPassForm.addEventListener("submit", function (event) {
  event.preventDefault();
  if(userId && token) {
    const fullUrl = URL + "users/" + userId;
    const formArray = Array.from(event.target);
    let formData = {};
    formArray.forEach((value) => {
      formData[value.name] = value.value;
    });

  if(formData.password !== formData.password2) {
    newPassText.innerText = "Пароль і його повтор не збігаються";
    setTimeout(() => {newPassText.innerText = "Пароль не менше 8 символів"}, 4000);
    return
  } else {

    setData(fullUrl, token, formData).then((res) => {
      if(res.status) newPassText.innerText = "Пароль встановлений";
    })
    .catch((error) => {console.log(error)});

  };   

  } else { 
    newPassText.innerText = "Помилка, спробуйте ще раз"; 
    setTimeout(() => {location.href = "../index.html"}, 4000);
  }

  setTimeout(() => {location.href = "../index.html"}, 4000);
});