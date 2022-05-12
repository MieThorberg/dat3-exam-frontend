
import Reactm, { useState, useEffect, useRef } from 'react'
import { io } from 'socket.io-client'
import { useLocation, useNavigate } from 'react-router-dom'
import "../../styles/App.css"
import facade from '../../apiFacade'
import gameController from '../../gameController'

const JoinPage = ({ mode }) => {
    // const players = []
    const navigate = useNavigate();
    const location = useLocation()
    const msgBoxRef = useRef()
    const [data, setData] = useState({})
    const [role, setRole] = useState("")
    const [host, setHost] = useState(false)
    const [socket, setSocket] = useState()
    const [users, setUsers] = useState([])
    const [players, setPlayers] = useState([]);
    // const [players, setPlayers] = useState([])

    useEffect(() => {
        setData(location.state)
    }, [location])

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
        if(data.gameid != undefined) {
            facade.getPlayers(data.gameid).then(data => setPlayers(data))
        }

        if (facade.getPlayerToken() != null){
            setHost(facade.getPlayerToken().isHost);
        }
        
    }, [data, players,host]);

    // const startGame = () => {
    //     const players = [{ userName: "user", userPass: "test123" },
    //     { userName: "admin", userPass: "test123" },
    //     { userName: "user_admin", userPass: "test123" }]
    //     facade.createPlayers(players, 1)
    // }

    function start() {
        gameController.startGame(data.gameid);
        navigate(`/game/${data.room}/village`, { state: data });
    }

    return (
        <div>

            <div className='background-container'>
                <div id='background-img' style={{ backgroundImage: `url(${mode.image})` }}></div>
                <div id='background-img-blur' style={{ backgroundColor: `${mode.blur}` }}></div>
            </div>
            <div className="fixed-header">
                <h1>Gamepin: {data.room}</h1>
                {/* <h3>{data.name}</h3> */}

                {/* {users.map((index, user) => {
                        return <div key={index}>
                            <h3 style={{ color: 'white' }}>{user.username}</h3>
                        </div>
                    })} */}
            </div>


            <div className='joined-players-section'>
                <div className='joined-players-scroll'>

                    <div className='list-grid'>

                        {players.map((player) => {
                            return <div key={player.id}>
                                <div>
                                    <img className="profile-img" />
                                    <h3 style={{ color: 'white' }}>{player.username}</h3>
                                </div>
                            </div>
                        })}

                    </div>
                </div>
                {/* <!-- Column 3 (empty) --> */}
                <div></div>
            </div>
            <div className='fixed-btn' /* style={{ display: "none" }} */>


                {/* TODO: only user host shall see this button */}
                {
                    host && <button className='btn-purple' onClick={start}>Start game</button>
                }
                


            </div>

        </div>

    )
}

export default JoinPage;