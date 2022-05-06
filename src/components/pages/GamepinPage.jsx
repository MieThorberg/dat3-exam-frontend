import React from 'react'
import "../../styles/App.css"

const GamepinPage = () => {
    return (
        <div className='main'>
      <div className='main-container'>
        <div style={{gridTemplateRows: "50% auto"}}></div>
       
        <div className='section' style={{gridTemplateRows: "50% auto"}}>
          <div className='header'> 
            <h1>Gamepin</h1>
          </div>
          <div className='content' style={{gridTemplateRows: "60% auto"}}>
              <input type="text" placeholder='type gamepin' />
            <button className='btn-lightpurple' style={{maxWidth: "200px"}} onClick={event => window.location.href = "/game_settings"}>Join game</button>
          </div>
          <div></div>
        </div>

   
      </div>

    </div>
    )
}

export default GamepinPage;