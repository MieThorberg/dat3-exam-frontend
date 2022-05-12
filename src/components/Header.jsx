import React from 'react'
import { Outlet, Link, NavLink } from "react-router-dom";
import { useState } from 'react';
import "../styles/Header.css"
import Chat from './Chat';
import facade from '../apiFacade';
import profileImage from "../images/1.jpg";


const Header = ({ mode, headline }) => {
  const [showChat, setShowChat] = useState(false);

  function openBurgerMenu() {
    document.getElementById("mobileNav").style.width = "100%";
  }
  function closeBurgerMenuNav() {
    document.getElementById("mobileNav").style.width = "0%";
  }

  function logout() {
    facade.logout();
    //need to reload page to make it return to login page after logout
    window.location.reload();
  }

  /* nav links when logged in */
  const getHomeNavLinks = () => {
    return (
      <>
        <div><a href="/home">Home <i className="fa fa-home" style={{ paddingLeft: "5px" }}></i></a></div>
        <div><a href="/rules">How to play <i className="fa fa-question-circle" style={{ paddingLeft: "5px" }}></i></a></div>
        <div><a href="/edit_user/:room">Settings <i className="fa fa-cog" style={{ paddingLeft: "5px" }}></i></a></div>
        <div><a href="" onClick={logout}>Logout <i className="fa fa-sign-out" style={{ paddingLeft: "5px" }}></i></a></div>
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

  return (
    <>
      {facade.getToken() != undefined ?
        <>
          <div className='nav'>
            {/* SCREEN - topnavigation*/}
            <div className='topnav'>
              <div className='left'>
                <div><img className='profile' src={profileImage} /></div>
                <div> <a>{facade.decodeToken().username}</a></div>
              </div>
              <div className='right'>
                {getHomeNavLinks()}
              </div>
            </div>

            {/* MOBILE - topnavigation */}
            <div className='mobile-topnav'>
              <div className='left'>
                <div><img className='profile' src={profileImage} /></div>
              </div>
              <div className='center'>
                <a>{headline}</a>
              </div>
              <div className='right'>
                {/* burger icon */}
                <a className="icon" onClick={openBurgerMenu}>
                  <i className="fa fa-navicon"></i>
                </a>
              </div>

              {/* displaying this content when clicked on the burger icon*/}
              <div id="mobileNav" className="mobile-nav">
                <a className="icon" onClick={closeBurgerMenuNav}>
                  <i className="fa fa-navicon"></i>
                </a>
                <div className="mobile-nav-content">
                  {getHomeNavLinks()}
                </div>
              </div>
            </div>
          </div></>
        :
        <></>
      }
    </>
  )
}

export default Header