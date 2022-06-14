import React from 'react'
import { useState, useEffect } from 'react';
import "../../styles/Data.css";
import facade from '../../apiFacade';


function Data() {

    /* const [ownerData, setOwnerData] = useState({ name: "", address: "", phone: "" });
    const [harbourData, setHarbourData] = useState({ name: "", address: "", capacity: "" });
    const [boatData, setBoatData] = useState({ brand: "", make: "", name: "", image: "", owners: [], harbour: {} });
    const [boatHarbour, setBoatHarbour] = useState({ name: "", address: "", capacity: "" });
    const [allHarbourData, setAllHarbours] = useState([]);
    const [allOwnersData, setAllOwners] = useState([]); */

    useEffect(() => {
        /* facade.getAllHarbours().then(data => setAllHarbours(data));
        facade.getAllOwners().then(data => setAllOwners(data)); */
    }, [])

    /* const onChangeOwner = (evt) => {
        setOwnerData({ ...ownerData, [evt.target.id]: evt.target.value })
    }

    const onChangeHarbour = (evt) => {
        setHarbourData({ ...harbourData, [evt.target.id]: evt.target.value })
    }
    const onChangeBoat = (evt) => {
        setBoatData({ ...boatData, [evt.target.id]: evt.target.value })
        console.table(boatData)
    }

    const onChangeBoatHarbour = (evt) => {
        const value = evt.target.value;

        facade.getHarbourById(value).then(data => setBoatHarbour(data));

        setBoatData(
            { ...boatData, harbour: boatHarbour }
        )

        console.table(boatData)
        console.log(boatHarbour)
    }

    const onChangeBoatOwner = (evt) => {
        const value = evt.target.value;
        const newOwners = boatData.owners;

        if(newOwners.find(owner => owner.id == value) == undefined) {
            facade.getOwnerById(value).then(
                data => {
                    newOwners.push({
                        id: data.id,
                        name: data.name,
                        address: data.address,
                        phone: data.phone
                    })
                }
            )
        }
        setBoatData(
            {
                ...boatData, owners: newOwners
            }
        )
    }

    function createOwner() {
        facade.createOwner(ownerData).then().catch((err) => {
            alert("Please fill out the missing inputs")
        });
    }

    function createHarbour() {
        facade.createHarbour(harbourData).then().catch((err) => {
            alert("Please fill out the missing inputs")
        });
    }

    function createBoat() {
        facade.createBoat(boatData).then().catch((err) => {
            alert("Please fill out the missing inputs")
        });
    }

    function removeBoatOwners (id)  {
        setBoatData(
            {
                ...boatData, owners: boatData.owners.filter((owner) => owner.id !== id)
            }
        )
    } */

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

                    {/* <div className='datacard'>
                        <div className='content'>
                            <div>
                                <p className='title'>Create Owner</p>
                                <form onChange={onChangeOwner} >
                                    <label className='bold'>Name</label>
                                    <input type="text" style={{ marginBottom: "20px" }} placeholder="Enter name" id="name" />

                                    <label className='bold'>Address</label>
                                    <input type="text" style={{ marginBottom: "20px" }} placeholder="Enter address" id="address" />

                                    <label className='bold'>Name</label>
                                    <input type="text" style={{ marginBottom: "20px" }} placeholder="Enter phone" id="phone" />
                                </form>
                            </div>
                        </div>
                        <div className='bottom'>
                            <button onClick={createOwner}>CREATE</button>
                        </div>
                    </div> */}
                 {/*    <div className='datacard'>
                        <div className='content'>
                            <div>
                                <p className='title'>Create Harbour</p>
                                <form onChange={onChangeHarbour} >
                                    <label className='bold'>Name</label>
                                    <input type="text" style={{ marginBottom: "20px" }} placeholder="Enter name" id="name" />
                                    <label className='bold'>Address</label>
                                    <input type="text" style={{ marginBottom: "20px" }} placeholder="Enter address" id="address" />
                                    <label className='bold'>Capacity</label>
                                    <input type="number" style={{ marginBottom: "20px" }} min={1} id="capacity" />
                                </form>
                            </div>
                        </div>
                        <div className='bottom'>
                            <button onClick={createHarbour}>CREATE</button>
                        </div>
                    </div> */}

                    {/* <div className='datacard'>
                        <div className='content'>
                            <div>
                                <p className='title'>Create Boat</p>
                                <form>
                                    <label className='bold'>Name</label>
                                    <input onChange={onChangeBoat} type="text" style={{ marginBottom: "20px" }} placeholder="Enter name" id="name" />

                                    <label className='bold'>Brand</label>
                                    <input onChange={onChangeBoat} type="text" style={{ marginBottom: "20px" }} placeholder="Enter brand" id="brand" />

                                    <label className='bold'>Make</label>
                                    <input onChange={onChangeBoat} type="text" style={{ marginBottom: "20px" }} placeholder="Enter make" id="make" />

                                    <label className='bold'>Image</label>
                                    <select onChange={onChangeBoat} style={{ marginBottom: "20px" }} id="image">
                                        <option value="" disabled hidden>Choose image</option>
                                        <option value="Image 1">Image 1</option>
                                        <option value="Image 2">Image 2</option>
                                        <option value="Image 3">Image 3</option>
                                    </select>

                                    <label className='bold'>Owners</label>
                                    <select onChange={onChangeBoatOwner} style={{ marginBottom: "10px" }} id="owners">
                                        {
                                            allOwnersData.length == 0 ?
                                                <option value="" disabled hidden>No owner registred</option>
                                                :
                                                <>
                                                    <option value="" disabled hidden>Choose owner</option>
                                                    {allOwnersData.map((element) => {
                                                        return (
                                                            <option key={element.id} value={element.id}>{element.name}</option>
                                                        )
                                                    })}
                                                </>
                                        }
                                    </select>
                                    <div style={{ marginBottom: "20px" }}>
                                        {boatData.owners.map((element) => {
                                            return (
                                                < div key={element.id} className='grey-box' >
                                                    <div><p>{element.name}</p></div>
                                                    <div className='right'>
                                                        <a value={element.id} onClick={() => removeBoatOwners(element.id)}>x</a>
                                                    </div>
                                                </div>

                                            )
                                        })}
                                    </div>

                                    <label className='bold'>Harbour</label>
                                    <select onChange={onChangeBoatHarbour} style={{ marginBottom: "20px" }} id="harbour">
                                        {
                                            allHarbourData.length == 0 ?
                                                <option value="" disabled hidden>No harbour registred</option>
                                                :
                                                <>
                                                    <option value="" disabled hidden>Choose harbour</option>
                                                    {allHarbourData.map((element) => {
                                                        return (
                                                            <option key={element.id} value={element.id}>{element.name}</option>
                                                        )
                                                    })}
                                                </>
                                        }

                                    </select>

                                </form>
                            </div>
                        </div>
                        <div className='bottom'>
                            <button onClick={createBoat}>CREATE</button>
                        </div>
                    </div> */}
                </div>
            </section >
        </main >
    )

}
export default Data;