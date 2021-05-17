const url = 'https://pollgame-be.herokuapp.com/'
// const userData = {nikName:"2nikName",fullName:"2fullName",organization:"2organization",position:"2position",email:"mail@mail.com",phone:"+380953585421",password:"147258369"}

async function apiPost(url, userData) {
  const requestProp = {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(userData)
  };

  const response = await fetch(url, requestProp);
    
  if (!response.ok) {
    const error = response.status + " " + response.statusText;
    throw new Error(error)
    }
  const body = await response.json();
  return body
}

export async function register (userData) {
  console.log('Выполняется регистрация...');
  const fullUrl = `${url}users`;
  console.log(userData);

  apiPost(fullUrl, userData).then(( responseData ) => {
    console.log("Регистрация выполнена");
    console.log(responseData);
  })
  .catch(error => {
    console.log(error.message)
    if (error.message === "417 Expectation Failed")  {
      console.log("Такой email уже зарегистрирован");
    } else {
      console.log("Ошибка регистрации");
    }
  })
};

export async function signIn (userData) {
  const fullUrl = url + "signin";

  apiPost(fullUrl, userData).then(( responseData ) => {
      console.log("Вход выполнен");
      localStorage.setItem("usedData", JSON.stringify(responseData));
      console.log(responseData);
    })
    .catch((error) => {
      console.log(error.message);
      if (error.message === "403 Forbidden") {
        console.log("Неверный пароль");
      } else if (error.message === "404 Not Found") {
        console.log("Пользователь с таким email не найден");
      } else if (error.message) {
        console.log("Ошибка входа");
      }
    });
};
