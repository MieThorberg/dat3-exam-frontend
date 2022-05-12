import URL from "./settings";
import jwtDecode from "jwt-decode";
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
    localStorage.removeItem("player");
  }

  const setPlayerToken = (token) => {
    localStorage.setItem('player', JSON.stringify(token))
  }
  const getPlayerToken = () => {
    return JSON.parse(localStorage.getItem('player'))
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

  const createGame = (id, pin) => {
    const options = makeOptions("POST", true, { gamePin: pin }); //True add's the token
    // console.log(username + " " + password);
    return fetch(URL + `/api/games/creategame/${id}`, options)
      .then(handleHttpErrors)
  }

  const createPlayers = (players, id) => {
    const options = makeOptions("POST", true, players); //True add's the token
    return fetch(URL + `/api/games/${id}/createplayers`, options)
      .then(handleHttpErrors)
  }

  const getPlayers = (id) => {
    const options = makeOptions("GET", true); //True add's the token
    return fetch(URL + `/api/games/${id}/players`, options).then(handleHttpErrors);
  }

  const getAlivePlayers = (id) => {
    const options = makeOptions("GET", true); //True add's the token
    return fetch(URL + `/api/games/${id}/aliveplayers`, options).then(handleHttpErrors);
  }

  const createPlayer = (id, user) => {
    const options = makeOptions("POST", true, user); //True add's the token
    return fetch(URL + `/api/games/${id}/createplayer`, options)
      .then(handleHttpErrors)
  }

  const getGameById = (id) => {
    const options = makeOptions("GET", true); //True add's the token
    return fetch(URL + "/api/games/id/" + id, options).then(handleHttpErrors);
  }

  const assignCharacters = (id) => {
    const options = makeOptions("PUT", true, id); //True add's the token
    return fetch(URL + `/api/games/${id}/assigncharacters`, options)
      .then(handleHttpErrors)
  }

  //playerid is the vote
  const vote = (gameid, userid, playerid) => {
    const options = makeOptions("PUT", true, { id: playerid }); //True add's the token
    return fetch(URL + `/api/games/${gameid}/${userid}/vote`, options)
      .then(handleHttpErrors)
  }

  const getVoteResult = (id) => {
    const options = makeOptions("GET", true); //True add's the token
    return fetch(URL + `/api/games/${id}/voteresult`, options).then(handleHttpErrors);
  }


  const killPlayer = (gameid, playerid) => {
    const options = makeOptions("PUT", true, { id: playerid }); //True add's the token
    return fetch(URL + `/api/games/${gameid}/killplayer`, options)
      .then(handleHttpErrors)
  }

  const cleanVotes = (id) => {
    const options = makeOptions("PUT", true); //True add's the token
    return fetch(URL + `/api/games/${id}/cleanvotes`, options)
      .then(handleHttpErrors)
  }

  const hasEnded = (id) => {
    const options = makeOptions("GET", true); //True add's the token
    return fetch(URL + `/api/games/${id}/hasended`, options).then(handleHttpErrors);
  }

  const getVictimLatest = (id) => {
    const options = makeOptions("GET", true); //True add's the token
    return fetch(URL + `/api/games/${id}/victims/latest`, options).then(handleHttpErrors);
  }

  const getDay = (id) => {
    const options = makeOptions("GET", true); //True add's the token
    return fetch(URL + `/api/games/${id}/day`, options).then(handleHttpErrors);
  }

  const addDay = (id) => {
    const options = makeOptions("PUT", true); //True add's the token
    return fetch(URL + `/api/games/${id}/addday`, options)
      .then(handleHttpErrors)
  }

  const getCurrentRound = (id) => {
    const options = makeOptions("GET", true); //True add's the token
    return fetch(URL + `/api/games/${id}/rounds/current`, options).then(handleHttpErrors);
  }

  const createNightRound = (id) => {
    const options = makeOptions("POST", true); //True add's the token
    return fetch(URL + `/api/games/${id}/createnightround`, options).then(handleHttpErrors);
  }

  const createDayRound = (id) => {
    const options = makeOptions("POST", true); //True add's the token
    return fetch(URL + `/api/games/${id}/createdayround`, options).then(handleHttpErrors);
  }

  const nightRoundResult = (id) => {
    const options = makeOptions("PUT", true); //True add's the token
    return fetch(URL + `/api/games/${id}/rounds/nightroundresult`, options)
      .then(handleHttpErrors)

  }

  const dayRoundResult = (id) => {
    const options = makeOptions("PUT", true); //True add's the token
    return fetch(URL + `/api/games/${id}/rounds/dayroundresult`, options)
      .then(handleHttpErrors)
  }

  const getWereWolves = (id) => {
    const options = makeOptions("GET", true); //True add's the token
    return fetch(URL + `/api/games/${id}/getwerewolves`, options).then(handleHttpErrors);
  }

  const decodeToken = () => {
    const token = getToken()
    const decodeToken = token;
    const decode = jwtDecode(decodeToken)
    setToken(token);
    return decode
  }

  const getGameByPin = (pin) => {
    const options = makeOptions("GET", true); //True add's the token
    return fetch(URL + `/api/games/gamepin/${pin}`, options).then(handleHttpErrors);
  }

  const setPlayerHost = (id, player) => {
    console.log(player);
    const options = makeOptions("PUT", true, player); //True add's the token
    return fetch(URL + `/api/games/${id}/setplayerhost`, options)
      .then(handleHttpErrors)
      .then(data => { setPlayerToken(data) });
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
    cleanVotes,
    hasEnded,
    getVictimLatest,
    getDay,
    addDay,
    getCurrentRound,
    createNightRound,
    createDayRound,
    nightRoundResult,
    dayRoundResult,
    getWereWolves,
    decodeToken,
    getGameByPin,
    setPlayerToken,
    getPlayerToken,
    setPlayerHost,
    getAlivePlayers,
  }
}
const facade = apiFacade();
export default facade;
