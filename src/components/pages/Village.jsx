import React from 'react'
import "../../styles/App.css"
import { useRef, useState } from 'react'
import { useEffect } from 'react'
import gameController from '../../gameController'
import { useNavigate } from 'react-router-dom'

const Village = ({ mode }) => {
    const navigate = useNavigate();
    //Testing timer
    const seconds = 0;
    const minutes = 0;
    const Ref = useRef(null);
    const [timer, setTimer] = useState('00:00');
    const [timerColor, setTimerColor] = useState('white');
    const [timerHasStopped, setTimerHasStopped] = useState(true);
    const [hasEnded, setHasEnded] = useState(false);


    const getTimeRemaining = (e) => {
        const total = Date.parse(e) - Date.parse(new Date());
        const seconds = Math.floor((total / 1000) % 60);
        const minutes = Math.floor((total / 1000 / 60) % 60);
        return {
            total, minutes, seconds
        };
    }

    const start = (e) => {
        let { total, minutes, seconds } = getTimeRemaining(e);
        if (total >= 0) {
            setTimer(
                (minutes > 9 ? minutes : '0' + minutes) + ":" +
                (seconds > 9 ? seconds : '0' + seconds)
            )
            if (seconds < 31) {
                setTimerColor("red");

                if (seconds == 0) {
                    setTimerHasStopped(true);
                }

            }
        }
    }

    const clear = (e) => {

        //change time here
        setTimer('00:30');
        if (Ref.current) clearInterval(Ref.current);
        setTimerHasStopped(false);
        const id = setInterval(() => {
            start(e);
        }, 1000)
        Ref.current = id;
    }

    const getDeadTime = () => {
        let deadline = new Date();

        //change time here
        deadline.setSeconds(deadline.getSeconds() + 30)
        /* deadline.setSeconds(deadline.getSeconds() + 10); */
        return deadline;
    }

    useEffect(() => {
        clear(getDeadTime());
    }, []);

    const onClickReset = () => {
        setTimerColor("white")
        clear(getDeadTime());
    }


    function vote() {
        //TODO: change and get the gameid, userid & playerid
        gameController.vote(2, 3, 8);

        //TODO: wait on all players to vote before checking the result and hasended game
        gameController.getVotingResult(2).then(data => setVoteresult(data));
        // setVoteresult(player);

        navigate(`/game/voteresult`);


        //TODO: fix this - make it check if has ended is true then navigate to result page
        /* gameController.hasEnded(2).then(data => setHasEnded(data));
        console.log(hasEnded)
        if(true) {
            navigate(`/game/ending`);
        } else {
            navigate(`/game/voteresult`);
        } */

    }

    function showVotepage() {
        navigate(`/game/vote`);
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
                    <div className='section' style={{ gridTemplateRows: "50% auto" }}>

                        <div className='header' style={{ justifyContent: "end", paddingBottom: "20px" }}>
                            
                            <p>Day 1</p>
                            <h1 style={{ color: timerColor }}>{timer}</h1>
                        </div>
                        <div className='content' style={{ justifyContent: "start", gridTemplateRows: "60% auto" }}>
                            <p>Discuss who you think are a werewolf!</p>
                        </div>



                        {/* Check if times stop, if it has then is navigate to votepage
                         so we can start voting */}
                         {/* TODO: if night, then only werewolf are allowed to vote */}
                        {
                            timerHasStopped ? showVotepage() : <></>
                        }

                    </div>
                </div>
            </div>
     
        </>
    )
}

export default Village;