import React from 'react'
import "../../styles/App.css"
import { useEffect, useState } from 'react'
import gameController from '../../gameController'
import facade from '../../apiFacade'

const EndedGamePage = ({ mode, winners }) => {
    const [day, setDay] = useState("");

    useEffect(() => {
        if (facade.getToken() == undefined) {
          navigate("/login")
        }
      }, [])

    function getDay() {
        return gameController.getDay(2).then(data => setDay(data));
    }

    //TODO: make a function to get the winners of the game

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
                        </div>
                        <div className='content' style={{ justifyContent: "start", gridTemplateRows: "60% auto" }}>


                            <div className='list-grid'>

                                {/* {players.map((player) => {
                                    return <div key={player.id}>
                                    <div>
                                        <img className="profile-img" />
                                        <h3 style={{ color: 'white' }}>{player.username}</h3>
                                        </div>
                                    </div>
                                })} */}


                                <div>
                                    <div>
                                        <img className="profile-img" />
                                        <h3 style={{ color: 'white' }}>player</h3>
                                    </div>
                                </div>
                                <div>
                                    <div>
                                        <img className="profile-img" />
                                        <h3 style={{ color: 'white' }}>player</h3>
                                    </div>
                                </div>
                                <div>
                                    <div>
                                        <img className="profile-img" />
                                        <h3 style={{ color: 'white' }}>player</h3>
                                    </div>
                                </div>
                                <div>
                                    <div>
                                        <img className="profile-img" />
                                        <h3 style={{ color: 'white' }}>player</h3>
                                    </div>
                                </div>

                            </div>
                        </div>
                        {/* <!-- Column 3 (empty) --> */}
                        <div></div>
                    </div>
                </div>
            </div>


        </>
    )
}

export default EndedGamePage;