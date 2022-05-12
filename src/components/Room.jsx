import React, {useState, useEffect, useRef} from 'react'
import { io } from 'socket.io-client'
import { useLocation } from 'react-router-dom'

const Room = ({room, chatHeader}) => {
    const location = useLocation()
    const msgBoxRef = useRef()
    const [ data, setData ] = useState({})
    const [ msg, setMsg ] = useState("")
    const [ role, setrole ] = useState("")
    const [userNumber, setUserNumber] = useState([])
    const [ loading, setLoading ] = useState(false)

    const [ allMessages, setMessages ] = useState([])
    const [ socket, setSocket ] = useState()

    useEffect(() => {
        const socket = io("https://react-chat-werewolf-server.herokuapp.com/")
        setSocket(socket)
  
        socket.on("connect", () => {
            console.log("socket Connected")
            socket.emit("joinRoom", room)
            // when a new user enters the room we add the new user to the total number in the room
            socket.on("newclientconnect", (newClient) => {
                setUserNumber(newClient)
                // console.log(newClient)
               
            })
        }) 
  
    }, [])

 

    useEffect(() => {
        //recieves the latest message from the server and sets our useStates
        if(socket){
            socket.on("getLatestMessage", (newMessage) => {
                // console.log(allMessages)
                // console.log(newMessage)
                setMessages([ ...allMessages,  newMessage ])
                msgBoxRef.current.scrollIntoView({behavior: "smooth"})
                setMsg("")
                setLoading(false)
            })
            
    
        }
    }, [socket, allMessages]) 
    
    //sets the location data
      useEffect(() => {
          setData(location.state)
      }, [location])

  const handleChange = e => setMsg(e.target.value)
  const handleEnter = e => e.keyCode===13 ? onSubmit() : ""
  const onSubmit = () => {
      if(msg){
          setLoading(true)
          const newMessage = { time:new Date(), msg, name: data.name }
          socket.emit("newMessage", {newMessage, room: room})
      }
  }


  return (
    <div >
        <div className='card'>
        <div className='render-chat'>
        <h2>{chatHeader} </h2>
        <h2>Users in chat: {userNumber.description} </h2>
                  {
                      allMessages.map(msg => {
                          return data.name === msg.name
                          ?
                          <div >
                              <div>
                                  <div>
                                      <strong className='name-color'>{msg.name}:</strong>
                                  </div>
                                  <h4>{msg.msg}</h4>
                              </div>
                          </div>
                          :
                          //other users
                          <div>
                              <div>
                                  <div>
                                      <strong className='name-color-resp'>{msg.name}:</strong>
                                  </div>
                                  <h4>{msg.msg}</h4>
                              </div>
                          </div>
                      })
                  }
                  <div ref={msgBoxRef} ></div>
              </div><br></br>
              <div className='form'>
                  <input type="text"  name="message" onKeyDown={handleEnter} placeholder="Type your message" value={msg} onChange={handleChange} />
                  <button type="button"  disabled={loading} onClick={onSubmit}>
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
      </div>
  )
}

export default Room