import React from 'react'
import "../../styles/App.css"

const CreditsPage = () => {
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
                            <p><a href='https://www.freepik.com/vectors/night-house'>Night house vector created by upklyak - www.freepik.com</a></p>
                            <p><a href='https://www.freepik.com/vectors/old-town'>Old town vector created by upklyak - www.freepik.com</a></p>    
                        </div>
                    </div>
                    {/* <!-- Column 3 (empty) --> */}
                    <div></div>
                </div>
            </div>
        </>
    )
}

export default CreditsPage;