import React from 'react'
import "../../styles/App.css"
import { useEffect, useState } from 'react'
import gameController from '../../gameController'
import { useLocation } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import facade from '../../apiFacade'
import { io } from 'socket.io-client'

const VoteResultPage = ({ mode, changeMode }) => {
    const [result, setResult] = useState({});
    const [victim, setVictim] = useState({});
    const [day, setDay] = useState("");
    const navigate = useNavigate();
    const [currentRound, setCurrentRound] = useState({});
    const [host, setHost] = useState(false)


    const location = useLocation()
    const [data, setData] = useState({})

    const [allMessages, setMessages] = useState([])
    const [msg, setMsg] = useState("")
    const [loading, setLoading] = useState(false)
    const [socket, setSocket] = useState()

    useEffect(() => {
        setData(location.state)
        if (facade.getPlayerToken() != null) {
            setHost(facade.getPlayerToken().isHost);
        }
        if (data.gameid != undefined) {
            gameController.getRoundResult(data.gameid).then(data => setResult(data));
        }
        if (facade.getToken() == undefined) {
            navigate("/login");
        }
    }, [location, data, host])


    useEffect(() => {
        if (data.gameid != undefined) {
            gameController.getVictimLatest(data.gameid).then(data => {
                setVictim(data);
                if (facade.getPlayerToken().username == data.username) {
                    facade.setPlayerToken(data);
                }
                
            });
            facade.getCurrentRound(data.gameid).then(data => {
                setCurrentRound(data)
            })
        }
    }, [result, data, currentRound])

    useEffect(() => {
        const socket = io("https://react-chat-werewolf-server.herokuapp.com")
        setSocket(socket)

        socket.on("connect", () => {
            console.log("socket Connected")
            socket.emit("joinRoom", location.state.room)
            socket.emit("joinWRoom", 'werewolf')
            // setRole(location.state.role)
        })

    }, [])

    useEffect(() => {
        //recieves the latest message from the server and sets our useStates
        if (socket) {
            socket.on("getLatestMessage", (newMessage) => {
                // console.log(newMessage);
                setMessages([...allMessages, newMessage])
                // msgBoxRef.current.scrollIntoView({behavior: "smooth"})
                setMsg("")
                setLoading(false)
                nextRound()
            })

        }
    }, [socket, allMessages])

    const newRound = () => {
        console.log("hello");
        gameController.createRound(data.gameid);
        setLoading(true)
        const newMessage = { time: new Date(), msg: "next", name: data.name }
        socket.emit("newMessage", { newMessage, room: data.room })

    }


    function nextRound() {
        // TODO: if day and hasEnded is true, navigate to hasEnded page..
        changeMode(mode);
        navigate(`/game/${data.room}/village`, { state: data })
    }


    // TODO: make night result,... and day result
    return (
        <>
            <div className='background-container'>
                <div id='background-img' style={{ backgroundImage: `url(${mode.image})` }}></div>
                <div id='background-img-blur' style={{ backgroundColor: `${mode.blur}` }}></div>
            </div>
            <div className='main'>
                <div className='main-container'>
                    <div style={{ gridTemplateRows: "60% auto" }}>
                    </div>
                    <div className='section' style={{ gridTemplateRows: "40% auto" }}>

                        <div className='header' style={{ justifyContent: "end", paddingBottom: "20px" }}>
                            {currentRound.isDay ?
                                <h1>Today..</h1>
                                :
                                <h1>Last night..</h1>
                            }
                        </div>
                        <div className='content' style={{ justifyContent: "start", gridTemplateRows: "60% auto" }}>
                            <img className='big-profile-img'></img>
                            <h1 className='voteresult-player'>{victim.username}</h1>
                            {currentRound.isDay ?
                                <p className='voteresult-description'>was hanged by Village</p>
                                :
                                <p className='voteresult-description'>was killed by werewolves</p>}

                        </div>
                    </div>
                </div>
            </div>
            <div className='fixed-btn' /* style={{ display: "none" }} */>
                {/* TODO: only user host shall see this button */}
                {
                        host && <button className='btn-purple' onClick={newRound}>Continue</button>
                    }
            </div>

        </>
    )
}

export default VoteResultPage;

