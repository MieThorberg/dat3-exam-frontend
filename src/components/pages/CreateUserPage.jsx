import React from 'react'
import "../../styles/App.css"
import Chat from '../Chat'

const CreateUserPage = () => {
    return (
        <>

        <div id="rows" className='rows-2'>
            <div id="left" className='left'>
                {/* Left chat side bar for big screen */}
                <div className='chat'>
                    {/* Close button */}
                    <div className='top'>
                        <i /* onClick={setChat} */ className="fa fa-close"></i>
                    </div>

                    {/* Header */}
                    <div className='header'>
                        <h1>Chat</h1>
                    </div>

                    {/* Listing all chat groups */}
                    <div className='content'>

                        {/* The chat for all players */}
                        <div className='chat-container'>

                            {/* Chatgroup btn */}
                            <div className="open-chat" onClick={function () {
                                openChatGroup("village")
                            }}>
                                <div style={{ textAlign: "left" }}>Village chat (25)</div>
                                <div style={{ textAlign: "right" }}>v</div>
                            </div>

                            {/* The popup when clicking on the chatgroup btn */}
                            <div id="village" className='popup'>
                                <Chat />
                                {/* <button onClick={function () {
                                    closeChatGroup("village");
                                }}>Send message</button> */}
                            </div>

                        </div>

                        {/* The chat for all werewolves */}
                        {/*  <div className='chat-container'> */}

                        {/* Chatgroup btn */}
                        {/* <div className='open-chat' onClick={function () {
                                openChatGroup("werewolf")
                            }}>Werewolf</div>
*/}
                        {/* The popup when clicking on the chatgroup btn */}
                        {/*  <div id="werewolf" className='popup'>
                                <h1>Village chat</h1>
                                <button onClick={function () {
                                    closeChatGroup("werewolf");
                                }}>Send message</button>
                            </div>
                        </div> */}

                    </div>
                </div>
            </div>
            <div id="right" className='right'>
                <div className='content'>
                    <div>Hello</div>
                </div>
            </div>

        </div>{/*  */}
    </>
    )
}

export default CreateUserPage;