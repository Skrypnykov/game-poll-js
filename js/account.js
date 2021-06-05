import { URL } from "./constants.js";
import { rating } from "./rating.js";
import setData from "./setData.js";

const result = document.getElementById("result");
const fullUr = "https://pollgame-be.herokuapp.com/users";
const accountForm = document.getElementById( "accountForm" );
const startButton = document.getElementById("go");
let userData = JSON.parse(localStorage.getItem("userData"));

$(function(){
  $("#phone").mask("+38 (0**) ***-**-**");
});

const chngForm = (data) => {
  const datas= data ? data : userLocalData; 
  if (datas) {
    accountForm.elements[0].value = datas.nickname;
    accountForm.elements[1].value = datas.fullname;
    accountForm.elements[2].value = datas.organization;
    accountForm.elements[3].value = datas.position;
    accountForm.elements[4].value = datas.phone;
  }
};

const chngButton = (userData) => {
  if(userData.rated) result.innerText = "Не відображати мої результати в загальному рейтингу";
    else result.innerText = "Відображати мої результати в загальному рейтингу"; 
};

accountForm.addEventListener( 'submit', function ( event ) {
  const userId = localStorage.getItem("userId");
  const token = localStorage.getItem("token");
  event.preventDefault();
  const formArray = Array.from(event.target);
  let formData = {};
  if (token && userId) {
    const userUrl = URL + "users/" + userId;
    formArray.forEach((value) => {
      if(value.id) formData[value.id] = value.value;
  })
  formData.rated = true;
  setData(userUrl, token, formData).then((data) => {
    userData = JSON.parse(localStorage.getItem("userData"));
    const datas = data ? data : userData;
      chngForm(datas);
      rating();
    }).catch((err) => console.log(err))
  };
});

result.addEventListener( 'click', () => {
  const userId = localStorage.getItem("userId");
  const token = localStorage.getItem("token");
  if (token && userId) {
    const userUrl = URL + "users/" + userId;
    const rated = {rated: !userData.rated};
    setData(userUrl, token, rated).then((data) => {
      userData = JSON.parse(localStorage.getItem("userData"));
      const datas = data ? data : userData;
      chngButton(datas);
      rating();
    }).catch((err) => console.log(err))
  };
});

startButton.addEventListener("click", () => location.href = "./question.html");

chngForm(userData);
chngButton(userData);
