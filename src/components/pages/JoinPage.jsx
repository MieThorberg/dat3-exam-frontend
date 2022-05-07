
import React, { useState, useEffect, useRef } from 'react'
import { io } from 'socket.io-client'
import { useLocation, useNavigate } from 'react-router-dom'
import "../../styles/App.css"
import facade from '../../apiFacade'
import gameController from '../../gameController'

const JoinPage = () => {
    // const players = []
    const navigate = useNavigate();
    const location = useLocation()
    const msgBoxRef = useRef()
    const [data, setData] = useState({})
    const [role, setRole] = useState("")
    const [socket, setSocket] = useState()
    const [users, setUsers] = useState([])
    const [players, setPlayers] = useState([]);
    // const [players, setPlayers] = useState([])

    useEffect(() => {
        const socket = io("https://react-chat-werewolf-server.herokuapp.com")
        setSocket(socket)

        socket.on("connect", () => {
            console.log("socket Connected")
            socket.emit("joinRoom", location.state.room)
            socket.emit("joinWRoom", 'werewolf')
            setRole(location.state.role)
        })

    }, [])

    useEffect(() => {
        //TODO: change to gameid
        facade.getPlayers(2).then(data => setPlayers(data));
    }, [players]);


    const startGame = () => {
        const players = [{ userName: "user", userPass: "test123" },
        { userName: "admin", userPass: "test123" },
        { userName: "user_admin", userPass: "test123" }]
        facade.createPlayers(players, 1)
    }

    function start() {
        gameController.startGame(2);
        navigate(`/game/${data.room}/village`, { state: data });
    }

    return (
        <>
            {/* TODO: make background image work */}
            <div className="main">
                <div className="home">
                    {/* <!-- Column 1 (empty) --> */}
                    <div></div>
                    {/* <!-- Column 2 (start section) --> */}
                    <div className="section">
                        <div className="header">
                            <p>Welcome to</p>
                            <h1>Werewolf</h1>
                            {/* <h3>{data.name}</h3> */}

                            <div style={{ backgroundColor: "red" }}>
                                {players.map((player) => {
                                    return <div key={player.id}>
                                        <h3 style={{ color: 'white' }}>{player.username}</h3>
                                    </div>
                                })}
                            </div>
                            <button className='btn-purple' onClick={start}>Start game</button>



                            {/* {users.map((index, user) => {
                                return <div key={index}>
                                    <h3 style={{ color: 'white' }}>{user.username}</h3>
                                </div>
                            })} */}
                        </div>
                        {/* <div className="content">
                            <button className="btn-purple" onClick={event => window.location.href = "/home"}>Login</button>
                            <button className="btn-purple">About</button>
                            <button className="btn-purple">Credits</button>
                        </div> */}
                    </div>
                    {/* <!-- Column 3 (empty) --> */}
                    <div></div>
                </div>
            </div>
        </>
    )
}

export default JoinPage;