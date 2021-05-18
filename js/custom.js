import {register, signIn} from "./users.js"
import { question } from "./getData.js"

const registerForm = document.getElementById( "signUpForm" );
const signInForm = document.getElementById( "signInForm" );

function GetIntRandom(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function onClickSpin() {
    document.getElementById('buttons-animate').classList.toggle('animated');
    setTimeout(function () {
        handler()
    }, 1000);
}

function handler() {
    location.href = "pages/" + "page" + GetIntRandom(1, 16) + ".html";
}

registerForm.addEventListener( 'submit', function ( event ) {

  event.preventDefault();
  const formArray = Array.from(event.target);
  let userData = {};
  formArray.forEach((value) => {
    userData[value.id] = value.value;
  }) 
  register(userData);

});

signInForm.addEventListener( 'submit', function ( event ) {

  event.preventDefault();
  const formArray = Array.from(event.target);
  let userData = {};
  formArray.forEach((value) => {
    userData[value.id] = value.value;
  }) 
  signIn(userData);
  
});