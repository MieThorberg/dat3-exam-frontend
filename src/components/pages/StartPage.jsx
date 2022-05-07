import React from 'react'
import "../../styles/App.css"

const StartPage = ({mode}) => {
    return (
        <div>
            <div id='background-img' style={{backgroundImage: `url(${mode.image})`}}></div>
            <div className='main' style={{ backgroundColor: "rgba(16, 5, 30, 0.685)" }}>
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
                            <button className="btn-purple" style={{ maxWidth: "200px" }} onClick={event => window.location.href = "/home"}>Login</button>
                            <button className="btn-purple" style={{ maxWidth: "200px" }} onClick={event => window.location.href = "/rules"}>About</button>
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