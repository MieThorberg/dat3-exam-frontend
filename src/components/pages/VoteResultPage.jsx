import React from 'react'
import "../../styles/App.css"
import { useEffect, useState } from 'react'
import gameController from '../../gameController'

const VoteResultPage = ({ voteresult }) => {
    const [result, setResult] = useState("");
    const [victim, setVictim] = useState({});
    const [day, setDay] = useState("");

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

    return (
        <>
            {/* TODO: make background image work */}
            <div className="main">
                <div className="home">
                    {/* <!-- Column 1 (empty) --> */}
                    <div></div>
                    {/* <!-- Column 2 (start section) --> */}
                    <div className="section">
                        <div className="header">
                            <p>Voting result:</p>
                            <p>Killed {victim.username} character {victim.characterName}.</p>
                            <p>Game ended? {hasEnded ? "yes" : "no"}.</p>
                            <p>Latest victim {victim.username}.</p>
                            <p>Day {day}</p>
                        </div>
                    </div>
                    {/* <!-- Column 3 (empty) --> */}
                    <div></div>
                </div>
            </div>
        </>
    )
}

export default VoteResultPage;