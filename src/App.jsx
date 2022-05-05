import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import NoMatch from "./components/NoMatch";
import LoginPage from "./components/LoginPage";
import Chat from "./components/Chat";
import Join from "./components/Join";
import CreateGame from "./components/CreateGame";
import { useState } from "react";
import Header from "./components/Header";

export default function App() {


  const [loggedIn, setLoggedIn] = useState(false);

  return (
    <div>
      <BrowserRouter>
      <Header loggedIn={loggedIn}/>
    <Routes>
        <Route path="/" element={<Home/>}>
        </Route>
        <Route path="chat/:roomId" element={<Chat loggedIn={loggedIn}/>}/>
        <Route path="create" element={<CreateGame/>}/>
        <Route path="join" element={<Join/>}/>
        <Route path="login" element={<LoginPage loggedIn={loggedIn} setLoggedIn={setLoggedIn}/>} />
        <Route path="*" element={<NoMatch/>} />
    </Routes>
  </BrowserRouter>,
    </div>
    
  );
}
