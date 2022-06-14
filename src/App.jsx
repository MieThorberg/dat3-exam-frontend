import { BrowserRouter, Routes, Route } from "react-router-dom";


import "./styles/App.css";

import Header from "./components/Header";
import Footer from "./components/Footer";

import HomePage from "./components/pages/HomePage";
import LoginPage from "./components/pages/LoginPage";

import CreatePage from "./components/pages/CreatePage";
import ListPage from "./components/pages/ListPage";
import CardsPage from "./components/pages/CardsPage";
import Details from "./components/pages/Details"

import NotFoundPage from "./components/errors/NotFoundPage";
import RentalsPage from "./components/pages/RentalsPage";


export default function App() {

  return (
    <div>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<HomePage />}></Route>
          <Route path="/login" element={<LoginPage />}></Route>
          <Route path="/rentals" element={<RentalsPage />}></Route>
          <Route path="/my_rentals" element={<RentalsPage/>}></Route>
          <Route path="/*" element={<NotFoundPage />}></Route>
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>

  );
}
