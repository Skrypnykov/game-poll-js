import { URL } from "../js/constants.js";

const ratingOl = document.getElementById("rating-ol");
const total = document.getElementById("total");
const totalGt0 = document.getElementById("totalGt0");
let counterGt0 = 0;

const userLocalData = JSON.parse(localStorage.getItem("userData"));
const userId = localStorage.getItem("userId");
const token = localStorage.getItem("token");

async function apiGet(fullUrl, bearerToken) {
    const requestProp = {
      method: "GET",
      headers: {
        "Authorization": "Bearer " + bearerToken,
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    };
  const response = await fetch(fullUrl, requestProp);

  if (!response.ok) {
    const error = {status: response.status, statusText: response.statusText};
    return error
    throw new Error(error);
  }
  const body = await response.json();
  return body;
}


async function rating() {
  if(userId && token) {
    const fullUrl = URL + "users/all/" + userId;
    apiGet(fullUrl, token)
      .then((responseData) => {
        const ratingArr = responseData;
        if (ratingArr) {
          total.innerText = ratingArr.length;
          ratingOl.innerHTML = "";
          ratingArr
            .sort((a, b) => b.score - a.score)
            .forEach((user, i) => {
              if(user.score !== 0) counterGt0++;
              let liEl = document.createElement("li");
              liEl.innerText = `${user.score} - ${user.nickname} - ${user.fullname} - ${user.position} - ${user.organization} 
                ${user.phone} - ${user.email}`;
              if (userLocalData && user.fullname === userLocalData.fullname) {
                liEl.classList.add("current-user");
              } else if (i % 2 !== 0) {
                liEl.classList.add("gray-user");
              }
              ratingOl.appendChild(liEl);
            });
          totalGt0.innerText = counterGt0;
        }
      })
      .catch((error) => {
        console.log(error.message);
      });
  };
}

rating();
