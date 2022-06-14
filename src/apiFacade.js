import URL from "./settings";
import jwtDecode from "jwt-decode";
function handleHttpErrors(res) {
  if (!res.ok) {
    return Promise.reject({ status: res.status, fullError: res.json() })
  }
  return res.json();
}

function apiFacade() {
  const setToken = (token) => {
    localStorage.setItem('jwtToken', token)
  }
  const getToken = () => {
    return localStorage.getItem('jwtToken')
  }
  
  const decodeToken = () => {
    const token = getToken()
    const decodeToken = token;
    const decode = jwtDecode(decodeToken)
    setToken(token);
    return decode
  }

  const loggedIn = () => {
    const loggedIn = getToken() != null;
    return loggedIn;
  }
  const logout = () => {
    localStorage.removeItem("jwtToken");
  }

  const login = (user, password) => {
    const options = makeOptions("POST", true, { username: user, password: password });
    return fetch(URL + "/api/login", options)
      .then(handleHttpErrors)
      .then(res => { setToken(res.token) })
  }
  const fetchUserInfo = () => {
    const options = makeOptions("GET", true); //True add's the token
    return fetch(URL + "/api/info/userinfo", options).then(handleHttpErrors);
  }

  const create = (username, password) => {
    const options = makeOptions("POST", false, { userName: username, userPass: password }); //True add's the token
    return fetch(URL + "/api/info/create", options)
      .then(handleHttpErrors)
      .then(res => { login(username, password) })
  }

  const getAllBoats = () => {
    const options = makeOptions("GET", true);
    return fetch(URL + "/api/boats", options).then(handleHttpErrors)
  }

  const getBoatById = (id) => {
    const options = makeOptions("GET", true);
    return fetch(URL + `/api/boats/id/${id}`, options).then(handleHttpErrors)
  }

  const createBoat = (boat) => {
    const options = makeOptions("POST", true, boat);
    return fetch(URL + "/api/boats/create", options).then(handleHttpErrors)
  }

  const updateBoat = (boat) => {
    const options = makeOptions("PUT", true, boat);
    return fetch(URL + `/api/boats/update`, options).then(handleHttpErrors)
  }

  const deleteBoat = (id) => {
    const options = makeOptions("DELETE", true);
    return fetch(URL + `/api/boats/delete/${id}`, options).then(handleHttpErrors)
  }

  const getAllHarbours = () => {
    const options = makeOptions("GET", true);
    return fetch(URL + "/api/harbours", options).then(handleHttpErrors)
  }
  
  const getHarbourById = (id) => {
    const options = makeOptions("GET", true);
    return fetch(URL + `/api/harbours/id/${id}`, options).then(handleHttpErrors)
  }

  const getBoatsFromHarbourById = (id) => {
    const options = makeOptions("GET", true);
    return fetch(URL + `/api/harbours/id/${id}/boats`, options).then(handleHttpErrors)
  }

  const createHarbour = (harbour) => {
    const options = makeOptions("POST", true, harbour);
    return fetch(URL + "/api/harbours/create", options).then(handleHttpErrors)
  }

  const getAllOwners = () => {
    const options = makeOptions("GET", true);
    return fetch(URL + "/api/owners", options).then(handleHttpErrors)
  }

  const getOwnerById = (id) => {
    const options = makeOptions("GET", true);
    return fetch(URL + `/api/owners/id/${id}`, options).then(handleHttpErrors)
  }

  const createOwner = (owner) => {
    const options = makeOptions("POST", true, owner);
    return fetch(URL + "/api/owners/create", options).then(handleHttpErrors)
  }
 
  const makeOptions = (method, addToken, body) => {
    var opts = {
      method: method,
      headers: {
        "Content-type": "application/json",
        'Accept': 'application/json',
      }
    }
    if (addToken && loggedIn()) {
      opts.headers["x-access-token"] = getToken();
    }
    if (body) {
      opts.body = JSON.stringify(body);
    }
    return opts;
  }
  return {
    makeOptions,
    setToken,
    getToken,
    decodeToken,
    loggedIn,
    login,
    logout,
    fetchUserInfo,
    create,
    getAllBoats,
    getBoatById,
    createBoat,
    updateBoat,
    deleteBoat,
    getAllHarbours,
    getHarbourById,
    getBoatsFromHarbourById,
    createHarbour,
    getAllOwners,
    getOwnerById,
    createOwner
  }
}
const facade = apiFacade();
export default facade;
