import React from 'react';
import { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";
import "../../styles/ListPage.css";
import "../../styles/Element.css";
import "../../styles/Data.css";
import facade from '../../apiFacade';
import { useNavigate } from 'react-router-dom';

function HouseDetailPage() {
    const params = useParams();
    const [house, setHouse] = useState({ id: 0, address: "", city: "", name: "", numberOfRooms: 1 });
    const [tenants, setTenants] = useState([])
    useEffect(() => {


        if (facade.getToken() != undefined) {
            facade.getHouseById(params.houseid).then(data => setHouse(data));
            if (facade.decodeToken().roles.includes("admin")) {
                facade.getTenantsFromHouseById(params.houseid).then(data => setTenants(data));
            }
        } else {

        }

    }, [])

    return (
        <main>
            <header className='header-normal'>
                <div>
                    <h2>#{house.id} House</h2>
                    <p>House details</p>
                </div>
            </header>

            <section className='table-section'>
                <table>
                    <tbody>
                        <tr>
                            <th><p className='bold'>ID</p></th>
                            <th><p className='bold'>Address</p></th>
                            <th><p className='bold'>City</p></th>
                            <th><p className='bold'>Rooms</p></th>
                            {/* <th></th> */}
                        </tr>
                        <tr>
                            <td><p>{house.id}</p></td>
                            <td><p>{house.address}</p></td>
                            <td><p>{house.city}</p></td>
                            <td><p>{house.numberOfRooms}</p></td>
                            {/* <td className='btn-columns'>
                                            <button onClick={edit} className='btn-black'>Edit</button>
                                            <button onClick={remove} className='btn-red'>Remove</button>
                                        </td> */}
                        </tr>
                    </tbody>
                </table>
            </section>


            {
                facade.decodeToken().roles.includes("admin") &&
                <section className='table-section'>
                    {tenants.length == 0 ?
                        <p>Nothing registred</p>
                        :
                        <>

                            <p className='right'>Size: {tenants.length}</p>
                            <table>
                                <tbody>
                                    <tr>
                                        <th><p className='bold'>Tenant ID</p></th>
                                        <th><p className='bold'>Name</p></th>
                                        <th><p className='bold'>Phone</p></th>
                                        <th><p className='bold'>Job</p></th>
                                    </tr>

                                    {tenants.map((element) => {
                                        return (
                                            <tr key={element.id}>
                                                <td><p>{element.id}</p></td>
                                                <td><p>{element.name}</p></td>
                                                <td><p>{element.phone}</p></td>
                                                <td><p>{element.job}</p></td>
                                            </tr>
                                        )
                                    })}
                                </tbody>
                            </table>
                        </>
                    }
                </section>
            }



        </main >




    )

}
export default HouseDetailPage;