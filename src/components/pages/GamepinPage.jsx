import React from 'react'
import { useState, useEffect } from 'react'
import { useNavigate, NavLink } from 'react-router-dom'
import "../../styles/App.css"
import facade from '../../apiFacade'

const GamepinPage = ({ mode }) => {
  let navigate = useNavigate();

  const [error, setError] = useState("")
  //Todo: change so its a user we send to the next page
  const [data, setData] = useState({ name: "", room: "", role: "" })

  const handleChange = e => {
    setData({
      ...data,
      [e.target.name]: e.target.value
    })
  }

  const validation = () => {
    if (!data.name) {
      setError("Please enter your name.")
      return false
    }
    if (!data.room) {
      setError("Please select room.")
      return false
    }
    setError("")
    return true
  }

  const handleSubmit = e => {
    e.preventDefault()
    const isValid = validation()
    if (isValid) {
      navigate(`/join_game/${data.room}`, { state: data });
      //TODO: get user and game id
      //fetch gameByPincode
      facade.createPlayer(2, { userName: "user", userPass: "test123" });
    }
  }
  return (
    <>
      <div className='background-container'>
        <div id='background-img' style={{ backgroundImage: `url(${mode.image})` }}></div>
        <div id='background-img-blur' style={{ backgroundColor: `${mode.blur}` }}></div>
      </div>
      <div className='main'>
        <div className='main-container'>
          <div style={{ gridTemplateRows: "60% auto" }}>
          </div>
          <div className='section' style={{ gridTemplateRows: "50% auto" }}>

            <div className='header' style={{ justifyContent: "end", paddingBottom: "20px" }}>
              <h1>Gamepin</h1>
            </div>

            <div className='content' style={{ justifyContent: "start", gridTemplateRows: "60% auto" }}>

              <form onSubmit={handleSubmit}>
                {/* TODO: delete name input and only have a room input */}
                <input type="text" name="name" placeholder="Enter name" onChange={handleChange} />
                <input type="text" name="room" placeholder="Enter pin" onChange={handleChange} />
                <button className='btn-lightpurple' style={{ maxWidth: "200px" }} onClick={handleSubmit}>Enter</button>
              </form>

            </div>
          </div>
        </div>
      </div>
    </>

  )
}

export default GamepinPage;