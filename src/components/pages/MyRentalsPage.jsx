import React from 'react';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import "../../styles/CardsPage.css";
import facade from '../../apiFacade';
import UnauthorizedPage from "../errors/UnauthorizedPage";


function MyRentalsPage() {
    const [rentals, setRentals] = useState([]);
    const navigate = useNavigate();
    const [isAuthorized, setIsAuthorized] = useState(true);
    useEffect(() => {

        if (facade.getToken() != undefined) {
            const name = facade.decodeToken().username;
            facade.getRentalByTenantName(name)
                .then(data => setRentals(data))
                .catch((err) => {
                    if (err.status == 403) {
                        navigate("/login");
                    } else if (err.status == 401) {
                        setIsAuthorized(false);
                    }
                });
        }
        else {
            setIsAuthorized(false);
        }
        



    }, [])

    function seeMore(evt) {
        console.log(evt.target.id)
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
                            <h2>My rentals</h2>
                            <p>All rentals</p>
                        </div>
                    </header>
                    <section className='table-section'>
                        {rentals.length == 0 ?
                            <p>Nothing registred</p>
                            :
                            <>
                                <p className='right'>Size: {rentals.length}</p>
                                <div className='grid-columns-3'>

                                    {
                                        rentals.map((element) => {
                                            return (
                                                <div className='card' key={element.id}>
                                                    <div className='top'>

                                                    </div>
                                                    <div className='content'>
                                                        <div>
                                                            <p className='title'>#{element.id} Rental</p>

                                                            <p>- Start date: {element.startDate}</p>
                                                            <p>- End date: {element.endDate}</p>
                                                            <p>- Price annual: {element.priceAnnual}</p>
                                                            <p>- Deposit: {element.deposit}</p>
                                                            <p>- Contact person: {element.contactPerson}</p>
                                                        </div>
                                                    </div>
                                                    <div className='bottom'>
                                                        <button id={element.house.id} onClick={seeMore} className='btn-black'>SEE MORE</button>
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

export default MyRentalsPage;