
import { useState, useEffect, useRef } from 'react'
import { useLocation } from 'react-router-dom'
import "../../styles/App.css"
import facade from '../../apiFacade'
import gameController from '../../gameController'



function HunterPage({ current, voteResultPage, displayCharacter, playerToken }) {

    const [choosenPlayer, setChoosenPlayer] = useState("");
    const [players, setPlayers] = useState([]);
    // const [playerToken, setPlayerToken] = useState({});
    /* const [currentRound, setCurrentRound] = useState({}); */


    // MUST HAVE:sends location to the next page
    const location = useLocation()
    const [data, setData] = useState({})
    const Ref = useRef(null);
    const [timer, setTimer] = useState('00:10');
    const [timerColor, setTimerColor] = useState("white");
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

            if (minutes == 0 && seconds < 11) {
                setTimerColor("red")
                if (minutes == 0 && seconds == 0) {
                    setTimerHasStopped(true);
                }
            }
        }
    }

    const clear = (e) => {
        if (!timerHasStopped) {
            //change time here
            setTimer('00:10');
            if (Ref.current) clearInterval(Ref.current);

            const id = setInterval(() => {
                start(e);
            }, 1000)
            Ref.current = id;
        }
    }

    const getDeadTime = () => {
        let deadline = new Date();

        //change time here
        deadline.setSeconds(deadline.getSeconds() + 10)
        return deadline;
    }

    useEffect(() => {
        console.log("one timer 3");
        clear(getDeadTime());
    }, []);

    const onClickReset = () => {
        clear(getDeadTime());
    }

    function stop() {
        clearInterval(Ref.current)
        setTimerHasStopped(true);
        voteResultPage();
    }



    useEffect(() => {
        console.log("alive Players");
        setData(location.state)

        if (data.gameid != undefined) {
            if (players.length == 0) {
                facade.getAlivePlayers(data.gameid).then(data => setPlayers(data))
            }

        }
        if (facade.getToken() == undefined) {
            navigate("/login");
        }

    }, [data])

    useEffect(() => {
        console.log("hasVoted");
        if (!hasVoted) {
            setActiveBtn();
        }
    })

    useEffect(() => {
        console.log("stop timer 2");
        if (timerHasStopped) {
            if (host) {
                voteResultPage()
            }
        }
    }, [timerHasStopped, setTimerHasStopped])

    function vote() {
        gameController.vote(data.gameid, playerToken.id, choosenPlayer);
        setHasVoted(true);
        stop();
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
            {/* Hunterpage */}
            <div className='vote-section'>
                <div className='header'>
                    <div className='left'><h1 style={{ color: timerColor }}>Time left: {timer}</h1></div>
                    <div className='center'></div>
                    <div className='right'><h1>DAY {current.day}</h1></div>
                </div>
                <div className="banner">
                    <h1 style={{ color: "#ff0f13", textAlign: "center", maxWidth: "550px", fontSize: "50px" }}>Hunter, a werewolf is chasing you!</h1>
                    <p>You have one arrow left. Choose a player to shoot!</p>
                </div>
                <div className='joined-players-section'>
                    <div className='joined-players-scroll'>
                        <div className='list-grid' id="playerlist">
                            {
                                players.map((player, index) => {
                                    if (index == 0) {
                                        {
                                            if (choosenPlayer == "") {
                                                setChoosenPlayer(player.id);
                                            }
                                        }
                                        return <div key={player.id}>
                                            <div className='vote'>
                                                <img id={player.id} className="profile-img active" />
                                                <h3 style={{ color: 'white' }}>{player.username}</h3>
                                            </div>
                                        </div>
                                    }

                                    return <div key={player.id}>
                                        <div className='vote'>
                                            <img id={player.id} className="profile-img" />
                                            <h3 style={{ color: 'white' }}>{player.username}</h3>
                                        </div>
                                    </div>
                                })
                            }
                        </div>
                    </div>
                </div>

                <div className='footer'>
                    <div className='left'><button className='character-btn' onClick={displayCharacter}><i className="fa fa-user-circle"></i></button></div>
                    <div className='center'>
                        <button className='kill-btn' onClick={vote}>Shoot player</button>
                    </div>
                    <div className='right'></div>
                </div>
            </div>
        </>
    );
}

export default HunterPage;