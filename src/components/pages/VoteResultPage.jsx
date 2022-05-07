import React from 'react'
import "../../styles/App.css"
import { useEffect, useState } from 'react'
import gameController from '../../gameController'

const VoteResultPage = ({voteresult}) => {
   /*  const [result, setResult] = useState(""); */

    /* useEffect(() => {
        gameController.getVotingResult(2).then(data => setResult(data));
        console.log(result)
        if (result != "") {
            gameController.killPlayer(2, result.id);
        }
    }, [setResult])
    
 */

    console.log("vote: " + voteresult.username);


    

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
                            <h1>Killed {voteresult.username} character {voteresult.characterName}.</h1>
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