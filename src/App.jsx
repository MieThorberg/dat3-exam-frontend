import { BrowserRouter, Routes, Route } from "react-router-dom";


import "./styles/App.css";

import Header from "./components/Header";
import Footer from "./components/Footer";

import HomePage from "./components/pages/HomePage";
import LoginPage from "./components/pages/LoginPage";

import NotFoundPage from "./components/errors/NotFoundPage";
import RentalsPage from "./components/pages/RentalsPage";
import DataPage from "./components/pages/DataPage";
import HousesPage from "./components/pages/HousesPage";
import HouseDetailPage from "./components/pages/HouseDetailPage";
import RentalDetailPage from "./components/pages/RentalDetailPage";
import MyRentalsPage from "./components/pages/MyRentalsPage";


export default function App() {

  return (
    <div>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<HomePage />}></Route>
          <Route path="/login" element={<LoginPage />}></Route>

          {/* Admin */}
          <Route path="/rentals" element={<RentalsPage />}></Route>
          <Route path="/rentals/:rentalid" element={<RentalDetailPage/>}></Route>
          <Route path="/houses" element={<HousesPage/>}></Route>
          <Route path="/houses/:houseid" element={<HouseDetailPage/>}></Route>
          <Route path="/data" element={<DataPage/>}></Route>
          

          {/* User */}
          <Route path="/my_rentals" element={<MyRentalsPage />}></Route>
          <Route path="/my_rentals/:houseid" element={<HouseDetailPage/>}></Route>
          <Route path="/*" element={<NotFoundPage />}></Route>
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>

  );
}
