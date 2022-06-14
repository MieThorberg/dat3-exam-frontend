import React, { useEffect, useState } from "react"
import facade from "../../apiFacade";
import { useNavigate } from 'react-router-dom'
import "../../styles/LoginPage.css";

function LogIn({ login, error, creatingUser }) {
  const navigate = useNavigate();
  const init = { username: "", password: "" };
  const [loginCredentials, setLoginCredentials] = useState(init);


  const performLogin = (evt) => {
    evt.preventDefault();
    login(loginCredentials.username, loginCredentials.password);
  }
  const onChange = (evt) => {
    setLoginCredentials({ ...loginCredentials, [evt.target.id]: evt.target.value })
  }

  return (

    <>
      <div className="login-section">
        <div>
          <div className="title">
            <h2>Login</h2>
            <p>Please login to continue</p>
          </div>

          <form onChange={onChange} onSubmit={performLogin}>
            <input type="text" placeholder="Enter username" id="username" />
            <input type="password" placeholder="Enter password" id="password" />
            <div style={{ color: 'red' }}>{error}</div>
            <button type="submit" style={{ marginTop: "20px" }}>LOGIN</button>
          </form>
          <p style={{ padding: "5px 0 5px 0" }}>or</p>
          <button className="btn-black" onClick={creatingUser}>CREATE ACCOUNT</button>

        </div>
      </div>
    </>
  )
}


function CreateUser({ create, errorCreate }) {
  const navigate = useNavigate();
  const init = { username: "", password: "" };
  const [loginCredentials, setLoginCredentials] = useState(init);

  const performLogin = (evt) => {
    evt.preventDefault();
    create(loginCredentials.username, loginCredentials.password);
  }
  const onChange = (evt) => {
    setLoginCredentials({ ...loginCredentials, [evt.target.id]: evt.target.value })
  }

  function goToLogin() {
    window.location.reload();
  }

  return (

    <>
      <div className="login-section">
        <div>
          <div className="title">
            <h2>Create account</h2>
            <p>Please enter the following</p>
          </div>

          <form onChange={onChange} onSubmit={performLogin} >
            <input type="text" placeholder="Enter username" id="username" />
            <input type="password" style={{ marginTop: "20px" }} placeholder="Enter password" id="password" />
            <input type="password" style={{ marginBottom: "30px" }} placeholder="Enter password again" id="password2" />
            <button type="submit">CREATE</button>
          </form>
          <button onClick={goToLogin} className="btn-black" style={{ marginTop: "10px" }}>CANCEL</button>
        </div>
      </div>
    </>
  )

}

function LoginPage() {
  const [creatingUser, setCreatingUser] = useState(false);
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const [errorCreate, setErrorCreate] = useState("null");

  useEffect(() => {
    if (facade.getToken() != undefined) {
      navigate("/");
    }
  });


  const logout = () => {
    facade.logout()
    window.location.reload();
  }

  const login = (user, pass) => {
    facade.login(user, pass)
      .then(res => {
        window.location.reload();
      }).catch((err) => {
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
    facade.create(user, pass).then(res => {
      window.location.reload();
    });

  }

  return (
    <main className="login-main">
      {
        (!creatingUser ?
          (<LogIn login={login} error={error} creatingUser={createUser} />)
          :
          (<CreateUser create={create} errorCreate={errorCreate} />)
        )
      }
    </main>
  )

}
export default LoginPage;