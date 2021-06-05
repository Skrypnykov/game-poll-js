import { URL } from "./constants.js";
import setData from "./setData.js";

let userData = JSON.parse(localStorage.getItem("userData"));
const results = localStorage.getItem("result");
const result = document.getElementById("result");
const scoreResult = document.getElementById("scoreResult");
const startButton = document.getElementById("go");
const userInfo = document.getElementById("userInfo");
userInfo.innerHTML = userData ? `Вітаємо, ${userData.email}` : "Вітаємо";
if (results) {
  scoreResult.innerHTML = `<b>${userData.email}, <br>ви набрали ${results} балів.</b>`;
}

const chngButton = (userData) => {
  if(userData.rated) result.innerText = "Не відображати мої результати в загальному рейтингу";
    else result.innerText = "Відображати мої результати в загальному рейтингу"; 
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
  };
});

startButton.addEventListener("click", () => location.href = "./question.html");

chngButton(userData);
