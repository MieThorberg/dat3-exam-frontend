import React from 'react'
import "../../styles/App.css"
import { useRef, useState } from 'react'
import { useEffect } from 'react'
import gameController from '../../gameController'
import { useNavigate, useLocation } from 'react-router-dom'
import facade from '../../apiFacade'
import { io } from 'socket.io-client'
import "../../styles/GamePage.css";
import villagerImage from "../../images/villager.png"
import werewolfImage from "../../images/werewolf.png"
import hunterImage from "../../images/hunter.png"

import GameSideBar from '../GameSideBar'
import Village from './Village'
import VotePage from './VotePage'
import VoteResultPage from './VoteResultPage'
import EndedGamePage from './EndedGamePage'
import DeadPage from './DeadPage'
import HunterPage from './HunterPage'

const GamePage = ({ mode, setIsDay, changeEndMode }) => {
    const navigate = useNavigate();
    const location = useLocation()
    const [playerToken, setPlayerToken] = useState({});
    const [data, setData] = useState({})
    const [current, setCurrent] = useState({});
    const [host, setHost] = useState(false)
    const [socket, setSocket] = useState(io);
    const [message, setMessage] = useState("new round");
    const [character, setCharacter] = useState({ name: "loading", image: "loading", description: ""});

    useEffect(() => {
        const socket = io("https://react-chat-werewolf-server.herokuapp.com")
        setSocket(socket)
        socket.on("connect", () => {
            console.log("village socket Connected")
            socket.emit("joinRoom", location.state.room)
        })

    }, [])

    useEffect(() => {
        console.log("current");
        setIsDay(current.isDay);
    },[current])

    useEffect(() => {
        console.log("socket Checker");
        //recieves the latest message from the server and sets our useStates
        if (socket) {
            socket.on("getLatestMessage", (newMessage) => {
                if (newMessage.msg == "vote") {
                    setMessage("vote");
                }
                if (newMessage.msg == "vote result") {
                    setMessage("vote result");
                }
                if (newMessage.msg == "new round") {
                    setMessage("new round");
                }
                if (newMessage.msg == "ended") {
                    socket.close();
                    setMessage("ended");
                }
            })       
        }
    }, [socket])

    const votePage = () => {

        const newMessage = { time: new Date(), msg: "vote", name: data.name }
        socket.emit("newMessage", { newMessage, room: location.state.room })
    }

    const voteResultpage = () => {
        const newMessage = { time: new Date(), msg: "vote result", name: data.name }
        socket.emit("newMessage", { newMessage, room: location.state.room })
    }

    const newRoundPage = () => {
        facade.hasEnded(data.gameid).then((ended) => {
            if (ended) {
                const newMessage = { time: new Date(), msg: "ended", name: data.name };
                socket.emit("newMessage", { newMessage, room: location.state.room });
            } else {
                gameController.createRound(data.gameid);
                gameController.cleanVotes(data.gameid);
                const newMessage = { time: new Date(), msg: "new round", name: data.name };
                socket.emit("newMessage", { newMessage, room: location.state.room });
            }
        });
    }

    useEffect(() => {
        console.log("banana");
        setData(location.state)
        if (data.gameid != undefined) {
            if (facade.getPlayerToken() != null) {
                setHost(facade.getPlayerToken().isHost);
            }

        }
    }, [data, location, host])

    useEffect(() => {
        console.log("hello");

        if (data.gameid != undefined) {
            if (Object.keys(current).length == 0) {
                gameController.getCurrentRound(data.gameid).then(data => {
                    setCurrent(data)
                });
            }
            if (facade.getPlayerToken() != null) {
                if (playerToken.characterName == null) {
                    facade.getPlayer(facade.getPlayerToken().id)
                    setPlayerToken(facade.getPlayerToken());
                }
                else {
                    if (character.description == "") {
                        setPlayerCharacter();
                    }
                }
            }
        }
        if (facade.getToken() == undefined) {
            navigate("/login");
        }
    }, [data, playerToken])



    function displayCharacter() {
        var x = document.getElementById("characterPopup");
        if (x.style.display == "none") {
            x.style.display = "block";
            console.log("popup");
        } else {
            x.style.display = "none";
            console.log("close")
        }
    }

    const getCharacterName = (name) => {
        if (name == "villager") {
            return "Villager";
        } else if (name == "werewolf") {
            return "Werewolf";
        } else { //else return hunter
            return "Hunter";
        }
    }

    const getCharacterImage = (name) => {
        if (name == "villager") {
            return villagerImage;
        } else if (name == "werewolf") {
            return werewolfImage;
        } else { //else return hunter image
            return hunterImage;
        }
    }

    function setPlayerCharacter() {
        const name = playerToken.characterName;
        const characterName = getCharacterName(name);
        const characterImage = getCharacterImage(name);

        facade.getCharacter(name).then(data => setCharacter({name: characterName, image: characterImage, description: data.description}))
       
    }

    /*     const getCharacterDescription = () => {
            const name = playerToken.characterName;
            facade.getCharacter(name).then(data => setCharacterDescription(data.description));
            return characterDescription;
        }
     */
    return (
        <>
            <div className='background-container'>
                <div id='background-img' style={{ backgroundImage: `url(${mode.image})` }}></div>
                <div id='background-img-blur' style={{ backgroundColor: `${mode.blur}` }}></div>
            </div>


            <div className='game'>
                <div className='sidebar'>
                    <GameSideBar characterName={playerToken.characterName} />
                </div>

                <div className='game-main'>

                    <div className='content'>

                       {/*  <DeadPage displayCharacter={displayCharacter}/> */}
        {/*                <HunterPage current={current} voteResultPage={voteResultpage} displayCharacter={displayCharacter} playerToken={playerToken}/>
 */}
                        {message == "new round" &&
                            <Village host={host} data={data} current={current} setCurrent={setCurrent} votePage={votePage} displayCharacter={displayCharacter} />
                        }

                        {message == "vote" &&
                            <VotePage host={host} current={current} voteResultPage={voteResultpage} displayCharacter={displayCharacter} playerToken={playerToken} />
                        }

                        {message == "vote result" &&
                            <VoteResultPage host={host} current={current} newRoundPage={newRoundPage} displayCharacter={displayCharacter} playerToken={playerToken} />
                        }

                        {message == "ended" &&
                            <EndedGamePage host={host} changeEndMode={changeEndMode} />
                        }

                        <div id='characterPopup' onClick={displayCharacter}>
                            <div className='card'>
                                <div className='content'>
                                    <div className='top'><i className="fa" id="remove-icon">&#xf00d;</i></div>
                                    <div className='character-image'>
                                        <p>Your role</p>
                                        <h1>{character.name}</h1>
                                        <img src={character.image} />
                                    </div>
                                    <div className='description'>
                                        <p>{character.description}</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </>
    )
}

export default GamePage;