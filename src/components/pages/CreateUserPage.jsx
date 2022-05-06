import React from 'react'

const CreateUserPage = () => {
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
                            <p>Welcome to</p>
                            <h1>Werewolf</h1>
                        </div>
                        <div className="content">
                            <button className="btn-purple" onClick={event => window.location.href = "/login"}>Login</button>
                            <button className="btn-purple">About</button>
                            <button className="btn-purple">Credits</button>
                        </div>
                    </div>
                    {/* <!-- Column 3 (empty) --> */}
                    <div></div>
                </div>
            </div>
        </>
    )
}

export default CreateUserPage;