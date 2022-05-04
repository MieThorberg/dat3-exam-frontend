import React, {useState, useEffect, useRef} from 'react'
import { io } from 'socket.io-client'
// import Moment from 'react-moment'
import "../styles/Chat.css"
import { useLocation } from 'react-router-dom'


const Chat = () => {
  const location = useLocation()
  const msgBoxRef = useRef()

  const [ data, setData ] = useState({})
  const [ msg, setMsg ] = useState("")
  const [ loading, setLoading ] = useState(false)
  const [ allMessages, setMessages ] = useState([])
  const [ socket, setSocket ] = useState()

  useEffect(() => {
      const socket = io("http://localhost:9000")
      setSocket(socket)

      socket.on("connect", () => {
          console.log("socket Connected")
          socket.emit("joinRoom", location.state.room)
      })        
  }, [])

  useEffect(() => {
      if(socket){
          socket.on("getLatestMessage", (newMessage) => {
              console.log(allMessages)
              console.log(newMessage)
              setMessages([ ...allMessages,  newMessage ])
              msgBoxRef.current.scrollIntoView({behavior: "smooth"})
              setMsg("")
              setLoading(false)
          })
      }
  }, [socket, allMessages])    

  useEffect(() => {
      setData(location.state)
  }, [location])
  
  const handleChange = e => setMsg(e.target.value)
  const handleEnter = e => e.keyCode===13 ? onSubmit() : ""
  const onSubmit = () => {
      if(msg){
          setLoading(true)
          const newMessage = { time:new Date(), msg, name: data.name }
          socket.emit("newMessage", {newMessage, room: data.room})
      }
  }

  return (
      <div>
              <div>
                  <h1 className='center-text'>Welcome to Werewolf</h1>
                  <h1 className='center-text'>Room: {data?.room} User:{data.name}</h1>
              </div>
              <div>
                  {
                      allMessages.map(msg => {
                          return data.name === msg.name
                          ?
                          <div >
                              <div>
                                  <div>
                                      <strong>{msg.name}:</strong>
                                  </div>
                                  <h4>{msg.msg}</h4>
                              </div>
                          </div>
                          :
                          <div>
                              <div>
                                  <div>
                                      <strong >{msg.name}:</strong>
                                  </div>
                                  <h4>{msg.msg}</h4>
                              </div>
                          </div>
                      })
                  }
                  <div ref={msgBoxRef} ></div>
              </div>
              <div >
                  <input type="text"  name="message" onKeyDown={handleEnter} placeholder="Type your message" value={msg} onChange={handleChange} />
                  <button type="button" className='button-style' disabled={loading} onClick={onSubmit}>
                      {
                          loading
                          ?
                          <div></div>                            
                          :
                          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-send" viewBox="0 0 16 16">
                              <path d="M15.854.146a.5.5 0 0 1 .11.54l-5.819 14.547a.75.75 0 0 1-1.329.124l-3.178-4.995L.643 7.184a.75.75 0 0 1 .124-1.33L15.314.037a.5.5 0 0 1 .54.11ZM6.636 10.07l2.761 4.338L14.13 2.576 6.636 10.07Zm6.787-8.201L1.591 6.602l4.339 2.76 7.494-7.493Z"></path>
                          </svg>
                      }
                  </button>   
              </div>

      </div>
  )
}

export default Chat;