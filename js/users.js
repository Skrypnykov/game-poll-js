const url = "https://pollgame-be.herokuapp.com/";

const statusText = document.getElementById("statusText");
const status2Text = document.getElementById("status2Text");
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

  const response = await fetch(url, requestProp);

  if (!response.ok) {
    const error = response.status + " " + response.statusText;
    throw new Error(error);
  }
  const body = await response.json();
  return body;
}

export async function register(userData) {
  status2Text.innerText = "Виконується реєстрація ...";
  const fullUrl = `${url}users`;
  console.log(userData);

  apiPost(fullUrl, userData)
    .then((responseData) => {
      status2Text.innerText = "Реєстрація виконана";
      $("#modalSignUp").modal("hide");
      signIn(userData);
    })
    .catch((error) => {
      console.log(error.message);
      if (error.message === "417 Expectation Failed") {
        status2Text.innerText = "Такий email або телефон вже зареєстрований";
      } else {
        status2Text.innerText = "Помилка реєстрації";
      }
    });
}

const setSignIn = () => {
  localStorage.clear();
  userInfo.innerText = "";
  signInOutButton.innerText = "Вхiд";
  signInOutButton.dataset.bsToggle = "modal";
  signInOutButton.dataset.bsTarget = "#modalSignIn";
  registerButton.classList.remove("hidden");
  startButton.classList.add("hidden");
};

const setSignOut = () => {
  signInOutButton.innerText = "Вихiд";
  signInOutButton.addEventListener("click", setSignIn);
  delete signInOutButton.dataset.bsToggle;
  delete signInOutButton.dataset.bsTarget;
  registerButton.classList.add("hidden");
  startButton.classList.remove("hidden");
};

export async function signIn(userData) {
  const fullUrl = url + "signin";

  apiPost(fullUrl, userData)
    .then((responseData) => {
      if (statusText) statusText.innerText = "Вхід виконано";
      userInfo.innerText = "Вітаємо " + responseData.email;
      setTimeout(() => $("#modalSignIn").modal("hide"), 1000);
      setSignOut();

      if (responseData) {
        localStorage.setItem("token", responseData.token);
        localStorage.setItem("refreshToken", responseData.refreshToken);
        localStorage.setItem("userId", responseData.userId);
        delete responseData.token;
        delete responseData.refreshToken;
        delete responseData.userId;
        localStorage.setItem("userData", JSON.stringify(responseData));
      }
    })
    .catch((error) => {
      console.log(error.message);
      if (error.message === "403 Forbidden") {
        statusText.innerText = "Невірний пароль";
      } else if (error.message === "404 Not Found") {
        statusText.innerText = "Користувач з таким email не найден";
      } else if (error.message) {
        statusText.innerText = "Помилка входу";
      }
    });
}

export async function verifyAuth() {
  const bearerToken = localStorage.getItem("token");
  const userId = localStorage.getItem("userId");
  const requestProp = {
    method: "GET",
    headers: {
      Mode: "NOCORS",
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: "Bearer " + bearerToken,
    },
  };
  const fullUrl = url + "users/" + userId;

  const res = await fetch(fullUrl, requestProp);

  if (!res.ok) {
    const error = res.status + " " + res.statusText;
    setSignIn();
    throw new Error(error);
  } else {
    const body = await res.json();
    setSignOut();
    userInfo.innerText = "Вітаємо " + body.email;
  }
}
