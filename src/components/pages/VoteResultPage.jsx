import React from 'react'
import "../../styles/App.css"
import { useEffect, useState } from 'react'
import gameController from '../../gameController'
import { useLocation } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'

const VoteResultPage = ({ mode, voteresult }) => {
    const [result, setResult] = useState("");
    const [victim, setVictim] = useState({});
    const [day, setDay] = useState("");
    const navigate = useNavigate();

    const location = useLocation()
    const [data, setData] = useState({})
    useEffect(() => {
        setData(location.state)
    }, [location])

    useEffect(() => {
        if (voteresult.id != null) {
            gameController.killPlayer(2, voteresult.id).then(data => { setResult(data) });
            getVictim();
            gameController.addDay(2);
            getDay();
        }
    }, [voteresult])



    function hasEnded() {
        return gameController.hasEnded(2);
    }

    function getVictim() {
        const v = gameController.getVictimLatest(2).then(data => setVictim(data));
    }

    function getDay() {
        return gameController.getDay(2).then(data => setDay(data));
    }

    function nextRound() {
        gameController.createRound(1);
        navigate(`/game/${data.room}/village`, { state: data })
    }

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
                            <h1>Last night..</h1>
                        </div>
                        <div className='content' style={{ justifyContent: "start", gridTemplateRows: "60% auto" }}>
                            <img className='big-profile-img'></img>
                            <h1 className='voteresult-player'>{victim.username}</h1>
                            <p className='voteresult-description'>was killed by werewolves</p>
                        </div>
                    </div>
                </div>
            </div>
            <div className='fixed-btn' /* style={{ display: "none" }} */>
                {/* TODO: only user host shall see this button */}
                <button className='btn-purple' onClick={nextRound}>Next</button>
            </div>

        </>
    )
}

export default VoteResultPage;

{/* <div className="main">
                <div className="home">
        
                    <div></div>
                    
                    <div className="section">
                        <div className="header">
                            <p>Voting result:</p>
                            <p>Killed {victim.username} character {victim.characterName}.</p>
                            <p>Game ended? {hasEnded ? "yes" : "no"}.</p>
                            <p>Latest victim {victim.username}.</p>
                            <p>Day {day}</p>
                        </div>
                    </div>

                    <div></div>
                </div>
            </div> */}