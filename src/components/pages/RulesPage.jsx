import React from 'react'
import "../../styles/App.css"
import { useEffect } from 'react';

const RulesPage = ({ setHeadline }) => {
    //title i topnav
    useEffect(() => {
        setHeadline("About");
    }, []);

    return (
        <div className='main2'>
            <div className='scroll-container'>
                <div className='full-scroll-section'>
                    <div className='text-section'>
                        <h2>Vertical Mobile Navbar</h2>
                        <p>This example demonstrates how a navigation menu on a mobile/smart phone could look like. Click on the
                            hamburger menu (three bars) in the top right corner, to toggle the menu. This example demonstrates how a
                            navigation menu on a mobile/smart phone could look like. Click on the hamburger menu (three bars) in the top
                            right corner, to toggle the menu. This example demonstrates how a navigation menu on a mobile/smart phone
                            could look like. Click on the hamburger menu (three bars) in the top right corner, to toggle the menu. This
                            example demonstrates how a navigation menu on a mobile/smart phone could look like. Click on the hamburger
                            menu (three bars) in the top right corner, to toggle the menu.</p>
                        <h2>Vertical Mobile Navbar</h2>
                        <p>This example demonstrates how a navigation menu on a mobile/smart phone could look like.</p>
                        <p>Click on the hamburger menu (three bars) in the top right corner, to toggle the menu.</p>
                        <h2>Vertical Mobile Navbar</h2>
                        <p>This example demonstrates how a navigation menu on a mobile/smart phone could look like.</p>
                        <p>Click on the hamburger menu (three bars) in the top right corner, to toggle the menu.</p>

                        <h2>Vertical Mobile Navbar</h2>
                        <p>This example demonstrates how a navigation menu on a mobile/smart phone could look like. Click on the
                            hamburger menu (three bars) in the top right corner, to toggle the menu. This example demonstrates how a
                            navigation menu on a mobile/smart phone could look like. Click on the hamburger menu (three bars) in the top
                            right corner, to toggle the menu. This example demonstrates how a navigation menu on a mobile/smart phone
                            could look like. Click on the hamburger menu (three bars) in the top right corner, to toggle the menu. This
                            example demonstrates how a navigation menu on a mobile/smart phone could look like. Click on the hamburger
                            menu (three bars) in the top right corner, to toggle the menu.</p>
                        <h2>Vertical Mobile Navbar</h2>
                        <p>This example demonstrates how a navigation menu on a mobile/smart phone could look like.</p>
                        <p>Click on the hamburger menu (three bars) in the top right corner, to toggle the menu.</p>
                        <h2>Vertical Mobile Navbar</h2>
                        <p>This example demonstrates how a navigation menu on a mobile/smart phone could look like.</p>
                        <p>Click on the hamburger menu (three bars) in the top right corner, to toggle the menu.</p>

                        <h2>Vertical Mobile Navbar</h2>
                        <p>This example demonstrates how a navigation menu on a mobile/smart phone could look like. Click on the
                            hamburger menu (three bars) in the top right corner, to toggle the menu. This example demonstrates how a
                            navigation menu on a mobile/smart phone could look like. Click on the hamburger menu (three bars) in the top
                            right corner, to toggle the menu. This example demonstrates how a navigation menu on a mobile/smart phone
                            could look like. Click on the hamburger menu (three bars) in the top right corner, to toggle the menu. This
                            example demonstrates how a navigation menu on a mobile/smart phone could look like. Click on the hamburger
                            menu (three bars) in the top right corner, to toggle the menu.</p>
                        <h2>Vertical Mobile Navbar</h2>
                        <p>This example demonstrates how a navigation menu on a mobile/smart phone could look like.</p>
                        <p>Click on the hamburger menu (three bars) in the top right corner, to toggle the menu.</p>
                        <h2>Vertical Mobile Navbar</h2>
                        <p>This example demonstrates how a navigation menu on a mobile/smart phone could look like.</p>
                        <p>Click on the hamburger menu (three bars) in the top right corner, to toggle the menu.</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default RulesPage;