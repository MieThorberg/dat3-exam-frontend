import React from 'react'
import { useState, useEffect } from 'react';
import "../../styles/Data.css";
import facade from '../../apiFacade';


function Data() {

    const [houseData, setHouseData] = useState({ address: "", city: "", numberOfRooms: 1 });
    const [tenantData, setTenantData] = useState({ name: "", phone: "", job: "" });
    const [rentalData, setRentalData] = useState({ startDate: "", endDate: "", priceAnnual: 0, deposit: 0, contactPerson: "", house: { id: 0, address: "", city: "", numberOfRooms: 1 }, tenants: [] });

    const [rentalHouse, setRentalHouse] = useState({ id: 0, address: "", city: "", numberOfRooms: 1 });

    const [allTenants, setAllTenants] = useState([]);
    const [allHouses, setAllHouses] = useState([]);

    useEffect(() => {
        facade.getAllHouses().then(data => setAllHouses(data));
        facade.getAllTenants().then(data => setAllTenants(data));
    }, [])

    const onChangeHouse = (evt) => {

        setHouseData({ ...houseData, [evt.target.id]: evt.target.value })
    }

    function createHouse() {
        facade.createHouse(houseData).then(
            alert("House was created")
        ).catch((err) => {
            alert("Please fill out the missing inputs")
        });
    }


    const onChangeTenant = (evt) => {

        setTenantData({ ...tenantData, [evt.target.id]: evt.target.value })
    }

    function createTenant() {
        facade.createTenant(tenantData).then(
            alert("Tenant was created")
        ).catch((err) => {
            alert("Please fill out the missing inputs")
        });
    }

    const onChangeRental = (evt) => {

        setRentalData({ ...rentalData, [evt.target.id]: evt.target.value })
        console.log(rentalData);
        console.table(rentalData);
    }

    function createRental() {
        facade.createRental(rentalData).then(
            alert("Rental was created")
        ).catch((err) => {
            alert("Please fill out the missing inputs")
        });
        console.log(rentalData)
    }

    const onChangeRentalHouse = (evt) => {

        const value = evt.target.value;

        facade.getHouseById(value).then(data => {
            setRentalHouse(data)
            console.log(data);
        });

        setRentalData(
            { ...rentalData, house: rentalHouse }
        )
    }

    const onChangeRentalTenants = (evt) => {

        const value = evt.target.value;
        const newTenants = rentalData.tenants;

        if (newTenants.find(tenant => tenant.id == value) == undefined) {
            facade.getTenantById(value).then(
                data => {
                    newTenants.push({
                        id: data.id,
                        name: data.name,
                        phone: data.phone,
                        job: data.job
                    })
                }
            )
        }
        setRentalData(
            {
                ...rentalData, tenants: newTenants
            }
        )
    }

    function removeRentalTenant(id) {
        setRentalData(
            {
                ...rentalData, tenants: rentalData.tenants.filter((tenant) => tenant.id !== id)
            }
        )
    }


    return (
        <main>
            <header className='header-normal'>
                <div>
                    <h2>Data</h2>
                    <p>Insert new data</p>
                </div>
            </header>
            <section className='table-section'>
                <div className='grid-rows-3'>

                    <div className='datacard'>
                        <div className='content'>
                            <div>
                                <p className='title'>Create House</p>
                                <form onChange={onChangeHouse} >
                                    <label className='bold'>Address</label>
                                    <input type="text" style={{ marginBottom: "20px" }} placeholder="Enter address" id="address" />

                                    <label className='bold'>City</label>
                                    <input type="text" style={{ marginBottom: "20px" }} placeholder="Enter city" id="city" />

                                    <label className='bold'>Number of Rooms</label>
                                    <input type="number" style={{ marginBottom: "20px" }} min={1} defaultValue={1} id="numberOfRooms" />
                                </form>
                            </div>
                        </div>
                        <div className='bottom'>
                            <button onClick={createHouse}>CREATE</button>
                        </div>
                    </div>

                    <div className='datacard'>
                        <div className='content'>
                            <div>
                                <p className='title'>Create Tenant</p>
                                <form onChange={onChangeTenant} >
                                    <label className='bold'>Name</label>
                                    <input type="text" style={{ marginBottom: "20px" }} placeholder="Enter name" id="name" />

                                    <label className='bold'>Phone</label>
                                    <input type="text" style={{ marginBottom: "20px" }} placeholder="Enter phone" id="phone" />

                                    <label className='bold'>Job</label>
                                    <input type="text" style={{ marginBottom: "20px" }} placeholder="Enter job" id="job" />
                                </form>
                            </div>
                        </div>
                        <div className='bottom'>
                            <button onClick={createTenant}>CREATE</button>
                        </div>
                    </div>

                    <div className='datacard'>
                        <div className='content'>
                            <div>
                                <p className='title'>Create Rental</p>
                                <form >
                                    <label className='bold'>Start date</label>
                                    <input onChange={onChangeRental} type="text" style={{ marginBottom: "20px" }} placeholder="Enter start date" id="startDate" />

                                    <label className='bold'>End date</label>
                                    <input onChange={onChangeRental} type="text" style={{ marginBottom: "20px" }} placeholder="Enter end date" id="endDate" />

                                    <label className='bold'>Price annual</label>
                                    <input onChange={onChangeRental} type="number" style={{ marginBottom: "20px" }} min={0} defaultValue={0} id="priceAnnual" />

                                    <label className='bold'>Deposit</label>
                                    <input onChange={onChangeRental} type="number" style={{ marginBottom: "20px" }} min={0} defaultValue={0} id="deposit" />

                                    <label className='bold'>Contact person</label>
                                    <input onChange={onChangeRental} type="text" style={{ marginBottom: "20px" }} placeholder="Enter contact person" id="contactPerson" />

                                    <label className='bold'>Select house</label>
                                    <select onClick={onChangeRentalHouse} style={{ marginBottom: "20px" }} id="house">
                                        {
                                            allHouses.length == 0 ?
                                                <option value="" disabled hidden>No houses registred</option>
                                                :
                                                <>
                                                    <option value="" selected disabled hidden>Choose house</option>
                                                    {allHouses.map((element) => {
                                                        return (
                                                            <option key={element.id} value={element.id}>#{element.id}. Address: {element.address}, City: {element.city}, Rooms: {element.numberOfRooms}</option>
                                                        )
                                                    })}
                                                </>
                                        }
                                    </select>

                                    <label className='bold'>Select tenants</label>
                                    <select onClick={onChangeRentalTenants} style={{ marginBottom: "20px" }} id="tenants">
                                        {
                                            allTenants.length == 0 ?
                                                <option value="" disabled hidden>No tenants registred</option>
                                                :
                                                <>
                                                    <option value="" selected disabled hidden>Choose tenants</option>
                                                    {allTenants.map((element) => {
                                                        return (
                                                            <option key={element.id} value={element.id}>{element.name}</option>
                                                        )
                                                    })}
                                                </>
                                        }
                                    </select>
                                    <div style={{ marginBottom: "20px" }}>
                                        {rentalData.tenants.map((element) => {
                                            return (
                                                < div key={element.id} className='grey-box' >
                                                    <div><p>{element.name}</p></div>
                                                    <div className='right'>
                                                        <a value={element.id} onClick={() => removeRentalTenant(element.id)}>x</a>
                                                    </div>
                                                </div>

                                            )
                                        })}
                                    </div>

                                </form>
                            </div>
                        </div>
                        <div className='bottom'>
                            <button onClick={createRental}>CREATE</button>
                        </div>
                    </div>
                </div>
            </section >
        </main >
    )

}
export default Data;