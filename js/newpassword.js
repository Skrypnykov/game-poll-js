import { getData } from "./getData";

const url = "https://pollgame-be.herokuapp.com/users/recovery/";

const sendMailButton = document.getElementById("sendMailButton");

const sendData = (event) => {
    console.log(event.target)
};

sendMailButton.addEventListener("click", event => sendData(event));