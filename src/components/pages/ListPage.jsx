import React from 'react'
import { useState, useEffect } from 'react'
import "../../styles/ListPage.css";
import facade from '../../apiFacade';

function ListPage() {

    const [list, setList] = useState([]);

    useEffect(() => {
        /* facade.getAllOwners().then(data => setOwners(data)); */
    }, [])

    return (
        <main>
            <header className='header-normal'>
                <div>
                    <h2>Title</h2>
                    <p>Description</p>
                </div>
            </header>
            <section className='table-section'>
                {/* {
                    list.length == 0 ?
                        <p>Nothing registred</p>
                        :
                        <>
                            <p className='right'>Size: {list.length}</p>
                            <table>
                                <tbody>

                                    <tr>
                                        <th><p className='bold'>ID</p></th>
                                        <th><p className='bold'>Title</p></th>
                                        <th><p className='bold'>Title</p></th>
                                        <th><p className='bold'>Title</p></th>
                                    </tr>

                                    {list.map((element) => {
                                        return (
                                            <tr key={element.id}>

                                                <td><p>{element.id}</p></td>
                                                <td><p>{element.name}</p></td>
                                                <td><p>{element.address}</p></td>
                                                <td><p>{element.phone}</p></td>
                                            </tr>
                                        )

                                    })}
                                </tbody>
                            </table>
                        </>

                } */}
            </section>
        </main>
    )

}
export default ListPage;