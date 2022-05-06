import React from 'react'
import { Outlet, Link, NavLink } from "react-router-dom";
import "../styles/Header.css"

function logout() {
  apiFacade.logout();
}

const Header = ({loggedIn, headline}) => {
  function openNav() {
    document.getElementById("mobileNav").style.width = "100%";
  }
  function closeNav() {
    document.getElementById("mobileNav").style.width = "0%";
  }

  //function change color by day and night
  //function to change what to display in topnav

  return (
    <>
      <div className="mobile-topnav">
        <div className="left">
          {/* <!-- back arrow --> */}
         {/*  <img src="wolf.png" className="profile-image-small"> */}
        </div>
        <div className="center">
          <a>{headline}</a>
        </div>
        <div className="right">
          <a className="icon" onClick={openNav}>
            <i className="fa fa-navicon"></i>
          </a>
        </div>
        <div id="mobileNav" className="mobile-nav">
          <a className="icon" onClick={closeNav}>
            <i className="fa fa-navicon"></i>
          </a>
          <div className="mobile-nav-content">
            <a href="/home">Home</a>
            <a href="/rules">About</a>
            <a href="/village">Characters</a>
            <a href="edit_user">Settings</a>
          </div>
        </div>
      </div>

    </>






    /*  <div>
       <header>
         <nav>
           <NavLink className="nav-link" to="/">Home</NavLink>
           <NavLink className="nav-link" to="join">Join game</NavLink>
           {
             loggedIn ?
                 <NavLink className="nav-button" to="/" onClick={logout}>Logout</NavLink>
               : 
               <NavLink className="nav-button" to="login">Login</NavLink>
           }
         </nav>
       </header>
       <Outlet />
     </div> */
  )
}

export default Header