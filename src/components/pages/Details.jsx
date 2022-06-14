import React from 'react';
import { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";
import "../../styles/ListPage.css";
import "../../styles/Element.css";
import "../../styles/Data.css";
import facade from '../../apiFacade';
import { useNavigate } from 'react-router-dom';

function UpdateDetails(/* { boat } */) {

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

function Details() {
   /*  const navigate = useNavigate();
    const params = useParams();
    const [boat, setBoat] = useState({ id: "", brand: "", make: "", name: "", image: "", owners: [], harbour: {} }); */
    const [editing, setEditing] = useState(false);
    useEffect(() => {
        /* facade.getBoatById(params.boatId).then(data => setBoat(data)) */;
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
                                <h2>Title</h2>
                                <p>### details</p>
                            </div>
                        </header>

                       {/*  <section className='table-section'>
                            <table>
                                <tbody>
                                    <tr>
                                        <th><p className='bold'>ID</p></th>
                                        <th><p className='bold'>Title</p></th>
                                        <th><p className='bold'>Title</p></th>
                                        <th><p className='bold'>Title</p></th>
                                        <th><p className='bold'>Title</p></th>
                                        <th></th>
                                    </tr>
                                    <tr>
                                        <td><p>{boat.id}</p></td>
                                        <td><p>{boat.name}</p></td>
                                        <td><p>{boat.brand}</p></td>
                                        <td><p>{boat.make}</p></td>
                                        <td><p>{boat.image}</p></td>
                                        <td className='btn-columns'>
                                            <button onClick={edit} className='btn-black'>Edit</button>
                                            <button onClick={remove} className='btn-red'>Remove</button>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </section> */}


                        {/* <section className='table-section'>
                            <p className='right'>Size: {boat.owners.length}</p>
                            <table>
                                <tbody>
                                    <tr>
                                        <th><p className='bold'>Owner ID</p></th>
                                        <th><p className='bold'>Name</p></th>
                                        <th><p className='bold'>Address</p></th>
                                        <th><p className='bold'>Phone</p></th>
                                    </tr>

                                    {boat.owners.map((element) => {
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
                        </section> */}
                    </main >
                    :

                    <UpdateDetails /* boat={boat} */ />
            }
        </>


    )

}
export default Details;