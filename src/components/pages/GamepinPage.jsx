import React from 'react'
import { useState, useEffect } from 'react'
import { useNavigate, NavLink } from 'react-router-dom'
import "../../styles/App.css"
import facade from '../../apiFacade'

const GamepinPage = () => {
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
      facade.createPlayer(1, { userName: "admin", userPass: "test123" });
    }
  }
  return (
    <div className='main'>
      <div className='main-container'>
        <div style={{ gridTemplateRows: "50% auto" }}></div>

        <div className='section' style={{ gridTemplateRows: "50% auto" }}>
          <div className='header'>
            <h1>Gamepin</h1>
          </div>
          <div className='content' style={{ gridTemplateRows: "60% auto" }}>
            <form className='form-box center-text' onSubmit={handleSubmit}>
              <input type="name" name="name" placeholder="Enter name" onChange={handleChange} />
              <input type="name" name="room" placeholder="Enter pin" onChange={handleChange} />
              {/* <input type="text" placeholder='type gamepin' /> */}
              <button type="submit" className='btn-lightpurple' style={{ maxWidth: "200px" }}>Join game</button>
              {error ? <small>{error}</small> : ""}
            </form>
          </div>
          <div></div>
        </div>


      </div>

    </div>
  )
}

export default GamepinPage;