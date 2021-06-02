import { URL } from "./constants.js";

const statusTextSignIn = document.getElementById("statusTextSignIn");
const statusTextRegister = document.getElementById("statusTextRegister");
const statusTextRecovery = document.getElementById("statusTextRecovery");
const modalSignIn = document.getElementById("modalSignIn");
const signInOutButton = document.getElementById("signInOutButton");
const registerButton = document.getElementById("registerButton");
const startButton = document.getElementById("click");
const userInfo = document.getElementById("userInfo");

async function apiPost(url, userData) {
  const requestProp = {
    method: "POST",
    headers: {
      Mode: "NOCORS",
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userData),
  };

  const response = await fetch(url, requestProp)
  
  if (!response.ok) {
    const error = response.status + " " + response.statusText;
    throw new Error(error);
  }
  const body = await response.json();
  return body;
}

export async function register(userData) {
  statusTextRegister.innerText = "Виконується реєстрація ...";
  const fullUrl = `${URL}users`;
  console.log(userData);
  if (userData.password !== userData.password1) {
    statusTextRegister.innerText = "Пароль і його повтор не збігаються";
    return
  };

  apiPost(fullUrl, userData)
    .then((responseData) => {
      statusTextRegister.innerText = "Реєстрація виконана";
      $("#modalSignUp").modal("hide");
      signIn(userData);
      setTimeout(() => statusTextRegister.innerText = "Пароль не менше 8 символів.", 3000);
    })
    .catch((error) => {
      console.log(error.message);
      if (error.message === "417 Expectation Failed") {
        statusTextRegister.innerText = "Такий email або телефон вже зареєстрований";
      } else {
        statusTextRegister.innerText = "Помилка реєстрації";
      }
      setTimeout(() => statusTextRegister.innerText = "Пароль не менше 8 символів.", 3000);
    });
}

const setSignIn = () => {
  localStorage.clear();
  if(userInfo && signInOutButton && registerButton && startButton) {
    userInfo.innerText = "";
    signInOutButton.innerText = "Вхiд";
    signInOutButton.dataset.bsToggle = "modal";
    signInOutButton.dataset.bsTarget = "#modalSignIn";
    registerButton.classList.remove("hidden");
    startButton.classList.add("hidden");
  }
};

const setSignOut = () => {
  if(signInOutButton && registerButton && startButton) {
    signInOutButton.innerText = "Вихiд";
    signInOutButton.addEventListener("click", setSignIn);
    delete signInOutButton.dataset.bsToggle;
    delete signInOutButton.dataset.bsTarget;
    registerButton.classList.add("hidden");
    startButton.classList.remove("hidden");
  }
};

const setLocalData = (responseData) => {
  const data = responseData;
  if(data.token) localStorage.setItem("token", data.token);
  if(data.refreshToken) localStorage.setItem("refreshToken", data.refreshToken);
  if(data.userId) localStorage.setItem("userId", data.userId);
  delete data.token;
  delete data.refreshToken;
  delete data.userId;
  localStorage.setItem("userData", JSON.stringify(data));
};

export async function signIn(userData) {
  const fullUrl = URL + "signin";

  apiPost(fullUrl, userData)
    .then((responseData) => {
      if (responseData.email) {
        statusTextSignIn.innerText = "Вхід виконано";
        userInfo.innerText = "Вітаємо " + responseData.email;
        setTimeout(() => $("#modalSignIn").modal("hide"), 1000);
        console.log(responseData)
        setLocalData(responseData);
        setSignOut();
      } else { statusTextSignIn.innerText = "Неверни данни" };
      setTimeout(() => statusTextSignIn.innerText = "Введіть реєстраційні дані.", 3000);
    })
    .catch((error) => {
      if (error.message === "403 Forbidden") {
        statusTextSignIn.innerText = "Невірний пароль";
      } else if (error.message === "404 Not Found") {
        statusTextSignIn.innerText = "Користувача з таким email не знайдено";
      } else if (error.message) {
        statusTextSignIn.innerText = "Помилка входу";
      }
      setTimeout(() => statusTextSignIn.innerText = "Введіть реєстраційні дані.", 3000);
    });
}

export async function verifyAuth() {
  const bearerToken = localStorage.getItem("token");
  const userId = localStorage.getItem("userId");
  if (!userId || !bearerToken) {
    setSignIn();
    return
  };
  const requestProp = {
    method: "GET",
    headers: {
      Mode: "NOCORS",
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: "Bearer " + bearerToken,
    },
  };
  const fullUrl = URL + "users/" + userId;

  const res = await fetch(fullUrl, requestProp);

  if (!res.ok) {
    setSignIn();
  } else {
    const body = await res.json();
    console.log(body)
    setLocalData(body);
    setSignOut();
    userInfo.innerText = "Вітаємо " + body.email;
  }
};

export async function recovery(userData) {
  const fullUrl = URL + "users/recovery/" + userData.email;

  apiPost(fullUrl, {})
    .then((responseData) => {
      if (responseData) {
        statusTextRecovery.innerText = "Лист відправлено";
        setTimeout(() => $("#modalRecovery").modal("hide"), 2000);
        setTimeout(() => statusTextRecovery.innerText = "Введіть адресу електронної пошти", 3000);
      };
    })
    .catch((error)=>{ 
      if (error.message === "403 Forbidden") {
        statusTextRecovery.innerText = "Невірний пароль";
      } else if (error.message === "404 Not Found") {
        statusTextRecovery.innerText = "Користувача з таким email не знайдено";
      } else if (error.message) {
        statusTextRecovery.innerText = "Помилка";
      }
      setTimeout(() => statusTextRecovery.innerText = "Введіть адресу електронної пошти", 3000);
    });
}
