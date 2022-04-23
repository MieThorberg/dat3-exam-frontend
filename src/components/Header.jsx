import React from 'react'
import { Outlet, Link, NavLink } from "react-router-dom";
import "../styles/Header.css"

function logout() {
    apiFacade.logout();
}

const Header = ( { loggedIn } ) => {
  return (
    <div>
      <header>
        <nav>
          <NavLink className="nav-link" to="/">Home</NavLink>
          {
            loggedIn ?
                <NavLink className="nav-button" to="/" onClick={logout}>Logout</NavLink>
              : 
              <NavLink className="nav-button" to="login">Login</NavLink>
          }


        </nav>
      </header>
      <Outlet />
    </div>
  )
}

export default Header