import { URL } from "./constants.js";
import setData from "./setData.min.js";

let userData = JSON.parse(localStorage.getItem("userData"));
const results = localStorage.getItem("result");
const result = document.getElementById("result");
const scoreResult = document.getElementById("scoreResult");
const profile = document.getElementById("profile");
const startButton = document.getElementById("go");
const userInfo = document.getElementById("userInfo");
userInfo.innerHTML = userData ? `Вітаємо, <a href='/pages/account.html'>${userData.nickname}</a>` : "";
if (results) {
  if(userData) scoreResult.innerHTML = `<b>${userData.nickname}, <br>ви набрали ${results} балів.</b>`;
    else scoreResult.innerHTML = `<b>ви набрали ${results} балів.</b>`;
}

const chngButton = (userData) => {
  if(userData !== null) {
    if(userData.rated) result.innerText = "Не відображати мої результати в загальному рейтингу";
    else result.innerText = "Відображати мої результати в загальному рейтингу"; 
  } else {
    result.innerText = "Щоб потрапити в рейтинг, необхідно авторизуватися";
    profile.classList.add("hidden");
  }
};

result.addEventListener( 'click', () => {
  const userId = localStorage.getItem("userId");
  const token = localStorage.getItem("token");
  if (token && userId) {
    const userUrl = URL + "users/" + userId;
    const rated = {rated: !userData.rated};
    setData(userUrl, token, rated).then((data) => {
      userData = JSON.parse(localStorage.getItem("userData"));
      const datas = data ? data : userData;
      chngButton(datas)
    });
  } else location.href = "/";
});

startButton.addEventListener("click", () => location.href = "./question.html");

chngButton(userData);
