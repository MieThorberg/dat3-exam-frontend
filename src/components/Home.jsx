import React from 'react'
import "../styles/App.css";


import facade from '../apiFacade';
import { useState } from 'react';
import { useEffect } from 'react';
const Home = ({ setHeadline }) => {
  const [game, setGame] = useState("");

  //title i topnav
  useEffect(() => {
    setHeadline("Home");
  }, []);


  function createGame() {
    facade.createGame("admin", "test123");
    facade.getGameById("16").then(data => setGame(data));
    console.log(game);
  }


  return (


    <div className='main'>
      <div className='main-container'>
        <div style={{gridTemplateRows: "60% auto"}}></div>
        <div className='section' style={{gridTemplateRows: "60% auto"}}>
          <div className='header'> 
            <h1>Let's play</h1>
            <h2>Create or join a game to start playing werewolf with your friends</h2>
          </div>
          <div className='content' style={{gridTemplateRows: "60% auto"}}>
            <button className='btn-lightpurple' style={{maxWidth: "200px"}} onClick={event => window.location.href = "/game_settings"}>Create</button>
            <button className='btn-purple' style={{maxWidth: "200px"}} onClick={event => window.location.href = "/gamepin"}>Join</button>
          </div>

        </div>

        <div></div>
      </div>

    </div>


    /* <main>
      <div className='row'>
        <div className='column'>
          <div className='image-container'>
            <div className='centered'>
              <h2>startcode!</h2>
              <button onClick={createGame}>Create game</button>
            </div>
          </div>
        </div>
      </div>
    </main> */
  )
}

export default Home