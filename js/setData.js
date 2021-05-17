async function setData(url, bearerToken, data) {
    const requestProp = {
      method: 'PUT',
      headers: {
       'Accept': 'application/json',
       'Content-Type': 'application/json',
       'Authorization': `Bearer ${bearerToken}`
     },
     body: JSON.stringify(data)
     };

     const res = await fetch(url, requestProp);
 
     if (!res.ok) {
       throw new Error(`Could not fetch ${url}, received ${res.status}`);
     }

     const body = await res.json();

     return body
   }
 
 export default setData;
 