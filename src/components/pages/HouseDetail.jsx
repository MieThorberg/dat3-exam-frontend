import React from 'react';
import { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";
import "../../styles/ListPage.css";
import "../../styles/Element.css";
import "../../styles/Data.css";
import facade from '../../apiFacade';
import { useNavigate } from 'react-router-dom';

function HouseUpdateDetail(/* { boat } */) {

    /*  const [boatData, setBoatData] = useState({ id: "", brand: "", make: "", name: "", image: "", owners: [], harbour: {} });
     const [allHarbourData, setAllHarbours] = useState([]);
     const [allOwnersData, setAllOwners] = useState([]);
     const [owners, setOwners] = useState([]);
     const navigate = useNavigate(); */

    useEffect(() => {
        /* facade.getAllHarbours().then(data => setAllHarbours(data));
        facade.getAllOwners().then(data => setAllOwners(data));
        setBoatData(boat);
        setOwners(boatData.owners); */
    }, [])

    /*     const onChangeBoat = (evt) => {
            evt.preventDefault();
            setBoatData({ ...boatData, [evt.target.id]: evt.target.value })
        }
    
        const onChangeBoatHarbour = (evt) => {
            evt.preventDefault();
            const value = evt.target.value;
    
            facade.getHarbourById(value).then(data => {
                setBoatData(
                    {
                        ...boatData, harbour: {
                            id: data.id,
                            name: data.name,
                            address: data.address,
                            capacity: data.capacity
                        }
                    }
                )
            }
            );
        }
    
        const onChangeBoatOwner = (evt) => {
            const value = evt.target.value;
            const newOwners = boatData.owners;
    
            if (newOwners.find(owner => owner.id == value) == undefined) {
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
            evt.preventDefault();
        }
    
        function update() {
            facade.updateBoat(boatData).then().catch((err) => {
                alert("Please fill out the missing inputs")
            });
            window.location.reload();
        }
    
        function cancel() {
            window.location.reload();
        }
    
        function removeBoatOwners(id) {
            setBoatData(
                {
                    ...boatData, owners: boatData.owners.filter((owner) => owner.id !== id)
                }
            )
        }
     */
    return (
        <main>
            <header className='header-normal'>
                <div>
                    <h2>Title</h2>
                    <p>Editing</p>
                </div>
            </header>

            <section className='table-section'>
                <div className='grid-rows-3'>
                    <div className='datacard'>
                        <div className='content'>
                            {/*  <div>
                                <p className='title'>Update ###</p>
                                <form>
                                    <label className='bold'>Name</label>
                                    <input onChange={onChangeBoat} type="text" style={{ marginBottom: "20px" }} placeholder="Enter name" defaultValue={boat.name} id="name" />

                                    <label className='bold'>Brand</label>
                                    <input onChange={onChangeBoat} type="text" style={{ marginBottom: "20px" }} placeholder="Enter brand" defaultValue={boat.brand} id="brand" />

                                    <label className='bold'>Make</label>
                                    <input onChange={onChangeBoat} type="text" style={{ marginBottom: "20px" }} placeholder="Enter make" defaultValue={boat.make} id="make" />

                                    <label className='bold'>Image</label>
                                    <select onChange={onChangeBoat} style={{ marginBottom: "20px" }} id="image" defaultValue={boat.image} >
                                        <option value="Image 1">Image 1</option>
                                        <option value="Image 2">Image 2</option>
                                        <option value="Image 3">Image 3</option>
                                    </select>

                                    <label className='bold'>Owners</label>
                                    <select onClick={onChangeBoatOwner} style={{ marginBottom: "10px" }} id="owners">
                                        {
                                            allOwnersData.length == 0 ?
                                                <option value="" disabled hidden>No owner registred</option>
                                                :
                                                <>
                                                    
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
                                    <select onChange={onChangeBoatHarbour} style={{ marginBottom: "20px" }} id="harbour" >
                                        {
                                            allHarbourData.length == 0 ?
                                                <option value="" selected disabled hidden>No harbour registred</option>
                                                :
                                                <>
                                                    <option selected defaultValue={boat.harbour.id} disabled hidden>{boat.harbour.name}</option>
                                                    {allHarbourData.map((element) => {
                                                        return (
                                                            <option key={element.id} value={element.id}>{element.name}</option>
                                                        )
                                                    })}
                                                </>
                                        }

                                    </select>

                                </form>
                            </div> */}
                        </div>
                        <div className='bottom' style={{ gap: "20px" }}>
                            <button className="btn-black" onClick={cancel}>CANCEL</button>
                            <button /* onClick={update} */>CREATE</button>
                        </div>
                    </div>
                </div>

            </section>


            <section className='table-section'>

            </section>
        </main >
    )

}

function HouseDetail() {
    const navigate = useNavigate();
    const params = useParams();
    const [house, setHouse] = useState({ id: 0, address: "", city: "", name: "", numberOfRooms: 1 });
    const [tenants, setTenants] = useState([])
    const [editing, setEditing] = useState(false);
    useEffect(() => {


        if (facade.getToken() != undefined) {
            facade.getHouseById(params.houseid).then(data => setHouse(data));
            if (facade.decodeToken().roles.includes("admin")) {
                facade.getTenantsFromHouseById(params.houseid).then(data => setTenants(data));
            }
        } else {

        }

    }, [])

    function remove() {
        /*  facade.deleteBoat(boat.id);
         navigate("/");
         alert("Boat: " + boat.name + " is deleted") */
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
}


                    </main >
                    :

                    <UpdateDetails /* boat={boat} */ />
            }
        </>


    )

}
export default HouseDetail;