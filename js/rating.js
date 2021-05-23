<<<<<<< HEAD
import {apiGet} from "./getData.js";

const url = "https://pollgame-be.herokuapp.com/users"


const ratingOl = document.getElementById( "rating-ol" );

const userLocalData = JSON.parse(localStorage.getItem("userData"));


async function rating () {
  apiGet(url).then(( responseData ) => {
    const ratingArr = responseData;
    if (ratingArr) {
      ratingArr.sort(((a, b) => b.score - a.score)).forEach((user, i) => {
        let liEl = document.createElement("li");
        liEl.innerText = `${user.score} - ${user.fullname} - ${user.email}`;
        if (user.email === userLocalData.email) {
          liEl.classList.add('current-user');
        } else if (i % 2 !== 0) { liEl.classList.add('gray-user'); }
        ratingOl.appendChild(liEl);
      });
    }

    if (userLocalData) {
    }
  })
  .catch(error => {
    console.log(error.message)
  })
};

rating();
=======
import {apiGet} from "./getData.js";

const url = "https://pollgame-be.herokuapp.com/users"


const ratingOl = document.getElementById( "rating-ol" );

const userLocalData = JSON.parse(localStorage.getItem("userData"));


async function rating () {
  apiGet(url).then(( responseData ) => {
    const ratingArr = responseData;
    if (ratingArr) {
      ratingArr.sort(((a, b) => b.score - a.score)).forEach((user, i) => {
        let liEl = document.createElement("li");
        liEl.innerText = `${user.score} - ${user.fullname} - ${user.email}`;
        if (user.email === userLocalData.email) {
          liEl.classList.add('current-user');
        } else if (i % 2 !== 0) { liEl.classList.add('gray-user'); }
        ratingOl.appendChild(liEl);
      });
    }

    if (userLocalData) {
    }
  })
  .catch(error => {
    console.log(error.message)
  })
};

rating();
>>>>>>> origin/valid
