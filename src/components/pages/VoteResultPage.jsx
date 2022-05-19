import React from "react";
import "../../styles/App.css";
import { useEffect, useState } from "react";
import gameController from "../../gameController";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import facade from "../../apiFacade";
import { io } from "socket.io-client";

function VoteResultPage({ host, current, newRoundPage, displayCharacter, playerToken, setPlayerToken }) {
    const [victim, setVictim] = useState({});
    /* const [day, setDay] = useState(""); */
    const navigate = useNavigate();
    /* const [currentRound, setCurrentRound] = useState({});
    const [host, setHost] = useState(false) */

    const location = useLocation()
    const [data, setData] = useState({})
    const [show, setShow] = useState(false)

    const [socket, setSocket] = useState(io)

    useEffect(() => {
        setTimeout(() => {
            setShow(true);
        }, 1000);
    }, [])

    useEffect(() => {
        console.log("data setter");

        setData(location.state)

        if (facade.getToken() == undefined) {
            navigate("/login");
        }
    }, [location])

    useEffect(() => {
        const intervalId = setInterval(() => {
            if (data.gameid != undefined) {

                gameController.getVictimLatest(data.gameid).then(data => {
                    setVictim(data);
                    if (playerToken.username == data.username) {
                        facade.setPlayerToken(data);
                        console.log(facade.getPlayerToken());
                        setPlayerToken(facade.getPlayerToken())
                    }
                });
            }
        }, 500)
        return () => clearInterval(intervalId);
    }, [data])

    return (
        <>
            <div className="game-layout">
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
                            show && host && <button className='btn-green' onClick={newRoundPage}>Continue</button>
                        }
                    </div>
                    <div className='right'></div>
                </div>
            </div>
        </>
    );
}


export default VoteResultPage;
