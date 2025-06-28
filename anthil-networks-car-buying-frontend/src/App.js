import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import CarDetailPage from "./pages/CarDetailPage";
import AdminPage from "./pages/AdminPage";
import Navbar from "./components/Navbar";
import UserRequests from "./components/UserRequests";
import UserBookings from "./components/UserBookings";
import AdminBookings from "./components/AdminBookings";
import './styles/App.css';

const App = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/car/:id" element={<CarDetailPage />} />
        <Route path="/admin" element={<AdminPage />} />
        <Route path="/my-requests" element={<UserRequests />} />
        <Route path="/my-bookings" element={<UserBookings />} />
        <Route path="/admin-bookings" element={<AdminBookings />} />
      </Routes>
    </Router>
  );
};

export default App;