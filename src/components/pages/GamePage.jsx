import React from 'react'
import "../../styles/App.css"
import { useRef, useState } from 'react'
import { useEffect } from 'react'
import gameController from '../../gameController'
import { useNavigate, useLocation } from 'react-router-dom'
import facade from '../../apiFacade'
import { io } from 'socket.io-client'
import "../../styles/GamePage.css";

import GameSideBar from '../GameSideBar'
import Village from './Village'

function NewRound({ host, votePage }) {

    const Ref = useRef(null);
    const [timer, setTimer] = useState('00:5');
    const [timerColor, setTimerColor] = useState('white');
    const [timerHasStopped, setTimerHasStopped] = useState(false);
    const [isPaused, setIsPaused] = useState(false);


    const getTimeRemaining = (e) => {
        const total = Date.parse(e) - Date.parse(new Date());
        const seconds = Math.floor((total / 1000) % 60);
        const minutes = Math.floor((total / 1000 / 60) % 60);
        return {
            total, minutes, seconds
        };
    }

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


    useEffect(() => {
        console.log(timerHasStopped);
        clear(getDeadTime());
    }, []);

    const onClickReset = () => {
        setTimerColor("white")
        clear(getDeadTime());
    }
    return (
        <>
            {/* Round/village page */}
            <div className='header'>
                <div className='left'></div>
                <div className='center'></div>
                <div className='right'><h1>DAY 12</h1></div>
            </div>

            <div className='round-section'>
                <h1 className='title'>Day</h1>
                <h1 className='timer'>{timer}</h1>
                <p className='description'>Discuss who you think are a werewolf!</p>
            </div>
            <div className='footer'>
                <div></div>
                <div>
                    {
                        host && <button className='btn-purple' onClick={votePage}>Stop now</button>
                    }
                </div>
                <div></div>
            </div>
        </>
    );
}

function Vote() {

    const [choosenPlayer, setChoosenPlayer] = useState("");
    const [players, setPlayers] = useState([]);
    const [playerToken, setPlayerToken] = useState({});
    const [currentRound, setCurrentRound] = useState({});
    const [host, setHost] = useState(false)


    // MUST HAVE:sends location to the next page
    const location = useLocation()
    const [data, setData] = useState({})
    const Ref = useRef(null);
    const [timer, setTimer] = useState('00:05');
    const [timerColor, setTimerColor] = useState('white');
    const [timerHasStopped, setTimerHasStopped] = useState(false);

    const [allMessages, setMessages] = useState([])
    const [msg, setMsg] = useState("")
    const [loading, setLoading] = useState(false)
    const [socket, setSocket] = useState(io)

    const getTimeRemaining = (e) => {
        const total = Date.parse(e) - Date.parse(new Date());
        const seconds = Math.floor((total / 1000) % 60);
        const minutes = Math.floor((total / 1000 / 60) % 60);
        return {
            total, minutes, seconds
        };
    }

    const start = (e) => {
        let { total, minutes, seconds } = getTimeRemaining(e);
        if (total >= 0) {
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

    const clear = (e) => {

        //change time here
        setTimer('00:05');
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
        /* deadline.setSeconds(deadline.getSeconds() + 10); */
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



    const showVoteResultpage = () => {
        /*  console.log("hello");
         console.log(socket); */
        const newMessage = { time: new Date(), msg: "next", name: data.name }
        socket.emit("newMessage", { newMessage, room: location.state.room })
    }


    useEffect(() => {
        setData(location.state)
        setActiveBtn();
        if (data.gameid != undefined) {
            if (players.length == 0) {
                facade.getAlivePlayers(data.gameid).then(data => setPlayers(data))
            }
            if (facade.getPlayerToken() != null) {
                facade.getPlayer(facade.getPlayerToken().id)
                setPlayerToken(facade.getPlayerToken());
            }

            facade.getCurrentRound(data.gameid).then(data => {
                setCurrentRound(data)
            })
        }
        if (facade.getToken() == undefined) {
            navigate("/login");
        }
        if (facade.getPlayerToken() != null) {
            setHost(facade.getPlayerToken().isHost);
        }


    }, [data, location, players, currentRound, host])

    useEffect(() => {
        if (timerHasStopped) {
            if (playerToken.isHost) {
                console.log(playerToken.isHost);
                showVoteResultpage()
            }
        }
    }, [timerHasStopped, setTimerHasStopped])
    function vote() {
        gameController.vote(data.gameid, facade.getPlayerToken().id, choosenPlayer);
    }

    function setActiveBtn() {
        var headerdiv = document.getElementById("playerlist");
        /* all html elements which have a classname named "vote" */
        var btns = headerdiv.getElementsByClassName("vote");

        for (var i = 0; i < btns.length; i++) {
            /* every vote has an img called profile-img which we are making an listner to */
            btns[i].getElementsByClassName("profile-img")[0].addEventListener("click", function (e) {
                var current = document.getElementsByClassName("active");
                /* are adding to the current img style, so we still can see its active */
                current[0].className = current[0].className.replace(" active", "");
                this.className += " active";
                /* the selected player's index (div id) are saved with usestate */
                setChoosenPlayer(e.target.id);
                /* console.log(choosenPlayer) */
            });
        }
    }
    return (
        <>
            {/* Vote result */}
            <div className='vote-section'>
                <div className='header'>
                    <div className='left'></div>
                    <div className='center'></div>
                    <div className='right'><h1>DAY 12</h1></div>
                </div>
                <div className="banner">
                    <h1>Vote</h1>
                </div>
                <div className='joined-players-section'>
                    <div className='joined-players-scroll'>
                        <div className='list-grid' id="playerlist">
                            {
                                (playerToken.characterName == "werewolf" && (!currentRound.isDay)) ?
                                    (players.map((player, index) => {
                                        if (player.characterName != "werewolf") {
                                            if (index == 0) {
                                                {
                                                    if (choosenPlayer == "") {
                                                        setChoosenPlayer(player.id);
                                                    }
                                                }
                                                return <div key={player.id}>
                                                    <div className='vote'>
                                                        <img id={player.id} className="profile-img active" /> {/* REMEMBER! set active on one player, or else the active vote will not show  */}
                                                        <h3 style={{ color: 'white' }}>{player.username}</h3>
                                                    </div>
                                                </div>
                                            }

                                            return <div key={player.id}>
                                                <div className='vote'>
                                                    <img id={player.id} className="profile-img" /> {/* REMEMBER! set active on one player, or else the active vote will not show  */}
                                                    <h3 style={{ color: 'white' }}>{player.username}</h3>
                                                </div>
                                            </div>
                                        }
                                    })
                                    ) : (
                                        players.map((player, index) => {
                                            if (index == 0) {
                                                {
                                                    if (choosenPlayer == "") {
                                                        setChoosenPlayer(player.id);
                                                    }
                                                }
                                                return <div key={player.id}>
                                                    <div className='vote'>
                                                        <img id={player.id} className="profile-img active" /> {/* REMEMBER! set active on one player, or else the active vote will not show  */}
                                                        <h3 style={{ color: 'white' }}>{player.username}</h3>
                                                    </div>
                                                </div>
                                            }
                                            return <div key={player.id}>
                                                <div className='vote'>
                                                    <img id={player.id} className="profile-img" /> {/* REMEMBER! set active on one player, or else the active vote will not show  */}
                                                    <h3 style={{ color: 'white' }}>{player.username}</h3>
                                                </div>
                                            </div>
                                        }))

                            }
                        </div>
                    </div>
                </div>
                <div className='footer'>
                    <div></div>
                    <div>
                        {
                            host && <button className='btn-purple' onClick={showVoteResultpage}>Stop now</button>
                        }
                        {
                            // if it is day or night
                            currentRound.isDay ?
                                (
                                    // if player is alive
                                    playerToken.isAlive && <button className='btn-purple' onClick={vote}>Vote</button>
                                ) : (
                                    // checks if player is alive and is a werewolf
                                    playerToken.isAlive && (playerToken.characterName == "werewolf") && <button className='btn-purple' onClick={vote}>Vote</button>
                                )


                        }
                    </div>
                    <div><button>My character</button></div>
                </div>

            </div>
        </>
    );
}

function VoteResult() {
    const [result, setResult] = useState({});
    const [victim, setVictim] = useState({});
    const [day, setDay] = useState("");
    const navigate = useNavigate();
    const [currentRound, setCurrentRound] = useState({});
    const [host, setHost] = useState(false)

    const location = useLocation()
    const [data, setData] = useState({})

    const [socket, setSocket] = useState(io)
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
    const newRound = () => {

        gameController.createRound(data.gameid);
        const newMessage = { time: new Date(), msg: "result", name: data.name }
        socket.emit("newMessage", { newMessage, room: location.state.room })
    }
    return (
        <>
            <div className='header'>
                <div className='left'></div>
                <div className='center'></div>
                <div className='right'><h1>DAY 12</h1></div>
            </div>

            <div className='round-section'>
                {currentRound.isDay ?
                    <h1>Today..</h1>
                    :
                    <h1>Last night..</h1>
                }
                <img className='big-profile-img'></img>
                <p className='description'>Discuss who you think are a werewolf!</p>
                <h1 className='voteresult-player'>{victim.username}</h1>
                {currentRound.isDay ?
                    <p className='voteresult-description'>was hanged by Village</p>
                    :
                    <p className='voteresult-description'>was killed by werewolves</p>}
            </div>
            <div className='footer'>
                <div></div>
                <div>
                    {
                        host && <button className='btn-purple' onClick={newRound}>Continue</button>
                    }
                </div>
                <div><button>My character</button></div>
            </div>
        </>
    );
}

const GamePage = ({ mode, changeMode }) => {
    const navigate = useNavigate();
    const location = useLocation()

    const [data, setData] = useState({})
    const [current, setCurrent] = useState({});
    const [host, setHost] = useState(false)
    const [socket, setSocket] = useState(io);
    const [message, setMessage] = useState("new round");

    useEffect(() => {
        const socket = io("https://react-chat-werewolf-server.herokuapp.com")
        setSocket(socket)
        socket.on("connect", () => {
            console.log("village socket Connected")
            socket.emit("joinRoom", location.state.room)
        })
        /* changeMode(); */

    }, [])

    useEffect(() => {
        //recieves the latest message from the server and sets our useStates
        if (socket) {
            socket.on("getLatestMessage", (newMessage) => {
                if (newMessage.msg == "vote") {
                    setMessage("vote");
                }
                if (newMessage.msg == "vote result") {
                    setMessage("vote result");
                }
                if (newMessage.msg == "new round") {
                    setMessage("new round");
                }
            })
        }
    }, [socket])

    const votePage = () => {
        stop();
        const newMessage = { time: new Date(), msg: "vote", name: data.name }
        socket.emit("newMessage", { newMessage, room: location.state.room })
    }

    useEffect(() => {
        setData(location.state)
        if (facade.getPlayerToken() != null) {
            setHost(facade.getPlayerToken().isHost);
        }
    }, [location, host])

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

    return (
        <>
            <div className='background-container'>
                <div id='background-img' style={{ backgroundImage: `url(${mode.image})` }}></div>
                <div id='background-img-blur' style={{ backgroundColor: `${mode.blur}` }}></div>
            </div>


            <div className='game'>
                <div className='sidebar'>
                    <GameSideBar />
                </div>

                <div className='game-main'>

                    <div className='content'>

                        {message == "new round" &&
                            <NewRound host={host} votePage={votePage} />
                        }

                        {message == "vote" &&
                            <Vote />
                        }

                        {message == "vote result" &&
                            <VoteResult />
                        }
                    </div>
                </div>
            </div>
        </>
    )
}

export default GamePage;