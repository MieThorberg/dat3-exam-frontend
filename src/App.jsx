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

import NoMatch from "./components/NoMatch";
import Chat from "./components/Chat";
import Join from "./components/Join";
import CreateGame from "./components/CreateGame";
import { useState } from "react";


export default function App() {
  const nightMode = {
    image: "src\images\night.jpg"
    /* TODO: add colors for font, navigation, btn, background-color */
  }
  
  const dayMode = {
    image: "src/images/day.jpg"
    /* TODO: add colors for font, navigation, btn, background-color */
  }

  const [loggedIn, setLoggedIn] = useState(false);
  const [headline, setHeadline] = useState("");
  const [mode, setMode] = useState(nightMode);

  return (
    <div>
      <BrowserRouter>
        <Header loggedIn={loggedIn} headline={headline} />
        <Routes>
          <Route path="/" element={<StartPage mode={nightMode}/>}></Route>

          {/* TODO: make frontend */}
          <Route path="/login" element={<LoginPage loggedIn={loggedIn} setLoggedIn={setLoggedIn} />} />
          <Route path="/create_user" element={<CreateUserPage />}></Route>
          <Route path="/edit_user" element={<EditUserPage />}></Route>
          <Route path="/rules" element={<RulesPage setHeadline={setHeadline} />}></Route>
          <Route path="/credits" element={<CreditsPage />}></Route>

          {/* Logged as user links */}
          <Route path="/home" element={<Home setHeadline={setHeadline} mode={nightMode}/>}></Route>
          <Route path="/game_settings" element={<GameSettingsPage setHeadline={setHeadline} />}></Route>
          <Route path="/join_game/:roomId" element={<JoinPage />}></Route>
          <Route path="/gamepin" element={<GamepinPage />}></Route>

          {/* Playing game links */}
          <Route path="/village" element={<Village />}></Route>

          <Route path="chat/:roomId" element={<Chat loggedIn={loggedIn} />} />
          <Route path="create" element={<CreateGame />} />
          <Route path="join" element={<Join />} />
          <Route path="*" element={<NoMatch />} />
        </Routes>
      </BrowserRouter>,
    </div>

  );
}
