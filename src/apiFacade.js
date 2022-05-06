import URL from "./settings";

function handleHttpErrors(res) {
  if (!res.ok) {
    return Promise.reject({ status: res.status, fullError: res.json() })
  }
  return res.json();
}

function apiFacade() {
  /* Insert utility-methods from a later step (d) here (REMEMBER to uncomment in the returned object when you do)*/
  const setToken = (token) => {
    localStorage.setItem('jwtToken', token)
  }
  const getToken = () => {
    return localStorage.getItem('jwtToken')
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
    const options = makeOptions("POST", true, { userName: username, userPass: password }); //True add's the token
    console.log(username + " " + password);
    return fetch(URL + "/api/info/newuser", options)
      .then(handleHttpErrors)
      .then(res => { setToken(res.token) })
  }

  const createGame = (username, password) => {
    const options = makeOptions("POST", true, { userName: username, userPass: password }); //True add's the token
    console.log(username + " " + password);
    return fetch(URL + "/api/games/creategame", options)
      .then(handleHttpErrors)
      .then(res => { setToken(res.token) })
  }

  const createPlayers = (players, id) => {
    const options = makeOptions("POST", true, players); //True add's the token
    return fetch(URL + `/api/games/${id}/createplayers`, options)
      .then(handleHttpErrors)
      .then(res => { setToken(res.token) })
  }

  const getPlayers = (id) => {
    const options = makeOptions("GET", true); //True add's the token
    return fetch(URL + `/api/games/${id}/players`, options).then(handleHttpErrors);
  }

  const getGameById = (id) => {
    const options = makeOptions("GET", true); //True add's the token
    return fetch(URL + "/api/game/id/" + id, options).then(handleHttpErrors);
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
    loggedIn,
    login,
    logout,
    fetchUserInfo,
    create,
    createGame,
    getGameById,
    createPlayers,
    getPlayers,
  }
}
const facade = apiFacade();
export default facade;
