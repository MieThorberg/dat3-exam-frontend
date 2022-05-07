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
    // console.log(username + " " + password);
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

  const createPlayer = (id, user) => {
    const options = makeOptions("POST", true, user); //True add's the token
    return fetch(URL + `/api/games/${id}/createplayer`, options)
      .then(handleHttpErrors)
      .then(res => { setToken(res.token) })
  }

  const getGameById = (id) => {
    const options = makeOptions("GET", true); //True add's the token
    return fetch(URL + "/api/games/id/" + id, options).then(handleHttpErrors);
  }

  const assignCharacters = (id) => {
    const options = makeOptions("PUT", true, id); //True add's the token
    return fetch(URL + `/api/games/${id}/assigncharacters`, options)
      .then(handleHttpErrors)
      .then(res => { setToken(res.token) })
  }

  //playerid is the vote
  const vote = (gameid, userid, playerid) => {
    const options = makeOptions("PUT", true, {id: playerid}); //True add's the token
    return fetch(URL + `/api/games/${gameid}/${userid}/vote`, options)
      .then(handleHttpErrors)
      .then(res => { setToken(res.token) })
  }

  const getVoteResult = (id) => {
    const options = makeOptions("GET", true); //True add's the token
    return fetch(URL + `/api/games/${id}/voteresult`, options).then(handleHttpErrors);
  }


  const killPlayer = (gameid, playerid) => {
    const options = makeOptions("PUT", true, {id: playerid}); //True add's the token
    return fetch(URL + `/api/games/${gameid}/killplayer`, options)
      .then(handleHttpErrors)
      .then(res => { setToken(res.token) })
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
    createPlayer,
    assignCharacters,
    vote,
    getVoteResult,
    killPlayer,
  }
}
const facade = apiFacade();
export default facade;
