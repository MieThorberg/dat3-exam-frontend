import React, {useState, useEffect, useRef} from 'react'
import { io } from 'socket.io-client'
// import Moment from 'react-moment'
import "../styles/Chat.css"
import { useLocation } from 'react-router-dom'
import Room from './Room'
import facade from '../apiFacade'


const Chat = () => {
  const location = useLocation()
  const [ data, setData ] = useState({})
  const [ role, setRole ] = useState("")
  const [players, setPlayers] = useState([])

  useEffect(() => {

          console.log("Role set")
          setRole(location.state.role)
              
  }, [])  


  useEffect(() => {
      setData(location.state)
  }, [location])

  useEffect(() =>{
    facade.getPlayers(1).then(data => setPlayers(data))
  },[])
  console.log(players);


  const startGame = () => {
      const players = [{userName:"user", userPass:"test123"},
      {userName:"admin", userPass:"test123"},
      {userName:"user_admin", userPass:"test123"}]
      facade.createPlayers(players, 1)
  }

  return (
      <div >
              <div>
                  <h1 className='center-text'>Welcome to Werewolf: {data.name}</h1>
                  <h1 className='center-text'>Room: {data?.room}</h1>
                  <h1 className='center-text'></h1>
                  {players.map((player, index) => {
                     return <div key={index}>
                          <h3 >{player.username}</h3>
                      </div>
                  })}
              </div>
              
                  <Room room={location.state.room} chatHeader="Global chat" />
              <button onClick={startGame}>start</button> 
              <div>
                  {role === 'werewolf' ?
                  <Room room={2} chatHeader="Wolf Chat"/>
                  :
                  <div></div>

                    }
              </div>
              
              
              

      </div>
  )
}

export default Chat;