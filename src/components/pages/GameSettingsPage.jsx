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
  const [user, setUser] = useState({});
  const [data, setData] = useState({ name: "", room: "", gameid: "", werewolves: "", hunter: false});
  const [game, setGame] = useState({});

  const handleChange = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
    
  };

  const handleChecked = (e) => {
    setData({
      ...data,
      [e.target.name]: (!data.hunter),
    });
    
  };

  const validation = () => {
    // if (!data.room) {
    //     setError("Please enter pin code.")
    //     return false
    // }
    setError("");
    return true;
  };

  useEffect(() => {
    if (data.gameid != "") {
      navigate(`/join_game/${data.room}`, { state: data });
    }
    if(facade.getToken() == undefined) {
      navigate("/login")
    }
  }, [data])

  const handleSubmit = (e) => {
    e.preventDefault();
    const isValid = validation();
    if (isValid) {
      const host = facade.decodeToken().username;
      facade.createGame(host, data.room).then((fetchdata) => {
        setGame(fetchdata)
        setData({...data, name: host, gameid: fetchdata.id });
        console.log(fetchdata);
        facade.createPlayer(fetchdata.id, {userName: fetchdata.hostName}).then(data => facade.setPlayerHost(fetchdata.id, data))
        console.log("werwolves "+data.werewolves);
        console.log("hunters "+data.hunter);
      });
    }
  };


  const generatePin = (e) => {
    e.preventDefault();
    const newPin = Math.floor(100000 + Math.random() * 900000)
      .toString()
      .substring(1);
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
                  <input type="text" name="werewolves" placeholder="Amount of werewolves" value={data.werewolves} onChange={handleChange}/>
                  <label >Hunter?</label>
                  <input type="checkbox" name="hunter" id="hunter"  value={data.hunter} onChange={handleChecked}/>
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
