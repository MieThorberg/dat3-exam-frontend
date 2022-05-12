
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

    // MUST HAVE:sends location to the next page
    const location = useLocation()
    const [data, setData] = useState({})
    useEffect(() => {
        setData(location.state)
        setActiveBtn();
        if (data.gameid != undefined) {
            if (players.length == 0) {
                facade.getAlivePlayers(data.gameid).then(data => setPlayers(data)) 
            }
            if (facade.getPlayerToken() != null) {
                setPlayerToken(facade.getPlayerToken());
            }
        }
        if (facade.getToken() == undefined) {
            navigate("/login");
        }
    }, [data, location, players])


    function vote() {
        //TODO: change and get the gameid, userid & playerid
        //console.log(choosenplayer);
        gameController.vote(data.gameid, facade.getPlayerToken().id, choosenPlayer);

        //TODO: wait on all players to vote before checking the result and hasended game
        /* gameController.getVotingResult(2).then(data => setVoteresult(data)); */
        // setVoteresult(player);

        navigate(`/game/${data.room}/voteresult`, { state: data })


        //TODO: fix this - make it check if has ended is true then navigate to result page
        /* gameController.hasEnded(2).then(data => setHasEnded(data));
        console.log(hasEnded)
        if(true) {
            navigate(`/game/ending`);
        } else {
            navigate(`/game/voteresult`);
        } */

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

 /*    function onClickCharacter() {
        const id = facade.getPlayerToken().id;
        console.log(id);
        facade.getPlayerById(id).then(data => console.log(data.characterName));
    } */

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

                        {players.map((player, index) => {
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
                        })}
                    </div>
                </div>
                {/* <!-- Column 3 (empty) --> */}
                <div></div>
            </div>
            <div className='fixed-btn' /* style={{ display: "none" }} */>
                {/* TODO: only user host shall see this button */}
                {
                    playerToken.isAlive && <button className='btn-purple' onClick={vote}>Vote</button>
                }


            </div>
            {/* <div className='fixed-character-btn'>
                <button onClick={onClickCharacter}>?</button>
            </div> */}
        </div>
    )
}

export default VotePage;