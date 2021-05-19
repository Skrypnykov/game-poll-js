const url = 'https://pollgame-be.herokuapp.com/'

export async function apiGet(url) {
  const requestProp = {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }
  };

  const response = await fetch(url, requestProp);
    
  if (!response.ok) {
    const error = response.status + " " + response.statusText;
    throw new Error(error)
    }
  const body = await response.json();
  return body
}

export async function question () {
  const fullUrl = `${url}question`;

  apiGet(fullUrl).then(( responseData ) => {
    console.log(responseData);
  })
  .catch(error => {
    console.log(error.message)
  })
};

