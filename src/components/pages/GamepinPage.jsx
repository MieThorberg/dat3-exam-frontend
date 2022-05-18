import React from 'react'
import { useState, useEffect } from 'react'
import { useNavigate, NavLink } from 'react-router-dom'
import "../../styles/App.css"
import facade from '../../apiFacade'

const GamepinPage = ({ mode }) => {
  const navigate = useNavigate();
  const [error, setError] = useState("")
  const [data, setData] = useState({ name: "", room: "", gameid: "" })

  const handleChange = e => {
    setData({
      ...data,
      [e.target.name]: e.target.value
    })
  }

  const validation = () => {
    if (!data.room) {
      setError("Please select room.")
      return false
    }
    setError("")
    return true
  }

  useEffect(() => {
    console.log(data.gameid);
    if (data.gameid != "") {
      navigate(`/join_game/${data.room}`, { state: data });
    }

    if (facade.getToken() == undefined) {
      navigate("/login")
    }
  }, [data])

  const handleSubmit = e => {
    e.preventDefault()
    const isValid = validation()
    if (isValid) {
      /*  navigate(`/join_game/${data.room}`, { state: data }); */
      //fetch gameByPincode

      const user = facade.decodeToken().username;

      facade.getGameByPin(data.room).then(fetchdata => {
        facade.createPlayer(fetchdata.id, { userName: user }).then(data => facade.setPlayerToken(data));
        setData({ ...data, name: user, gameid: fetchdata.id });
      })

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