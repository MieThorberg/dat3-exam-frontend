import React from 'react'
import { Outlet, Link, NavLink } from "react-router-dom";
import "../styles/Header.css"

function logout() {
  apiFacade.logout();
}

const Header = ({ loggedIn, headline }) => {
  function openNav(id) {
    document.getElementById(id).style.width = "100%";
  }
  function closeNav(id) {
    document.getElementById(id).style.width = "0%";
  }

  /* nav links when logged in */
  const getHomeNavLinks = () => {
    return (
      <>
        <div><a href="/home">Home</a></div>
        <div><a href="/rules">About</a></div>
        <div><a href="/village">Characters</a></div>
        <div><a href="edit_user">Settings</a></div>
      </>
    )
  }

  /* nav links when a user is playing a game */
  const getPlayNavLinks = () => {
    return (
      <>
        <div><a href="">My Character</a></div>
        <div><a href="">Village</a></div>
        <div><a href="">Graveyard</a></div>
        <div><a href="">Help</a></div>
      </>)
  }

  const getLinks = () => {
    return getHomeNavLinks();
    if (loggedIn) {
      //TODO: Check if user is player then getplayernavlinks()
      return getHomeNavLinks();
    }
  }


  return (
    <div className='nav'>
      {/* SCREEN*/}
      <div className='topnav'>
        <div className='left'>
          {/* TODO: insert player image here instead of link */}
          {/* TODO: insert player name if screen is min 900px width */}

          {/* Check if we should show profile image */}
          {loggedIn ? <div><a>image</a></div> : <></>}

        </div>
        <div className='right'>
          {/* gets the links to show */}
          {getLinks()}
        </div>
      </div>

      {/* MOBILE - topnavigation */}
      <div className='mobile-topnav'>
        <div className='left'>
          {/* Checks if we should show profile image */}
          {loggedIn ? <div><a>image</a></div> : <></>}
        </div>
        <div className='center'>
          <a>{headline}</a>
        </div>
        <div className='right'>
          {/* burger icon */}
          <a className="icon" onClick={function () {
            openNav("mobileNav");
          }}>
            <i className="fa fa-navicon"></i>
          </a>
        </div>

        {/* displaying this content when clicked on the burger icon*/}
        <div id="mobileNav" className="mobile-nav">
          <a className="icon" onClick={function () {
            closeNav("mobileNav");
          }}>
            <i className="fa fa-navicon"></i>
          </a>
          <div className="mobile-nav-content">
            {/* gets the links to show */}
            {getLinks()}
          </div>
        </div>
      </div>
    </div>




    /* <div className="mobile-topnav">
            <div className="left"> */
    /* <!-- back arrow --> */
    /*  <img src="wolf.png" className="profile-image-small"> */
    /* </div>
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
        </div> */

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