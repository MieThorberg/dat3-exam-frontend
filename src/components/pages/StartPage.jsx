import React from 'react'
import "../../styles/App.css"
import facade from '../../apiFacade'

const StartPage = ({ mode }) => {
    return (
        <div>

            <div className='background-container'>
                <div id='background-img' style={{ backgroundImage: `url(${mode.image})` }}></div>
                <div id='background-img-blur' style={{ backgroundColor: `${mode.blur}` }}></div>
            </div>

            <div className='main'>
                {/* TODO: make background image work */}

                <div className="main-container">
                    {/* <!-- Column 1 (empty) --> */}
                    <div></div>
                    {/* <!-- Column 2 (start section) --> */}
                    <div className="section">
                        <div className="header-large">
                            <p>Welcome to</p>
                            <h1>Werewolf</h1>
                        </div>
                        <div className="content">

                            {facade.getToken() != undefined ?
                                <></>
                                :
                                <button className="btn-purple" style={{ maxWidth: "200px" }} onClick={event => window.location.href = "/login"}>Login</button>
                            }

                            <button className="btn-purple" style={{ maxWidth: "200px" }} onClick={event => window.location.href = "/rules"}>How to play ?</button>
                            <button className="btn-purple" style={{ maxWidth: "200px" }} onClick={event => window.location.href = "/credits"}>Credits</button>
                        </div>
                    </div>
                    {/* <!-- Column 3 (empty) --> */}
                    <div></div>
                </div>
            </div>
        </div>
    )
}

export default StartPage;