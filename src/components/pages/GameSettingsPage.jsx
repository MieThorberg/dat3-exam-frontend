import React from 'react'
import "../../styles/App.css"
import { useEffect, useState } from 'react';

const GameSettingsPage = ({ setHeadline }) => {
    //title i topnav
    useEffect(() => {
        setHeadline("Game settings");
    }, []);

    const [game, setGame] = useState("");

    function createGame() {
        facade.createGame("admin", "test123");
        facade.getGameById("16").then(data => setGame(data));
        console.log(game);
    }
    return (
        <div className='main2'>
            <div className='scroll-container'>
                <div className='full-scroll-section'>


                    <div className='box'>
                        <div className='text-section'>
                            <h2>Type amount of wolves</h2>
                            <input type="text" />
                        </div>
                    </div>

                    <div className='box'>
                        <div className='text-section'>
                            <h2>Time for each day round</h2>
                            <input type="text" />
                        </div>
                    </div>
                    <div className='box'>
                        <div className='text-section'>
                            <h2>Time for each day voting</h2>
                            <input type="text" />
                        </div>
                    </div>
                    <div className='box'>
                        <div className='text-section'>
                            <h2>Time for each night round</h2>
                            <input type="text" />
                        </div>
                    </div>
                    <button onClick={createGame}>Create game</button>
                </div>
            </div>
        </div>



    )
}

export default GameSettingsPage;