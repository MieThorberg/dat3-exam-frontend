import React from 'react'

const Room = () => {
  return (
    <div  >
        
              <div >
                
                  <h1>Welcome to Room: {data?.room} ${data.name}</h1>
              </div>
              <div  style={{height: "450px", overflowY:"scroll"}}>
                  {
                      allMessages.map(msg => {
                          return data.name === msg.name
                          ?
                          <div >
                              <div>
                                  <div>
                                      <strong>{msg.name}:</strong>
                                      {/* <small className="text-muted m-1"><Moment fromNow>{msg.time}</Moment></small> */}
                                  </div>
                                  <h4>{msg.msg}</h4>
                              </div>
                          </div>
                          :
                          <div>
                              <div>
                                  <div>
                                      <strong >{msg.name}:</strong>
                                      {/* <small className="text-mmuted m-1"><Moment fromNow>{msg.time}</Moment></small> */}
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
                  <button type="button" disabled={loading} onClick={onSubmit}>
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

export default Room