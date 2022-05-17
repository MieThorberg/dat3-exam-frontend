import React from 'react'
import "../../styles/App.css"
import { useEffect, useState } from 'react'
import gameController from '../../gameController'
import { useNavigate, useLocation } from 'react-router-dom'
import facade from '../../apiFacade'

const EndedGamePage = ({ mode, winners }) => {

    const location = useLocation()

    const [day, setDay] = useState("");
    const [data, setData] = useState({});
    const [players, setPlayers] = useState([]);
    const [winner, setWinner] = useState("");

    useEffect(() => {
        setData(location.state)
    }, [location])

    useEffect(() => {
        if (facade.getToken() == undefined) {
            navigate("/login")
        }
    }, [])

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
        if(winner == "Werewolves!"){
           return "werewolf"
        } else {
           return "villager"
        }
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
                            <h1>Winners</h1>
                            <div className='wololo'>
                                <h2>{winner}</h2>
                            </div>
                        </div>
                        <div className='content' style={{ justifyContent: "start", gridTemplateRows: "60% auto" }}>
                            <div className='joined-players-section'>
                                <div className='joined-players-scroll'>

                                    <div className='list-grid' id="playerlist">

                                        {
                                            

                                            (players.map((player) => {
                                                if(player.characterName == getWinnerRole())
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
                                {/* <!-- Column 3 (empty) --> */}
                                <div></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>


        </>
    )
}

export default EndedGamePage;