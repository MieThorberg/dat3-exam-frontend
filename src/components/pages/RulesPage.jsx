import React from 'react'
import "../../styles/App.css"
import { useEffect, useState } from 'react';
import facade from '../../apiFacade';

const RulesPage = ({ setHeadline }) => {
    //title i topnav
    const [rules, setRules] = useState([])
    useEffect(() => {
        setHeadline("About");
        facade.getRules().then(res => setRules(res))
    }, []);


    return (
        
        <div className='main2'>
            <div className='scroll-container'>
                <div className='full-scroll-section'>
                    <div className='text-section' >
                        <div className="header-large">
                        <h1>How to play</h1>
                        </div>
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
        </div>
    )
}

export default RulesPage;