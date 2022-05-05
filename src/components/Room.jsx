import React, {useState, useEffect, useRef} from 'react'
import { io } from 'socket.io-client'
import { useLocation } from 'react-router-dom'

const Room = () => {
    const location = useLocation()
    const msgBoxRefw = useRef()
    const [ data, setData ] = useState({})
    const [ msgw, setMsgw ] = useState("")
    const [ role, setrole ] = useState("")
    const [ loading, setLoading ] = useState(false)

    const [ allWerewolfMessages, setWerewolfMessages ] = useState([])
    const [ socket, setSocket ] = useState()

    useEffect(() => {
        const socket = io("http://localhost:9000/")
        setSocket(socket)
  
        socket.on("connect", () => {
            console.log("socket Connected")
            socket.emit("joinWRoom", 'werewolf')
        }) 
         
    }, [])

    useEffect(() => {
        //recieves the latest message from the server and sets our useStates
        if(socket){
            socket.on("getLatestWMessage", (newMessage) => {
                console.log(allWerewolfMessages)
                console.log(newMessage)
                setWerewolfMessages([ ...allWerewolfMessages,  newMessage ])
                msgBoxRefw.current.scrollIntoView({behavior: "smooth"})
                setMsgw("")
                setLoading(false)
            })
        }
    }, [socket, allWerewolfMessages]) 
    
      useEffect(() => {
          setData(location.state)
      }, [location])

       //werewolf role
  const handleChangew = e => setMsgw(e.target.value)
  const handleEnterw = e => e.keyCode===13 ? onSubmitw() : ""
  const onSubmitw = () => {
      if(msgw){
          setLoading(true)
          const newWMessage = { time:new Date(), msgw, name: data.name }
          socket.emit("newWMessage", {newWMessage, room: 'werewolf'})
      }
  }


  return (
    <div >
        <div className='card'>
        <div className='render-chat'>
        <h2>Wolf chat</h2>
                  {
                      allWerewolfMessages.map(msgw => {
                          return data.name === msgw.name
                          ?
                          <div >
                              <div>
                                  <div>
                                      <strong className='name-color'>{msgw.name}:</strong>
                                  </div>
                                  <h4>{msgw.msgw}</h4>
                              </div>
                          </div>
                          :
                          //other users
                          <div>
                              <div>
                                  <div>
                                      <strong className='name-color-resp'>{msgw.name}:</strong>
                                  </div>
                                  <h4>{msgw.msgw}</h4>
                              </div>
                          </div>
                      })
                  }
                  <div ref={msgBoxRefw} ></div>
              </div><br></br>
              <div className='form'>
                  <input type="text"  name="messagew" onKeyDown={handleEnterw} placeholder="Type your message" value={msgw} onChange={handleChangew} />
                  <button type="button"  disabled={loading} onClick={onSubmitw}>
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