import { apiGet } from "./getData.js";
import { URL } from "./constants.js";

const sendMailButton = document.getElementById("sendMailButton");

export const sendEmail = (userData) => {
    console.log(userData.email);
    const fullUrl = URL + "users/recovery/" + userData.email;

    apiGet(fullUrl)
    .then(ResponseData => console.log(ResponseData))
    .catch(error => console.log(error))
};
