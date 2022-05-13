import React from 'react'
import "../../styles/App.css"
import { useRef, useState } from 'react'
import { useEffect } from 'react'
import gameController from '../../gameController'
import { useNavigate, useLocation } from 'react-router-dom'
import facade from '../../apiFacade'
import { io } from 'socket.io-client'

const Village = ({ mode }) => {
    const navigate = useNavigate();
    const location = useLocation()
    //Testing timer
    const seconds = 0;
    const minutes = 0;
    const Ref = useRef(null);
    const [timer, setTimer] = useState('00:05');
    const [timerColor, setTimerColor] = useState('white');

    const [data, setData] = useState({})

    const [timerHasStopped, setTimerHasStopped] = useState(false);
    const [isPaused, setIsPaused] = useState(false);

    const [current, setCurrent] = useState({});
    const [host, setHost] = useState(false)

    const [allMessages, setMessages] = useState([])
    const [msg, setMsg] = useState("")
    const [loading, setLoading] = useState(false)
    const [socket, setSocket] = useState(io)

    useEffect(() => {
        const socket = io("https://react-chat-werewolf-server.herokuapp.com")
        setSocket(socket)

        socket.on("connect", () => {
            console.log("socket Connected")
            socket.emit("joinRoom", location.state.room)
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

                navigate(`/game/${data.room}/vote`, { state: data })
            })

        }
    }, [socket, allMessages])

    const votePage = () => {
        console.log("hello");
        console.log(socket);
        setLoading(true)
        const newMessage = { time: new Date(), msg: "vote", name: data.name }
        socket.emit("newMessage", { newMessage, room: data.room })
    }



    const getTimeRemaining = (e) => {
        const total = Date.parse(e) - Date.parse(new Date());
        const seconds = Math.floor((total / 1000) % 60);
        const minutes = Math.floor((total / 1000 / 60) % 60);
        return {
            total, minutes, seconds
        };
    }

    useEffect(() => {
        setData(location.state)
        if (facade.getPlayerToken() != null) {
            setHost(facade.getPlayerToken().isHost);
        }
    }, [location, host])

    const start = (e) => {
        let { total, minutes, seconds } = getTimeRemaining(e);

        if (isPaused) {
            setTimerHasStopped(true);
            return;
        } else {
        if (total >= 0 /* && !timerHasStopped && !isPaused */) {
            setTimer(
                (minutes > 9 ? minutes : '0' + minutes) + ":" +
                (seconds > 9 ? seconds : '0' + seconds)
            )
            if (seconds < 31) {
                setTimerColor("red");

                if (seconds == 0) {
                    setTimerHasStopped(true);
                }

            }
        }
    }
}

    const clear = (e) => {
        //change time here
        setTimer("00:05");
        if (Ref.current) clearInterval(Ref.current);

        const id = setInterval(() => {
            start(e);
        }, 1000)
        Ref.current = id;
    }

    const getDeadTime = () => {
        let deadline = new Date();
        //change time here
        deadline.setSeconds(deadline.getSeconds() + 5)
        return deadline;
    }

    useEffect(() => {
        console.log(timerHasStopped);
        clear(getDeadTime());
    }, []);

    const onClickReset = () => {
        setTimerColor("white")
        clear(getDeadTime());
    }

    useEffect(() => {
        if (data.gameid) {
            gameController.getCurrentRound(data.gameid).then(data => {
                setCurrent(data)
            });
        }

        if (facade.getToken() == undefined) {
            navigate("/login");
        }
    }, [data, current])

    function stop() {
        setIsPaused(!isPaused);
    }

    // useEffect(() => {
    //     if (timerHasStopped) {
    //         if(host) {
    //             console.log("banana");
    //             console.log(host);
    //             votePage()
    //         }
    //     }
    // }, [timerHasStopped, setTimerHasStopped])

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
                    <div className='section' style={{ gridTemplateRows: "50% auto" }}>

                        <div className='header' style={{ justifyContent: "end", paddingBottom: "20px" }}>

                            <p>Day {current.day}, {current.isDay ? "Day" : "night"}</p>
                            <h1 style={{ color: timerColor }}>{timer}</h1>
                        </div>
                        <div className='content' style={{ justifyContent: "start", gridTemplateRows: "60% auto" }}>
                            <p>Discuss who you think are a werewolf!</p>
                        </div>



                        {/* Check if times stop, if it has then is navigate to votepage
                         so we can start voting */}
                        {/* TODO: if night, then only werewolf are allowed to vote */}
                        {

                        }

                    </div>
                </div>
                <div className='fixed-btn' /* style={{ display: "none" }} */>

                    {/* TODO: only user host shall see this button */}
                    {
                        host && <button className='btn-purple' onClick={stop}>Stop now</button>
                    }
                    {
                        host && <button className='btn-purple' onClick={votePage}>Start game</button>
                    }
                </div>
            </div>

        </>
    )
}

export default Village;