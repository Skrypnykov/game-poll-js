async function setData(url, bearerToken, data) {

    console.log(url, bearerToken, data)

    const requestProp = {
      method: "PUT",
      headers: {
        "Authorization": "Bearer " + bearerToken,
        "Content-Type": "application/json"
     },
     body: JSON.stringify(data)
     };

     const res = await fetch(url, requestProp);
 
     if (!res.ok) {
       throw new Error(`Could not fetch ${url}, received ${res.status}`);
     } else {console.log("Данные сохранены")}

     const body = await res.json();
     console.log(body)
     localStorage.setItem("userData", JSON.stringify(body))
     return body
   }
 
 export default setData;
 