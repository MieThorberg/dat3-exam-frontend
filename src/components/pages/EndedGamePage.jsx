import React from 'react'
import "../../styles/App.css"
import { useEffect, useState } from 'react'
import gameController from '../../gameController'
import { useNavigate, useLocation } from 'react-router-dom'
import facade from '../../apiFacade'

function EndedGamePage({ host }) {
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

export default EndedGamePage;