import React from 'react'
import "../../styles/App.css"
import { useRef, useState } from 'react'
import { useEffect } from 'react'
import gameController from '../../gameController'
import { useNavigate, useLocation } from 'react-router-dom'
import facade from '../../apiFacade'
import { io } from 'socket.io-client'

const Village = ({ mode, changeMode }) => {
    const navigate = useNavigate();
    const location = useLocation()

    const Ref = useRef(null);
    const [timer, setTimer] = useState('05:00');
    const [timerColor, setTimerColor] = useState('white');

    const [data, setData] = useState({})

    const [timerHasStopped, setTimerHasStopped] = useState(false);
    const [isPaused, setIsPaused] = useState(false);

    const [current, setCurrent] = useState({});
    const [host, setHost] = useState(false)

    const [socket, setSocket] = useState(io)

    useEffect(() => {
        const socket = io("https://react-chat-werewolf-server.herokuapp.com")
        setSocket(socket)
        socket.on("connect", () => {
            console.log("village socket Connected")
            socket.emit("joinRoom", location.state.room)
        })
        changeMode();

    }, [])

    useEffect(() => {
        //recieves the latest message from the server and sets our useStates
        if (socket) {
            socket.on("getLatestMessage", (newMessage) => {
                if (newMessage.msg == "vote") {
                    navigate(`/game/${data.room}/vote`, { state: data })
                }
            })
        }
    }, [socket])

    const votePage = () => {
        stop();
        console.log("hello");
        console.log(socket);
        const newMessage = { time: new Date(), msg: "vote", name: data.name }
        socket.emit("newMessage", { newMessage, room: location.state.room })
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
            if (total >= 0) {
                setTimer(
                    (minutes > 9 ? minutes : '0' + minutes) + ":" +
                    (seconds > 9 ? seconds : '0' + seconds)
                )
                if (minutes == 0 && seconds < 31) {
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
        setTimer("05:00");
        if (Ref.current) clearInterval(Ref.current);

        const id = setInterval(() => {
            start(e);
        }, 1000)
        Ref.current = id;
    }

    const getDeadTime = () => {
        let deadline = new Date();
        //change time here
        deadline.setMinutes(deadline.getMinutes() + 5)
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

    useEffect(() => {
        if (timerHasStopped) {
            if (host) {
                console.log(host);
                votePage()
            }
        }
    }, [timerHasStopped, setTimerHasStopped])

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
                    </div>
                </div>
                <div className='fixed-btn'>
                    {/* only user host shall see this button */}
                    {
                        host && <button className='btn-purple' onClick={votePage}>Stop now</button>
                    }
                </div>
            </div>

        </>
    )
}

export default Village;