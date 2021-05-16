import onSubmit from "./register.js"

const registerForm = document.getElementById( "signUpForm" );
const signUpFrm = document.forms.signUpForm;

console.log(signUpFrm, registerForm);

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
  onSubmit(userData);
});

