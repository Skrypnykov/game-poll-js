import setData from "./setData.js";

// const url = "http://127.0.0.1:3000/users";
const url = "https://pollgame-be.herokuapp.com/users";
const accountForm = document.getElementById( "accountForm" );

$(function(){
  $("#phone").mask("+38 (0**) ***-**-**");
});

const userLocalData = JSON.parse(localStorage.getItem("userData"));
if (userLocalData) {
  accountForm.elements[0].value = userLocalData.nickname;
  accountForm.elements[1].value = userLocalData.fullname;
  accountForm.elements[2].value = userLocalData.organization;
  accountForm.elements[3].value = userLocalData.position;
  accountForm.elements[4].value = userLocalData.phone;
}

accountForm.addEventListener( 'submit', function ( event ) {
  const userId = localStorage.getItem("userId");
  const token = localStorage.getItem("token");
  console.log(typeof userId, typeof token)
  event.preventDefault();
  const formArray = Array.from(event.target);
  let formData = {};
  if (token && userId) {
    const userUrl = url + "/" + userId;
    formArray.forEach((value) => {
      if(value.id) formData[value.id] = value.value;
  })
  setData(userUrl, token, formData);
  };
});
