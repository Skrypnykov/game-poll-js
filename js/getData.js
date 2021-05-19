const url = "https://pollgame-be.herokuapp.com/";
// const userData = {nikName:"2nikName",fullName:"2fullName",organization:"2organization",position:"2position",email:"mail@mail.com",phone:"+380953585421",password:"147258369"}

export async function apiGet(url) {
  const requestProp = {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  };

  const response = await fetch(url, requestProp);

  if (!response.ok) {
    const error = response.status + " " + response.statusText;
    throw new Error(error);
  }
  const body = await response.json();
  return body;
}
