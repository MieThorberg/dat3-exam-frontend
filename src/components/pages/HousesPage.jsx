import React from 'react';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import "../../styles/CardsPage.css";
import facade from '../../apiFacade';


function HousesPage({ isUser }) {
    const [houses, setHouses] = useState([]);
    const navigate = useNavigate();
    const [isAuthorized, setIsAuthorized] = useState(true);

    useEffect(() => {

        facade.getAllHouses()
            .then(data => setHouses(data))
            .catch((err) => {
                if (err.status == 403) {
                    navigate("/login");
                } else if (err.status == 401) {
                    setIsAuthorized(false);
                }
            });

    }, [])

    function seeMore(evt) {
        navigate(`${evt.target.id}`);
    }

    return (

        <>{
            !isAuthorized ?
                <>
                    <UnauthorizedPage />
                </>

                :

                <main>
                    <header className='header-normal'>
                        <div>
                            <h2>Houses</h2>
                            <p>All houses</p>
                        </div>
                    </header>
                    <section className='table-section'>
                        {houses.length == 0 ?
                            <p>Nothing registred</p>
                            :
                            <>
                                <p className='right'>Size: {houses.length}</p>
                                <div className='grid-columns-3'>

                                    {
                                        houses.map((element) => {
                                            return (
                                                <div className='card' key={element.id}>
                                                    <div className='top'>

                                                    </div>
                                                    <div className='content'>
                                                        <div>
                                                            <p className='title'>#{element.id} House</p>

                                                            <p>- Address: {element.address}</p>
                                                            <p>- City: {element.city}</p>
                                                            <p>- Rooms: {element.numberOfRooms}</p>
                                                        </div>
                                                    </div>
                                                    <div className='bottom'>
                                                        <button id={element.id} onClick={seeMore} className='btn-black'>SEE MORE</button>
                                                    </div>
                                                </div>
                                            )
                                        })
                                    }
                                </div>
                            </>
                        }
                    </section>
                </main>
        }
        </>
    )
}

export default HousesPage;