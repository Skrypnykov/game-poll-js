import { apiGet } from "./getData.js";
import { URL } from "./constants.js";

const fullUrl = URL + "users";

const ratingOl = document.getElementById("rating-ol");
const profile = document.getElementById("profile");
const userInfo = document.getElementById("userInfo");
const advice = document.getElementById("advice");
const startButton = document.getElementById("go");
const accountButton = document.getElementById("result");


export async function rating() {
  const userLocalData = JSON.parse(localStorage.getItem("userData"));
  apiGet(fullUrl)
    .then((responseData) => {
      const ratingArr = responseData;

      if (!userLocalData) {
        advice.classList.add("hidden");
        userInfo.innerText = "Вітаємо";
      if (!userLocalData) profile.classList.add("hidden");
        else profile.classList.remove("hidden");
      if (startButton) startButton.classList.add("hidden");
        if (accountButton) accountButton.classList.add("hidden");
      } else {
        userInfo.innerText = `Вітаємо, ${userLocalData.nickname}`;
        startButton.classList.remove("hidden");
        if (!userLocalData.verified) {
          if (accountButton) accountButton.classList.remove("hidden");
          if (advice) advice.classList.remove("hidden");
        }
      }

      if (ratingArr) {
        ratingOl.innerHTML = "";
        ratingArr
          .sort((a, b) => b.score - a.score)
          .forEach((user, i) => {
            let liEl = document.createElement("li");
            liEl.innerText = `${user.score} - ${user.fullname}`;
            if (userLocalData && user.fullname === userLocalData.fullname) {
              liEl.classList.add("current-user");
            } else if (i % 2 !== 0) {
              liEl.classList.add("gray-user");
            }
            ratingOl.appendChild(liEl);
          });
      }
    })
    .catch((error) => {
      console.log(error.message);
    });
}

startButton.addEventListener("click", () => location.href = "./question.html")

rating();
