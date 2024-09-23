import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import Hotels from "./pages/Hotels";
import Hotel from "./pages/Hotel";
import MainMenu from "./components/MainMenu";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Flights from "./pages/Flights";
import PropertiesByType from "./pages/PropertiesByType";
//import FeaturedProperty from "./pages/FeaturedProperty";
//import HotelsByCity from "./pages/HotelsByCity";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/hotels' element={<Hotels />} />
          <Route path='/hotels/:id' element={<Hotel />} />
          <Route
            path='/properties-by-type/:type'
            element={<PropertiesByType />}
          />

          {/* <Route path='/hotels-by-city/:id' element={<HotelsByCity />} /> */}
          {/* <Route path='/featured-property/:id' element={<FeaturedProperty />} /> */}
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route path='/flights' element={<Flights />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
