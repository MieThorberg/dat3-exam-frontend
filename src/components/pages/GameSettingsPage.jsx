import React from 'react'
import "../../styles/App.css"
import { useState, useEffect } from 'react'
import { useNavigate, NavLink } from 'react-router-dom'
import facade from '../../apiFacade'

const GameSettingsPage = ({ setHeadline }) => {
    //title i topnav
    useEffect(() => {
        setHeadline("Game settings");
    }, []);

    let navigate = useNavigate();

    const [error, setError] = useState("")
    const [data, setData] = useState({ name: "", room: "" })
    const [pin, setPin] = useState("");
    const [game, setGame] = useState('')

    const handleChange = e => {
        setData({
            ...data,
            [e.target.name]: e.target.value
        })

    }

    const validation = () => {
        if (!data.name) {
            setError("Please enter your name.")
            return false
        }
        if (!data.room) {
            setError("Please enter pin code.")
            return false
        }
        setError("")
        return true
    }

    const handleSubmit = e => {
        e.preventDefault()
        const isValid = validation()
        if (isValid) {
            navigate(`/chat/${data.room}`, { state: data });
            facade.createGame('user', 'test123').then(data => setGame(data))
        }

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

                    <div className='box'>
                        <form onSubmit={handleSubmit}>
                            <div >
                                <input type="name" name="name" placeholder="Game name" onChange={handleChange} />
                            </div>
                            <div>
                                <input type="name" name="room" placeholder="Enter pin" onChange={handleChange} /><br></br>
                            </div>
                            <button type="submit">Create game</button>
                            {/* If you dont have type in values for the inputs */}
                            {error ? <small>{error}</small> : ""}
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default GameSettingsPage;