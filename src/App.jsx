import { BrowserRouter, Routes, Route } from "react-router-dom";

import Header from "./components/Header";
import StartPage from "./components/pages/StartPage";
import LoginPage from "./components/pages/LoginPage";
import CreateUserPage from "./components/pages/CreateUserPage";
import EditUserPage from "./components/pages/EditUserPage";
import RulesPage from "./components/pages/RulesPage";
import CreditsPage from "./components/pages/CreditsPage";
import Home from "./components/Home";
import GameSettingsPage from "./components/pages/GameSettingsPage";
import JoinPage from "./components/pages/JoinPage";
import GamepinPage from "./components/pages/GamepinPage";
import Village from "./components/pages/Village";
import VoteResultPage from "./components/pages/VoteResultPage";

import NoMatch from "./components/NoMatch";
import Chat from "./components/Chat";
import Join from "./components/Join";
import CreateGame from "./components/CreateGame";
import { useState } from "react";
import "./styles/App.css";
import VotePage from "./components/pages/VotePage";
import EndedGamePage from "./components/pages/EndedGamePage";
import night from"./images/night.jpg"
import day from"./images/day.jpg"


export default function App() {
  const nightMode = {
    name: "night",
    image: night,
    blur: "rgba(16, 5, 30, 0.685)",
    topnavColor: "#4141414b",
    topnavLinkColor: "#d6ced9",
    /* TODO: add colors for font, navigation, btn, background-color */
  }

  const dayMode = {
    name: "day",
    image: day,
    blur: "rgba(16, 5, 30, 0.3)",
    topnavColor: "#e0dede4b",
    topnavLinkColor: "black",

    /* TODO: add colors for font, navigation, btn, background-color */
  }


  const [loggedIn, setLoggedIn] = useState(false);
  const [headline, setHeadline] = useState("");
  const [mode, setMode] = useState(nightMode);

  const [voteresult, setVoteresult] = useState({});


  function changeMode(m) {
    if(m.name == "night") {
      setMode(dayMode);
      console.log("day")
    }
    else {
      setMode(nightMode);
      console.log("night")
    }
  }

  return (
    <div>
      <BrowserRouter>
        <Header mode={mode} loggedIn={loggedIn} headline={headline} />
        <Routes>
          <Route path="/" element={<StartPage mode={mode} />}></Route>

          {/* TODO: make frontend */}
          <Route path="/login" element={<LoginPage loggedIn={loggedIn} setLoggedIn={setLoggedIn} />} />
          <Route path="/create_user" element={<CreateUserPage />}></Route>
          <Route path="/edit_user" element={<EditUserPage />}></Route>
          <Route path="/rules" element={<RulesPage setHeadline={setHeadline} />}></Route>
          <Route path="/credits" element={<CreditsPage />}></Route>

          {/* Logged as user links */}
          <Route path="/home" element={<Home setHeadline={setHeadline} mode={mode} />}></Route>
          <Route path="/game_settings" element={<GameSettingsPage mode={mode} setHeadline={setHeadline} />}></Route>
          <Route path="/join_game/:roomId" element={<JoinPage mode={mode} />}></Route>
          <Route path="/gamepin" element={<GamepinPage mode={mode} />}></Route>

          {/* Playing game links */}
          <Route path="/game/:roomid/village" element={<Village mode={mode} />}></Route>
          <Route path="/game/:roomid/vote" element={<VotePage mode={mode} />}></Route>
          <Route path="/game/:roomid/voteresult" element={<VoteResultPage mode={mode} changeMode={changeMode} />}></Route>

          {/* TODO: just showing a result from voteresult, change to get the actual winners with a fetch function */}
          <Route path="/game/ending" element={<EndedGamePage mode={mode} winners={voteresult} />}></Route>


          <Route path="chat/:roomId" element={<Chat loggedIn={loggedIn} />} />
          <Route path="create" element={<CreateGame />} />
          <Route path="join" element={<Join />} />
          <Route path="*" element={<NoMatch />} />
        </Routes>
      </BrowserRouter>,
    </div>

  );
}
