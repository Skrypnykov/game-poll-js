## Register user

url = 'https://pollgame-be.herokuapp.com/users/'
userData = {nikName:"2nikName",fullName:"2fullName",organization:"2organization",position:"2position",email:"nikname@gmail.com",phone:"+38 (095) 358-54-21",password:"147258369"}

async function registerUser(url, userData) {
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
  console.log(body)
  return body
}