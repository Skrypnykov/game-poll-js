async function api(url, data) {
    const requestProp = {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    };
    const response = await fetch(url, respProp);

    if (!response.ok) {
      const error = response.status + " " + response.statusText;
      throw new Error(error);
    }
    const body = await response.json();
    return body;
  }

const onSubmit = async (data) => {
  const fullUrl = url + "signin";

  api(fullUrl, data)
    .then((responseData) => {
      console.log("Вход выполнен");
      localStorage.setItem("usedData", JSON.stringify(responseData);
      console.log(responseData);
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
