import React from 'react'
import "../../styles/App.css"
import { useRef, useState } from 'react'
import { useEffect } from 'react'
import gameController from '../../gameController'
import { useNavigate } from 'react-router-dom'

const Village = ({setVoteresult}) => {
    const navigate = useNavigate();
    //Testing timer
    const seconds = 0;
    const minutes = 0;
    const hours = 0;
    const Ref = useRef(null);
    const [timer, setTimer] = useState('00:00:00');
    const [timerColor, setTimerColor] = useState('white');
    const [timerHasStopped, setTimerHasStopped] = useState(true);
    

    const getTimeRemaining = (e) => {
        const total = Date.parse(e) - Date.parse(new Date());
        const seconds = Math.floor((total / 1000) % 60);
        const minutes = Math.floor((total / 1000 / 60) % 60);
        const hours = Math.floor((total / 1000 * 60 * 60) % 24);
        return {
            total, hours, minutes, seconds
        };
    }

    const start = (e) => {
        let { total, hours, minutes, seconds } = getTimeRemaining(e);
        if (total >= 0) {
            setTimer(
                (hours > 9 ? hours : '0' + hours) + ":" +
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
        setTimer('00:00:01');
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
        deadline.setSeconds(deadline.getSeconds() + 1)
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
        gameController.vote(2, 3, 7);
        console.log("voting")
       
        const player = gameController.getVotingResult(2).then(data => setVoteresult(data));
        /* console.log(player);
        setVoteresult(player); */
        
        
        navigate(`/game/voteresult`);
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
                            <p>Day 1</p>
                            <h1>
                                {
                                    timerHasStopped ? "Time to vote" : ""
                                }
                            </h1>
                            <h1 style={{ color: timerColor }}>{timer}</h1>
                            <button onClick={onClickReset}>Reset</button>
                        </div>
                        {
                            timerHasStopped ? <div className="content">
                                <input type="text" placeholder="type name to vote on" />
                                <button className="btn-purple" onClick={vote}>Vote</button>
                            </div> : <></>
                        }

                    </div>
                    {/* <!-- Column 3 (empty) --> */}
                    <div></div>
                </div>
            </div>
        </>
    )
}

export default Village;