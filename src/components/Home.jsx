import React from 'react'
import "../styles/Home.css";
import facade from '../apiFacade';
import { useState } from 'react';
const Home = () => {
  const [game, setGame] = useState("");

  function createGame() {
    facade.createGame("admin", "test123");
    facade.getGameById("16").then(data => setGame(data));
    console.log(game);

  }


  return (
    <main>
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
    </main>
  )
}

export default Home