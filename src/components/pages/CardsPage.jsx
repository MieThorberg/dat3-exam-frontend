import React from 'react';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import "../../styles/CardsPage.css";
import facade from '../../apiFacade';

function CardsPage() {
    const [list, setList] = useState([]);
    const navigate = useNavigate();
    const [isAuthorized, setIsAuthorized] = useState(true);
    
    useEffect(() => {
        /*  facade.getAllHarbours()
             .then(data => setHarbours(data))
             .catch((err) => {
                 if (err.status == 403) {
                     navigate("/login");
                 } else if (err.status == 401) {
                     setIsAuthorized(false);
                 }
             }); */
    }, [])

    function seeMore(evt) {
        /* navigate(`${evt.target.id}`); */
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
                            <h2>Title</h2>
                            <p>Description</p>
                        </div>
                    </header>
                    <section className='table-section'>
                        {/*  {list.length == 0 ?
                    <p>Nothing registred</p>
                    :
                    <>
                        <p className='right'>Size: {list.length}</p>
                        <div className='grid-columns-3'>

                            {
                                list.map((element) => {
                                    return (
                                        <div className='card' key={element.id}>
                                            <div className='top'>

                                            </div>
                                            <div className='content'>
                                                <div>
                                                    <p className='title'>{element.name}</p>

                                                    <p>- Title: {element.address}</p>
                                                    <p>- Title: {element.capacity}</p>
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
                } */}
                    </section>
                </main>
        }
        </>
    )

}
export default CardsPage;