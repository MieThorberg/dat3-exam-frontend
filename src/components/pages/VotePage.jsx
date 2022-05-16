
import Reactm, { useState, useEffect, useRef } from 'react'
import { io } from 'socket.io-client'
import { useLocation } from 'react-router-dom'
import "../../styles/App.css"
import facade from '../../apiFacade'
import gameController from '../../gameController'
import { useNavigate } from 'react-router-dom'


const VotePage = ({ mode }) => {
    const navigate = useNavigate();
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
        clear(getDeadTime());
    }, []);

    const onClickReset = () => {
        setTimerColor("white")
        clear(getDeadTime());
    }


    useEffect(() => {
        const socket = io("https://react-chat-werewolf-server.herokuapp.com")
        setSocket(socket)

        socket.on("connect", () => {
            console.log("vote socket Connected")
            socket.emit("joinRoom", location.state.room)
        })

    }, [])

    useEffect(() => {
        //recieves the latest message from the server and sets our useStates
        if (socket) {
            socket.on("getLatestMessage", (newMessage) => {
                if (newMessage.msg == "next") {
                    navigate(`/game/${data.room}/voteresult`, { state: data })
                }
            })

        }
    }, [socket])

    const showVoteResultpage = () => {
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
                showVoteResultpage()
            }
        }
    }, [timerHasStopped, setTimerHasStopped])

    function vote() {
        gameController.vote(data.gameid, facade.getPlayerToken().id, choosenPlayer);
    }

    /* making the active btn */
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

    function onClickCharacter() {
        const id = facade.getPlayerToken().id;
        console.log(id);
        facade.getPlayerById(id).then(data => console.log(data.characterName));
    }

    return (
        <div>

            <div className='background-container'>
                <div id='background-img' style={{ backgroundImage: `url(${mode.image})` }}></div>
                <div id='background-img-blur' style={{ backgroundColor: `${mode.blur}` }}></div>
            </div>
            <div className="fixed-header">
                {
                    playerToken.isAlive ? (
                        <>
                            <h1>Vote</h1>
                            <h1>Timer: {timer}</h1>
                            <p>Select the player you want to vote for</p>
                        </>
                    ) : (
                        <>
                            <h1>You Are Dead</h1>
                        </>)
                }

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
                                                    {((playerToken.characterName == "werewolf") && (player.characterName == "werewolf")) ? <h3>({player.characterName})</h3> : <></>}

                                                </div>
                                            </div>
                                        }
                                        return <div key={player.id}>
                                            <div className='vote'>
                                                <img id={player.id} className="profile-img" /> {/* REMEMBER! set active on one player, or else the active vote will not show  */}
                                                <h3 style={{ color: 'white' }}>{player.username}</h3>
                                                {((playerToken.characterName == "werewolf") && (player.characterName == "werewolf")) ? <h3>({player.characterName})</h3> : <></>}
                                            </div>
                                        </div>
                                    }))

                        }
                    </div>
                </div>
                {/* <!-- Column 3 (empty) --> */}
                <div></div>
            </div>
            <div className='fixed-btn' /* style={{ display: "none" }} */>

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
            <div className='fixed-character-btn'>
                <button onClick={onClickCharacter}>?</button>
            </div>

        </div>
    )
}

export default VotePage;