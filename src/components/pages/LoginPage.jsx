import React, { useState, useEffect } from "react"
import facade from "../../apiFacade";
import { useLocation, useNavigate } from 'react-router-dom'

function LogIn({ login, error, creatingUser }) {
  const navigate = useNavigate();
  const init = { username: "", password: "" };
  const [loginCredentials, setLoginCredentials] = useState(init);


  const performLogin = (evt) => {
    evt.preventDefault();
    login(loginCredentials.username, loginCredentials.password);
    window.scroll(0, 0);

  }
  const onChange = (evt) => {
    setLoginCredentials({ ...loginCredentials, [evt.target.id]: evt.target.value })
  }

  function goToStartPage() {
    navigate("/");
  }

  return (

    <>
      <div className="color-background-container">
        <div id="background-img"></div>
        <div id="background-img-blur"></div>
      </div>
      <div className="login">
        <div className="login-container">
          <div className="section">
            <div
              className="header"
              style={{ justifyContent: "end", paddingBottom: "20px" }}>
              <div onClick={goToStartPage}>
                <p className="back-arrow"><i className="fa fa-arrow-circle-left" style={{ paddingRight: "5px" }}></i> Back</p>
              </div>
              <h1>Login</h1>
              <p>Please login to continue</p>
            </div>
            <div
              className="content"
              style={{ justifyContent: "start", gridTemplateRows: "100%" }}
            >
              <form onChange={onChange} >

                <input type="text" placeholder="Enter username" id="username" />
                <input type="password" placeholder="Enter password" id="password" />
                <div style={{ color: 'red' }}>{error}</div>
                <button className="btn-purple" onClick={performLogin}>Login</button>
                <p style={{ padding: "2px 0 2px 0" }}>or</p>
                <button className="btn-green" onClick={creatingUser}>Create</button>

              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}


function CreateUser({ create }) {
  const navigate = useNavigate();
  const init = { username: "", password: "" };
  const [loginCredentials, setLoginCredentials] = useState(init);

  const performLogin = (evt) => {
    evt.preventDefault();
    create(loginCredentials.username, loginCredentials.password);
    setTimeout(() => {
      navigate("/home");
      window.location.reload();
    }, 500)
  }
  const onChange = (evt) => {
    setLoginCredentials({ ...loginCredentials, [evt.target.id]: evt.target.value })
  }

  function goToLogin() {
    //reloads page in which show the loginpage
    //navigate("/login");
    window.location.reload();
  }

  return (

    <>
      <div className="color-background-container">
        <div id="background-img"></div>
        <div id="background-img-blur"></div>
      </div>
      <div className="login">
        <div className="login-container">
          <div className="section">
            <div className="header" style={{ justifyContent: "end", paddingBottom: "20px" }}>
              <div onClick={goToLogin}>
                <p className="back-arrow"><i className="fa fa-arrow-circle-left" style={{ paddingRight: "5px" }}></i> Back</p>
              </div>
              <h1>Create account</h1>
              <p>Please enter the following</p>
            </div>
            <div
              className="content"
              style={{ justifyContent: "start", gridTemplateRows: "100%" }}
            >
              <form onChange={onChange} >

                <input type="text" placeholder="Enter username" id="username" />
                <input type="password" style={{ marginTop: "20px" }} placeholder="Enter password" id="password" />
                <input type="password" style={{ marginBottom: "30px" }} placeholder="Enter password again" id="password" />
                <button className="btn-purple" onClick={performLogin}>Create</button>

              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  )

}

// not in use anymore!
// function LoggedIn() {
//   const [dataFromServer, setDataFromServer] = useState("Loading...")

//   useEffect(() => {
//     facade.fetchUserInfo().then(data => setDataFromServer(data));
//   }, [])

//   return (
//     <div>
//       <h2>Data Received from server</h2>
//       <h3>Hello {dataFromServer.userName} Role: {dataFromServer.roles}</h3>
//     </div>
//   )

// }

function LoginPage({ loggedIn, setLoggedIn }) {
  const [creatingUser, setCreatingUser] = useState(false);
  const navigate = useNavigate();
  const [error, setError] = useState(null);

  const logout = () => {
    facade.logout()
    setLoggedIn(false)
  }
  const login = (user, pass) => {
    facade.login(user, pass)
      .then(res => setLoggedIn(true)).catch((err) => {
        if (err.status == 403) {
          setError('Wrong username or Password')
        } else {
          setError('Something went wrong')
        }
      });

  }

  function createUser() {
    setCreatingUser(!creatingUser);
  }

  const create = (user, pass) => {
    facade.create(user, pass)
  }

  return (
    <main>
      {!loggedIn ? (!creatingUser ? (<LogIn login={login} error={error} creatingUser={createUser} />) : (<CreateUser create={create} />)) :
        navigate("/home")}
    </main>
  )

}
export default LoginPage;
