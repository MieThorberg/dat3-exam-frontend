import React, {useState, useEffect} from 'react'
import { useNavigate, NavLink } from 'react-router-dom'
import "../styles/Join.css"

const CreateGame = ({ loggedIn}) => {
  loggedIn = true
  let navigate = useNavigate();

  const [error, setError] = useState("")
  const [data, setData] = useState({ name:"", room:"" })
  const [pin, setPin] = useState("");

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
      }
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
              <input type='button' onClick={() => setPin((pin) => `${pin}1`)} value="Generate"></input>

              </div>
              <button className='button' type="submit">Create game</button>
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