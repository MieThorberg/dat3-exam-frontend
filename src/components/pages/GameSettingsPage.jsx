import React from "react";
import "../../styles/App.css";
import { useState, useEffect } from "react";
import { useNavigate, NavLink } from "react-router-dom";
import facade from "../../apiFacade";

const GameSettingsPage = ({ mode, setHeadline }) => {
  //title i topnav
  useEffect(() => {
    setHeadline("Game settings");
  }, []);

  let navigate = useNavigate();

  const [error, setError] = useState("");
  const [data, setData] = useState({ name: "", room: "", gameid: "" });
  const [pin, setPin] = useState("");
  const [game, setGame] = useState({});

  const handleChange = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  };

  const validation = () => {
    if (!data.name) {
      setError("Please enter your name.");
      return false;
    }
    // if (!data.room) {
    //     setError("Please enter pin code.")
    //     return false
    // }
    setError("");
    return true;
  };

  useEffect(() => {
    if (data.gameid != ""){
      console.log(data.gameid);
      console.log(data);
      navigate(`/join_game/${data.room}`, { state: data });
      }
  },[data])

  const handleSubmit = (e) => {
    e.preventDefault();
    const isValid = validation();
    console.log(data.room);
    if (isValid) {
      facade.createGame("user", data.room).then((fetchdata) => {
        setGame(fetchdata)
        setData({ ...data, gameid: fetchdata.id });
      });
     
    }
  };

  

  const generatePin = (e) => {
    e.preventDefault();
    const newPin = Math.floor(100000 + Math.random() * 900000)
      .toString()
      .substring(1);
    // setPin(newPin)
    return setData({ ...data, room: newPin });
  };
  return (
    <>
      <div className="background-container">
        <div
          id="background-img"
          style={{ backgroundImage: `url(${mode.image})` }}
        ></div>
        <div
          id="background-img-blur"
          style={{ backgroundColor: `${mode.blur}` }}
        ></div>
      </div>

      <div className="main">
        <div className="main-container">
          <div style={{ gridTemplateRows: "auto" }}></div>
          <div className="section" style={{ gridTemplateRows: "auto 90%" }}>
            <div
              className="header"
              style={{ justifyContent: "end", paddingBottom: "20px" }}
            >
              <h1>Game settings</h1>
            </div>
            <div
              className="content"
              style={{ justifyContent: "start", gridTemplateRows: "100%" }}
            >
              <form >
                <div>
                  <input
                    type="text"
                    name="name"
                    placeholder="Game name"
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <input
                    readOnly
                    type="text"
                    name="room"
                    placeholder="Generate pin"
                    value={data.room}
                    onChange={handleChange}
                  />
                  
                  <button onClick={generatePin}>Generate pin</button>
                </div>
                <button onClick={handleSubmit}>Enter</button>
                {/* If you dont have type in values for the inputs */}
                {error ? <small>{error}</small> : ""}
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default GameSettingsPage;
