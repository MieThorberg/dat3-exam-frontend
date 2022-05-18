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
                            <a href='https://www.freepik.com/vectors/happy-icon'>Happy icon vector created by ibrandify - www.freepik.com</a>  
                            <a href='https://www.freepik.com/vectors/scary'>Scary vector created by upklyak - www.freepik.com</a>  
                            <a href='https://www.freepik.com/vectors/old-city'>Old city vector created by upklyak - www.freepik.com</a>
                            <a href="https://www.flaticon.com/free-icons/hunter" title="hunter icons">Hunter icons created by max.icons - Flaticon</a>
                            <a href="https://www.flaticon.com/free-icons/medieval" title="medieval icons">Medieval icons created by max.icons - Flaticon</a>
                            <a href="https://www.flaticon.com/free-icons/werewolf" title="werewolf icons">Werewolf icons created by max.icons - Flaticon</a>
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