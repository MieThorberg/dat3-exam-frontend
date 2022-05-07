import React from 'react'
import "../../styles/App.css"
import { useEffect, useState } from 'react'
import gameController from '../../gameController'

<<<<<<< HEAD
const VoteResultPage = ({voteresult}) => {
    const [result, setResult] = useState("");

    // useEffect(() => {        
    //     if (voteresult != {} ) {
            
    //     }
    // }, [voteresult])
    
    console.log("test");
    console.log(voteresult.id)

    if(voteresult.id != null) {
        console.log("bob");
    gameController.killPlayer(2, voteresult.id).then(data => {setResult(data)});

    }
=======
const VoteResultPage = ({ voteresult }) => {
    const [result, setResult] = useState("");

    useEffect(() => {

        if (voteresult != {}) {


        }

    }, [voteresult])
    gameController.killPlayer(2, voteresult).then(data => setResult(data));

    console.log("result " + result);
    console.log(voteresult);
    console.log(voteresult.id);
    /* console.log(result);
 */
>>>>>>> 7f80655d66f2c3df89fef17d8b0f0e8067d94e1b



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
                            <h1>Killed {result.username} character {result.characterName}.</h1>
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