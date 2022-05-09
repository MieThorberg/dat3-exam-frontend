import React, {useState, useEffect} from 'react'
import { useNavigate, NavLink } from 'react-router-dom'
import facade from '../apiFacade'
import "../styles/Join.css"

const CreateGame = ({ loggedIn}) => {
  loggedIn = true
  let navigate = useNavigate();

  const [error, setError] = useState("")
  const [data, setData] = useState({ name:"", room:""})
  const [pin, setPin] = useState("");
  const [game, setGame] = useState('')

  const handleChange = e => {
      setData({
          ...data, 
          [e.target.name]: e.target.value
      })
      
  }

  const validation = () => {
      if(!data.name){ 
          setError("Please enter your name.")
          return false
      }
    //   if(!data.room){ 
    //       setError("Please select room.")
    //       return false
    //   } 
      setError("")
      return true
  }

  const handleSubmit = e => {
      e.preventDefault()
      const isValid = validation()
      if(isValid){
          navigate(`/chat/${data.room}`, { state: data });
          facade.createGame('user','test123').then(data => setGame(data))
      }

  }

  const generatePin = () => {
    const newPin = Math.floor(100000 + Math.random() * 900000).toString().substring(1);
    setPin(newPin)
    return setData({...data, room: newPin})
}

console.log('room:'+data.room);
console.log('name:'+data.name);
  return (
      <div>
          {loggedIn?
          <form className='form-box center-text' onSubmit={handleSubmit}>
              <div>
                  <h2>Create game</h2>
              </div>
              <div >
                  <input type="name" className='joinInput' name="name" placeholder="Game name" onChange={handleChange} />
              </div>
              <div>
              <input type="name" className='joinInput' name="room" placeholder="Enter pin" value={pin} onChange={handleChange}  /><br></br>
              <input type='button' onClick={generatePin} value="Generate"></input>

              </div>
              <button  type="submit">Create game</button>
              {error ? <small>{error}</small> : "" }
          </form>
          :
          <div>
            <h3>Please Login</h3>
     <NavLink to="/login">Login</NavLink>
          </div>
}
      </div>
  )
}

export default CreateGame