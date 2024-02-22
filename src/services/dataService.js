function checkSession() {
  const token = JSON.parse(sessionStorage.getItem("token"));
  const bkid = JSON.parse(sessionStorage.getItem("bkid"));
  return { token, bkid };
}

export async function getUser() {
  const sessionData = checkSession();
  const requestOptions = {
    method: "GET",
    headers: {"Content-Type": "application/json", Authorization: `Bearer ${sessionData.token}`}
  }
  if(sessionData.token) {
    const response = await fetch(`${process.env.REACT_APP_HOST}/600/users/${sessionData.bkid}`, requestOptions);
    if(!response.ok) {
      throw{message: response.statusText, status: response.status} //eslint-disable-line
    }
    const data = await response.json();
    return data;
  }
}

export async function addTransaction(dataToSave) {
  const sessionData = checkSession();
  if(sessionData.token) {
    const requestOptions = {
      method: "POST",
      headers: {"Content-Type": "application/json", Authorization: `Bearer ${sessionData.token}`},
      body: JSON.stringify(dataToSave)
    }

    const response = await fetch(`${process.env.REACT_APP_HOST}/660/transactions`, requestOptions); 
    if(!response.ok) {
      throw{message: response.statusText, status: response.status} //eslint-disable-line
    }

    const data = await response.json();
    return data;
  }
}

export async function getUserTransactions() {
  const sessionData = checkSession();
  if(sessionData.token) {
    const requestOptions = {
      method: "GET",
      headers: {"Content-Type": "application/json", Authorization: `Bearer ${sessionData.token}`}
    }

    const response = await fetch(`${process.env.REACT_APP_HOST}/660/transactions?user.id=${sessionData.bkid}`, requestOptions);
    if(!response.ok) {
      throw {message:response.statusText, status: response.status} //eslint-disable-line
    }

    const data = await response.json();
    return data;
  }
}

export async function deleteTransaction(id) {
  const sessionData = checkSession();
  if(sessionData.token) {
    const requestOptions = {
      method: "DELETE",
      headers: {"Content-Type": "application/json"}
    }

    const response = await fetch(`http://localhost:8000/660/transactions/${id}?`, requestOptions);
    if(!response.ok) {
      throw {message:response.statusText, status: response.status} //eslint-disable-line
    }

    const data = await response.json();
    return data;
  }
}