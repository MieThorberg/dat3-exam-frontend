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

  const getAllUsers = () => {
    const options = makeOptions("GET", true); //True add's the token
    return fetch(URL + "/api/info/allusers", options).then(handleHttpErrors);
  }

  const getUserById = (id) => {
    const options = makeOptions("GET", true); //True add's the token
    return fetch(URL + `/api/info/id/${id}`, options).then(handleHttpErrors);
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

  /* Rentals fetches */
  const getAllRentals = () => {
    const options = makeOptions("GET", true);
    return fetch(URL + "/api/rentals", options).then(handleHttpErrors)
  }

  const createRental = (rental) => {
    const options = makeOptions("POST", true, rental);
    return fetch(URL + "/api/rentals/create", options).then(handleHttpErrors)
  }

  /* House fetches */
  const getAllHouses = () => {
    const options = makeOptions("GET", true);
    return fetch(URL + "/api/houses", options).then(handleHttpErrors)
  }

  const createHouse = (house) => {
    const options = makeOptions("POST", true, house);
    return fetch(URL + "/api/houses/create", options).then(handleHttpErrors)
  }

  /* Tenants fetches */
  const getAllTenants = () => {
    const options = makeOptions("GET", true);
    return fetch(URL + "/api/tenants", options).then(handleHttpErrors)
  }

  const createTenant = (tenant) => {
    const options = makeOptions("POST", true, tenant);
    return fetch(URL + "/api/tenants/create", options).then(handleHttpErrors)
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
    getUserById,
    getAllUsers,
    fetchUserInfo,
    create,

    getAllRentals,
    createRental,

    getAllHouses,
    createHouse,
    
    getAllTenants,
    createTenant,
  }
}
const facade = apiFacade();
export default facade;
