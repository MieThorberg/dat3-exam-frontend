import React from 'react'
import "../../styles/App.css"
import { useNavigate } from "react-router-dom";

const CreditsPage = ({ mode }) => {
    let navigate = useNavigate();
    function goToStartPage() {
        navigate("/");
    }

    return (
        <>

            <div className="background-container">
                <div
                    id="background-img"
                    style={{ backgroundImage: `url(${mode.image})` }}
                ></div>
                <div
                    id="background-img-blur"
                    style={{ backgroundColor: `${mode.blur}` }}
                ></div>
            </div>

            <div className="settings">
                <div className="settings-container">
                    <div className="section">
                        <div className="header" style={{ justifyContent: "end", paddingBottom: "20px" }}>
                            <div onClick={goToStartPage}>
                                <p className="back-arrow"><i className="fa fa-arrow-circle-left" style={{ paddingRight: "5px" }}></i> Back</p>
                            </div>
                            <h1>Credits</h1>
                        </div>
                        <div className="content">
                            <div style={{ display: "flex", alignItems: "center", justifyContent: "center", maxWidth: "400px", margin: "20px 0 0 0" }}>
                                <div>
                                    <p><a style={{color: "grey"}} href='https://www.freepik.com/vectors/night-house'>Night house vector created by upklyak - www.freepik.com</a></p>
                                    <p><a style={{color: "grey"}} href='https://www.freepik.com/vectors/old-town'>Old town vector created by upklyak - www.freepik.com</a></p>
                                    <p><a style={{color: "grey"}} href='https://www.freepik.com/vectors/happy-icon'>Happy icon vector created by ibrandify - www.freepik.com</a></p>
                                    <p><a style={{color: "grey"}} href='https://www.freepik.com/vectors/scary'>Scary vector created by upklyak - www.freepik.com</a></p>
                                    <p><a style={{color: "grey"}} href='https://www.freepik.com/vectors/old-city'>Old city vector created by upklyak - www.freepik.com</a></p>
                                    <p><a style={{color: "grey"}} href="https://www.flaticon.com/free-icons/hunter" title="hunter icons">Hunter icons created by max.icons - Flaticon</a></p>
                                    <p><a style={{color: "grey"}} href="https://www.flaticon.com/free-icons/medieval" title="medieval icons">Medieval icons created by max.icons - Flaticon</a></p>
                                    <p><a style={{color: "grey"}} href="https://www.flaticon.com/free-icons/werewolf" title="werewolf icons">Werewolf icons created by max.icons - Flaticon</a></p>

                                </div>
                            </div>
                        </div>
                        <div className="footer"></div>
                    </div>
                </div>
            </div>
            {/* <div className="main">
                <div className="home">
                    <div></div>
                    <div className="section">
                        <div className="header">
                  </div>
                    </div>
                    <div></div>
                </div>
            </div> */}
        </>
    )
}

export default CreditsPage;