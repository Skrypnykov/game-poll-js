import { apiGet } from "./getData.js";
import { URL } from "./constants.js";

const fullUrl = URL + "users";

const ratingOl = document.getElementById("rating-ol");

const dropdown = document.getElementById("dropdown");
const profile = document.getElementById("profile");
const userInfo = document.getElementById("userInfo");
const advice = document.getElementById("advice");
const startButton = document.getElementById("go");
const accountButton = document.getElementById("result");

const userLocalData = JSON.parse(localStorage.getItem("userData"));

async function rating() {
  apiGet(fullUrl)
    .then((responseData) => {
      const ratingArr = responseData;

      if (!userLocalData) {
        advice.classList.add("hidden");
        userInfo.innerText = "Вітаємо";
        if(dropdown) dropdown.removeChild(profile);
        if (startButton && accountButton) {
          startButton.classList.add("hidden");
          accountButton.classList.add("hidden");
        }
      } else {
        userInfo.innerText = `Вітаємо, ${userLocalData.email}`;
        startButton.classList.remove("hidden");
        if (!userLocalData.rated) {
          accountButton.classList.remove("hidden");
          advice.classList.remove("hidden");
        }
      }

      if (ratingArr) {
        ratingArr
          .sort((a, b) => b.score - a.score)
          .forEach((user, i) => {
            let liEl = document.createElement("li");
            liEl.innerText = `${user.score} - ${user.fullname}`;
            if (userLocalData && user.email === userLocalData.email) {
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
