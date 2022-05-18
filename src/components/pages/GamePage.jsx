import React from 'react'
import "../../styles/App.css"
import { useRef, useState } from 'react'
import { useEffect } from 'react'
import gameController from '../../gameController'
import { useNavigate, useLocation } from 'react-router-dom'
import facade from '../../apiFacade'
import { io } from 'socket.io-client'
import "../../styles/GamePage.css";
import image from "../../images/villager.png"
import image1 from "../../images/sundown.jpg"

import GameSideBar from '../GameSideBar'
import Village from './Village'

function NewRound({ host, current, votePage, displayCharacter }) {

    const Ref = useRef(null);
    const [timer, setTimer] = useState('00:50');
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
        setTimer("00:50");
        if (Ref.current) clearInterval(Ref.current);

        const id = setInterval(() => {
            start(e);
        }, 1000)
        Ref.current = id;
    }

    const getDeadTime = () => {
        let deadline = new Date();
        //change time here
        deadline.setSeconds(deadline.getSeconds() + 50)
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
                <div className='right'><h1 className='day-count'>DAY {current.day}</h1></div>
            </div>

            <div className='round-section'>
                <h1 className='title'>{current.isDay ? "Day" : "Night"}</h1>
                <h1 className='timer' style={{ color: timerColor }}>{timer}</h1>
                <p className='description'>Discuss who you think are a werewolf!</p>
            </div>
            <div className='footer'>
                <div className='left'><button className='character-btn' onClick={displayCharacter}><i className="fa fa-user-circle"></i></button></div>
                <div className='center'>
                    {
                        host && <button className='btn-green' onClick={votePage}>Stop now</button>
                    }
                </div>
                <div className='right'></div>
            </div>
        </>
    );
}

function Vote({ host, current, voteResultPage, displayCharacter, playerToken }) {

    const [choosenPlayer, setChoosenPlayer] = useState("");
    const [players, setPlayers] = useState([]);
    // const [playerToken, setPlayerToken] = useState({});
    /* const [currentRound, setCurrentRound] = useState({}); */


    // MUST HAVE:sends location to the next page
    const location = useLocation()
    const [data, setData] = useState({})
    const Ref = useRef(null);
    const [timer, setTimer] = useState('01:00');
    const [timerHasStopped, setTimerHasStopped] = useState(false);
    const [hasVoted, setHasVoted] = useState(false);
    /*  const [allMessages, setMessages] = useState([])
     const [msg, setMsg] = useState("")
     const [loading, setLoading] = useState(false)
     const [socket, setSocket] = useState(io) */

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

            if (minutes == 0 && seconds == 0) {
                setTimerHasStopped(true);
            }
        }
    }

    const clear = (e) => {
        //change time here
        setTimer('01:00');
        if (Ref.current) clearInterval(Ref.current);

        const id = setInterval(() => {
            start(e);
        }, 1000)
        Ref.current = id;
    }

    const getDeadTime = () => {
        let deadline = new Date();

        //change time here
        deadline.setMinutes(deadline.getMinutes() + 1)
        return deadline;
    }

    useEffect(() => {
        console.log(timerHasStopped);
        clear(getDeadTime());
    }, []);

    const onClickReset = () => {
        clear(getDeadTime());
    }


    useEffect(() => {
        setData(location.state)
        if (!hasVoted) {
            setActiveBtn();
        }

        if (data.gameid != undefined) {
            if (players.length == 0) {
                facade.getAlivePlayers(data.gameid).then(data => setPlayers(data))
            }
            // if (facade.getPlayerToken() != null) {
            //     facade.getPlayer(facade.getPlayerToken().id)
            //     setPlayerToken(facade.getPlayerToken());
            // }

            /* facade.getCurrentRound(data.gameid).then(data => {
                setCurrentRound(data)
            }) */
        }
        if (facade.getToken() == undefined) {
            navigate("/login");
        }
        /* if (facade.getPlayerToken() != null) {
            setHost(facade.getPlayerToken().isHost);
        } */


    }, [data, location, players/* , currentRound, */ /* host */])

    useEffect(() => {
        if (timerHasStopped) {
            if (host) {
                voteResultPage()
            }
        }
    }, [timerHasStopped, setTimerHasStopped])

    function vote() {
        gameController.vote(data.gameid, playerToken.id, choosenPlayer);
        // TODO: show that player has voted¨
        setHasVoted(true);
        console.log("has voted!")
    }

    function setActiveBtn() {
        var headerdiv = document.getElementById("playerlist");
        // all html elements which have a classname named "vote"
        var btns = headerdiv.getElementsByClassName("vote");

        for (var i = 0; i < btns.length; i++) {
            // every vote has an img called profile-img which we are making an listner to
            btns[i].getElementsByClassName("profile-img")[0].addEventListener("click", function (e) {
                var current = document.getElementsByClassName("active");
                // are adding to the current img style, so we still can see its active
                current[0].className = current[0].className.replace(" active", "");
                this.className += " active";
                // the selected player's index (div id) are saved with usestate
                setChoosenPlayer(e.target.id);
                // console.log(choosenPlayer)
            });
        }
    }

    return (
        <>


            {
                hasVoted ?
                    <>
                        <div className='header'>
                            <div className='left'></div>
                            <div className='center'></div>
                            <div className='right'><h1>DAY {current.day}</h1></div>
                        </div>
                        <div className='round-section'>
                            {/* <h1 className='title'>{current.isDay ? "Day" : "Night"}</h1>
                                 */}<h1 className='title' style={{ textAlign: "center" }}>Your voted has been recieved</h1>
                            <p className='description' style={{ paddingTop: "10px" }}>Please wait for the vote result</p>
                        </div>
                        <div className='footer'>
                            <div className='left'><button className='character-btn' onClick={displayCharacter}><i className="fa fa-user-circle"></i></button></div>
                            <div className='center'></div>
                            <div className='right'></div>
                        </div>
                    </>
                    :
                    <>
                        {/* Vote */}
                        <div className='vote-section'>
                            <div className='header'>
                                <div className='left'></div>
                                <div className='center'></div>
                                <div className='right'><h1>DAY {current.day}</h1></div>
                            </div>
                            <div className="banner">
                                <h1>Vote</h1>
                                <p>Choose the player you want to vote for</p>
                            </div>
                            <div className='joined-players-section'>
                                <div className='joined-players-scroll'>
                                    <div className='list-grid' id="playerlist">
                                        {
                                            (playerToken.characterName == "werewolf" && (!current.isDay)) ?
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
                                <div className='left'><button className='character-btn' onClick={displayCharacter}><i className="fa fa-user-circle"></i></button></div>
                                <div className='center'>
                                    {
                                        host && <button className='btn-green' onClick={voteResultPage}>Stop now</button>
                                    }
                                    {
                                        // if it is day or night
                                        current.isDay ?
                                            (
                                                // if player is alive
                                                playerToken.isAlive && <button className='btn-green' onClick={vote}>Vote</button>
                                            ) : (
                                                // checks if player is alive and is a werewolf
                                                playerToken.isAlive && (playerToken.characterName == "werewolf") && <button className='btn-green' onClick={vote}>Vote</button>
                                            )
                                    }
                                </div>
                                <div className='right'></div>
                            </div>
                        </div>
                    </>
            }


        </>
    );
}

function VoteResult({ host, current, newRoundPage, displayCharacter, playerToken }) {
    const [result, setResult] = useState({});
    const [victim, setVictim] = useState({});
    /* const [day, setDay] = useState(""); */
    const navigate = useNavigate();
    /* const [currentRound, setCurrentRound] = useState({});
    const [host, setHost] = useState(false) */

    const location = useLocation()
    const [data, setData] = useState({})

    const [socket, setSocket] = useState(io)
    useEffect(() => {
        setData(location.state)
        /* if (facade.getPlayerToken() != null) {
            setHost(facade.getPlayerToken().isHost);
        } */
        if (data.gameid != undefined) {
            gameController.getRoundResult(data.gameid).then(data => setResult(data));
        }
        if (facade.getToken() == undefined) {
            navigate("/login");
        }
    }, [data, location/* , host */])
    useEffect(() => {
        if (data.gameid != undefined) {
            gameController.getVictimLatest(data.gameid).then(data => {
                setVictim(data);
                if (playerToken.username == data.username) {

                    facade.setPlayerToken(data);
                }
            });
            /* facade.getCurrentRound(data.gameid).then(data => {
                setCurrentRound(data)
            }) */
        }
    }, [result, data/* , currentRound */])

    return (
        <>
            <div className='header'>
                <div className='left'></div>
                <div className='center'></div>
                <div className='right'><h1>DAY {current.day}</h1></div>
            </div>

            <div className='vote-result-section'>
                {current.isDay ?
                    <h1>Today..</h1>
                    :
                    <h1>Last night..</h1>
                }
                <img className='big-profile-img'></img>
                <h2 className='voteresult-player'>{victim.username} ({victim.characterName})</h2>
                {current.isDay ?
                    <p className='voteresult-description'>was hanged by Village</p>
                    :
                    <p className='voteresult-description'>was killed by werewolves</p>}
            </div>
            <div className='footer'>
                <div className='left'><button className='character-btn' onClick={displayCharacter}><i className="fa fa-user-circle"></i></button></div>
                <div className='center'>
                    {
                        host && <button className='btn-green' onClick={newRoundPage}>Continue</button>
                    }
                </div>
                <div className='right'></div>
            </div>
        </>
    );
}

function EndedGame({ host }) {
    const location = useLocation()
    const [data, setData] = useState({});
    const [players, setPlayers] = useState([]);
    const [winner, setWinner] = useState("");

    useEffect(() => {
        setData(location.state)
    }, [location])

    useEffect(() => {
        if (data.gameid != undefined) {
            facade.getWereWolves(data.gameid).then(data => {
                if (data.length == 0) {
                    setWinner("Villagers!")
                } else {
                    setWinner("Werewolves!")
                }
            })
            facade.getPlayers(data.gameid).then(data => setPlayers(data));
        }
    }, [data])

    function getWinnerRole() {
        if (winner == "Werewolves!") {
            return "werewolf"
        } else {
            return "villager"
        }
    }
    return (
        <>
            {/* Ended game */}
            <div className='endgame-section'>
                <div className="banner">
                    <h2>Winning team</h2>
                    <h1>{winner}</h1>
                    <p>The village killed the werewolf at there was peace again in the village</p>
                </div>
                <div className='joined-players-section'>
                    <div className='joined-players-scroll'>
                        <div className='list-grid' id="playerlist">
                            {
                                (players.map((player) => {
                                    if (player.characterName == getWinnerRole())
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
                    <div className='left'></div>
                    <div className='center'>
                        {
                            host && <button className='btn-purple'/*  onClick={showVoteResultpage} */>Finish</button>
                        }
                    </div>
                    <div className='right'><button className='restart-btn'>restart <i className="fa">&#xf0e2;</i></button></div>
                </div>

            </div>
        </>
    );
}

const GamePage = ({ mode, changeMode }) => {
    const navigate = useNavigate();
    const location = useLocation()
    const [playerToken, setPlayerToken] = useState({});
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
                if (newMessage.msg == "ended") {
                    setMessage("ended");
                }
            })
        }
    }, [socket])

    const votePage = () => {

        const newMessage = { time: new Date(), msg: "vote", name: data.name }
        socket.emit("newMessage", { newMessage, room: location.state.room })
    }

    const voteResultpage = () => {
        const newMessage = { time: new Date(), msg: "vote result", name: data.name }
        socket.emit("newMessage", { newMessage, room: location.state.room })
    }

    const newRoundPage = () => {
        facade.hasEnded(data.gameid).then((ended) => {
            if (ended) {
                const newMessage = { time: new Date(), msg: "ended", name: data.name };
                socket.emit("newMessage", { newMessage, room: location.state.room });
            } else {
                gameController.createRound(data.gameid);
                gameController.cleanVotes(data.gameid);
                const newMessage = { time: new Date(), msg: "new round", name: data.name };
                socket.emit("newMessage", { newMessage, room: location.state.room });
            }
        });
    }

    useEffect(() => {
        setData(location.state)
        if (data.gameid != undefined) {
            if (facade.getPlayerToken() != null) {
                setHost(facade.getPlayerToken().isHost);
            }

        }
    }, [data, location, host])

    /* useEffect(() => {
        if(data.gameid != undefined) {
            if (facade.getPlayerToken() != null) {
                facade.getPlayer(facade.getPlayerToken().id)
                setPlayerToken(facade.getPlayerToken());
            }
        }
    }, []) */


    useEffect(() => {
        if (data.gameid != undefined) {
            if (Object.keys(current).length == 0) {
                console.log("wololo");
                gameController.getCurrentRound(data.gameid).then(data => {
                    setCurrent(data)
                });
            }

            if (facade.getPlayerToken() != null) {
                if (playerToken.characterName == null) {
                    console.log("bobo");
                    facade.getPlayer(facade.getPlayerToken().id)
                    setPlayerToken(facade.getPlayerToken());
                }


            }
        }


        if (facade.getToken() == undefined) {
            navigate("/login");
        }
    }, [data, current , playerToken])



    function displayCharacter() {
        var x = document.getElementById("characterPopup");
        if (x.style.display == "none") {
            x.style.display = "block";
            console.log("popup");
        } else {
            x.style.display = "none";
            console.log("close")
        }
    }

    return (
        <>
            <div className='background-container'>
                <div id='background-img' style={{ backgroundImage: `url(${mode.image})` }}></div>
                <div id='background-img-blur' style={{ backgroundColor: `${mode.blur}` }}></div>
            </div>


            <div className='game'>
                <div className='sidebar'>
                    <GameSideBar characterName={playerToken.characterName} />
                </div>

                <div className='game-main'>

                    <div className='content'>

                        {message == "new round" &&
                            <NewRound host={host} current={current} votePage={votePage} displayCharacter={displayCharacter} />
                        }

                        {message == "vote" &&
                            <Vote host={host} current={current} voteResultPage={voteResultpage} displayCharacter={displayCharacter} playerToken={playerToken} />
                        }

                        {message == "vote result" &&
                            <VoteResult host={host} current={current} newRoundPage={newRoundPage} displayCharacter={displayCharacter} playerToken={playerToken} />
                        }

                        {message == "ended" &&
                            <EndedGame host={host} />
                        }

                        <div id='characterPopup' onClick={displayCharacter}>
                            <div className='card'>
                                <div className='content'>
                                    <div className='top'><i className="fa" id="remove-icon">&#xf00d;</i></div>
                                    <div className='character-image'>
                                        <p>Your role</p>
                                        <h1>Villager</h1>
                                        <img src={image} />
                                    </div>
                                    <div className='description'>
                                        <p>charac ter descripti on charac ter descrip tion char acter descrip tion chara cter descr iption character description</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </>
    )
}

export default GamePage;