import React from 'react'
import "../../styles/App.css"
import { useEffect, useState } from 'react';
import facade from '../../apiFacade';
import { useNavigate } from "react-router-dom";
const RulesPage = ({ mode, setHeadline }) => {
    //title i topnav
    let navigate = useNavigate();
    const [rules, setRules] = useState([])
    useEffect(() => {
        setHeadline("About");
        facade.getRules().then(res => setRules(res))
    }, []);

    // console.log(rules);
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
                            <h1>How to play ?</h1>
                        </div>
                        <div className="content">
                            <div style={{ display: "flex", alignItems: "center", justifyContent: "center", maxWidth: "400px", margin: "20px 0 0 0" }}>
                                <div>
                                    {rules.map(rule => {
                                        return <div key={rule.id} >
                                            <ul style={{ paddingBottom: "8px"}}>
                                                <li>{rule.rule}</li>
                                            </ul>
                                        </div>
                                    })}
                                </div>
                            </div>
                        </div>
                        <div className="footer"></div>
                    </div>
                </div>
            </div>
        </>


        /* <div className='main2'>
            <div className='scroll-container'>
                <div className='full-scroll-section'>
                    <div className='text-section' >
                        <h1>How to play</h1>
                       {rules.map( rule => {
                           return <div key={rule.id} >
                               <ul>
                               <li>{rule.rule}</li>
                               </ul>
                           </div>
                       })}
                    </div>
                </div>
            </div>
        </div> */
    )
}

export default RulesPage;