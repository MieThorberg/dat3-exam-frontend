import React, { useState, useEffect, useRef } from 'react'
import { io } from 'socket.io-client'
// import Moment from 'react-moment'
/* import "../styles/Chat.css" */
import { useLocation } from 'react-router-dom'
import Room from './Room'
import facade from '../apiFacade'
import "../styles/GameSideBar.css";
import image from "../images/1.jpg"


const GameSideBar = ({characterName}) => {
    const [scrollSize, setScrollSize] = useState("50");
    const location = useLocation()
    const [data, setData] = useState({})
    const [role, setRole] = useState("")
    const [players, setPlayers] = useState([])

    useEffect(() => {
        setData(location.state)
    }, [location])

    return (

        <div className='sidebar'>
            <div className='header'>
                <div className='sidebar-profile'>
                    <img src={image} />
                </div>
                <div className='sidebar-name'>
                    <a>user</a>
                </div>
            </div>
            <div className='content'>
                <div className='chatbar'>

                    <Room room={location.state.room} chatHeader="Global chat" scrollSize={scrollSize} />
                    {/* <Room room={2} chatHeader="Werewolf chat" /> */}
                    {/* TODO: fix werewolf chat to work when playing games */}
                    <div>
                        {characterName === 'werewolf' ?
                            <>
                            {/* {setScrollSize("30vh")} */}
                                < Room room={2} chatHeader="Wolf Chat" scrollSize={scrollSize} />

                            </>
                            :
                            <div></div>
                        }
                    </div>
                </div>

            </div>
        </div>







    )
}

export default GameSideBar;