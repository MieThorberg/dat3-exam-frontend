import React from 'react';
import { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";
import "../../styles/ListPage.css";
import "../../styles/Element.css";
import "../../styles/Data.css";
import facade from '../../apiFacade';
import { useNavigate } from 'react-router-dom';
import RentalsPage from './RentalsPage';

function RentalUpdateDetail({ rental }) {

    const [rentalData, setRentalData] = useState({ startDate: "", endDate: "", priceAnnual: 0, deposit: 0, contactPerson: "", house: { id: 0, address: "", city: "", numberOfRooms: 1 }, tenants: [] });

   
    const navigate = useNavigate();

    useEffect(() => {
        
        setRentalData(rental);
    }, [])

    const onChangeRental = (evt) => {
        setRentalData({ ...rentalData, [evt.target.id]: evt.target.value })
    }

    function update() {
        facade.updateRental(rentalData).then().catch((err) => {
            alert("Please fill out the missing inputs")
        });
        window.location.reload();
    }

    function cancel() {
        window.location.reload();
    }

    return (
        <main>
            <header className='header-normal'>
                <div>
                    <h2>Update</h2>
                    <p># {rental.id} Rental</p>
                </div>
            </header>

            <section className='table-section'>
                <div className='grid-rows-3'>
                    <div className='datacard'>
                        <div className='content'>
                            <div>
                                <p className='title'>Update Rental</p>
                                <form >
                                    <label className='bold'>Start date</label>
                                    <input onChange={onChangeRental} type="text" style={{ marginBottom: "20px" }} placeholder="Enter start date" defaultValue={rental.startDate} id="startDate" />

                                    <label className='bold'>End date</label>
                                    <input onChange={onChangeRental} type="text" style={{ marginBottom: "20px" }} placeholder="Enter end date" defaultValue={rental.endDate} id="endDate" />

                                    <label className='bold'>Price annual</label>
                                    <input onChange={onChangeRental} type="number" style={{ marginBottom: "20px" }} min={0} defaultValue={rental.priceAnnual} id="priceAnnual" />

                                    <label className='bold'>Deposit</label>
                                    <input onChange={onChangeRental} type="number" style={{ marginBottom: "20px" }} min={0} defaultValue={rental.deposit} id="deposit" />

                                    <label className='bold'>Contact person</label>
                                    <input onChange={onChangeRental} type="text" style={{ marginBottom: "20px" }} placeholder="Enter contact person" defaultValue={rental.contactPerson} id="contactPerson" />
                                </form>
                            </div>
                        </div>
                        <div className='bottom' style={{ gap: "20px" }}>
                            <button className="btn-black" onClick={cancel}>CANCEL</button>
                            <button onClick={update}>Update</button>
                        </div>
                    </div>
                </div>

            </section>


            <section className='table-section'>

            </section>
        </main >
    )

}

function RentalDetailPage() {
    const navigate = useNavigate();
    const params = useParams();
    const [rental, setRental] = useState({ id: 0, startDate: "", endDate: "", priceAnnual: 0, deposit: 0, contactPerson: "", house: {}, tenants: [] });
    const [editing, setEditing] = useState(false);
    useEffect(() => {
        if (facade.getToken() != undefined) {
            facade.getRentalById(params.rentalid).then(data => setRental(data));
            facade.getTenantsFromHouseById(params.houseid).then(data => setTenants(data));
        } else {
        }
    }, [])

    function remove() {
        facade.deleteRental(rental.id);
        navigate("/");
        alert("Rental was deleted")
    }
    function edit() {
        setEditing(true);
    }

    return (
        <>
            {
                !editing ?
                    <main>
                        <header className='header-normal'>
                            <div>
                                <h2>#{rental.id} Rental</h2>
                                <p>Details</p>
                            </div>
                        </header>

                        <section className='table-section'>
                            <table>
                                <tbody>
                                    <tr>
                                        <th><p className='bold'>ID</p></th>
                                        <th><p className='bold'>Start date</p></th>
                                        <th><p className='bold'>End date</p></th>
                                        <th><p className='bold'>Price annual</p></th>
                                        <th><p className='bold'>Deposit</p></th>
                                        <th><p className='bold'>Contact person</p></th>
                                        <th></th>
                                    </tr>
                                    <tr>
                                        <td><p>{rental.id}</p></td>
                                        <td><p>{rental.startDate}</p></td>
                                        <td><p>{rental.endDate}</p></td>
                                        <td><p>{rental.priceAnnual}</p></td>
                                        <td><p>{rental.deposit}</p></td>
                                        <td><p>{rental.contactPerson}</p></td>
                                        <td className='btn-columns'>
                                            <button onClick={edit} className='btn-black'>Edit</button>
                                            <button onClick={remove} className='btn-red'>Remove</button>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </section>


                        <section className='table-section'>
                            {rental.house == null ?
                                <p>Nothing registred</p>
                                :
                                <>

                                    <table>
                                        <tbody>
                                            <tr>
                                                <th><p className='bold'>House ID</p></th>
                                                <th><p className='bold'>Address</p></th>
                                                <th><p className='bold'>City</p></th>
                                                <th><p className='bold'>Rooms</p></th>
                                            </tr>

                                            <tr>
                                                <td><p>{rental.house.id}</p></td>
                                                <td><p>{rental.house.address}</p></td>
                                                <td><p>{rental.house.city}</p></td>
                                                <td><p>{rental.house.numberOfRooms}</p></td>
                                            </tr>

                                        </tbody>
                                    </table>
                                </>
                            }
                        </section>

                        <section className='table-section'>
                            {rental.tenants.length == 0 ?
                                <p>Nothing registred</p>
                                :
                                <>
                                    <p className='right'>Size: {rental.tenants.length}</p>
                                    <table>
                                        <tbody>
                                            <tr>
                                                <th><p className='bold'>Tenant ID</p></th>
                                                <th><p className='bold'>Name</p></th>
                                                <th><p className='bold'>Phone</p></th>
                                                <th><p className='bold'>Job</p></th>
                                            </tr>

                                            {rental.tenants.map((element) => {
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
                    </main >
                    :

                    <RentalUpdateDetail rental={rental} />
            }
        </>


    )

}
export default RentalDetailPage;