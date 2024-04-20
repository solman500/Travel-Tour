import React from "react";
import Home from "../pages/Home";
import Tours from "../pages/Tours";
import TourDetails from "../pages/TourDetails";
import SearchResultList from "../pages/SearchResultList";
import Register from "../pages/Register";
import Login from "../pages/Login";
import{Routes,Route, Navigate} from 'react-router-dom'
import ThankYou from "../pages/ThankYou";


const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to='/home' />} />
      <Route path="/home" element={<Home/>} />
      <Route path="/tours" element={<Tours/>} />
      <Route path="/tours/:id" element={<TourDetails />} />
      <Route path="/register" element={<Register/>} />
      <Route path="/login" element={<Login/>} />
      <Route path="/thank-you" element={<ThankYou/>}/>
      <Route path="/tours/search" element={<SearchResultList />} />
    </Routes>
  );
};

export default Router;
