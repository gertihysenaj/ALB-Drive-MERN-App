import React from 'react';
import { useState, useEffect } from 'react';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import axios from 'axios';
import Navbar from './components/Navbar';
import Home from './Pages/Home';
import About from './Pages/About';
import Models from './Pages/Models';
import TestimonialsPage from './Pages/TestimonialsPage';
import Team from './Pages/Team';
import Contact from './Pages/Contact';
import Login from './Pages/Login';
import Register from './Pages/Register';
import CarForm from './Pages/CarForm';
import EditCar from './Pages/EditCar';
import BookCarPage from './Pages/BookCarPage';
import UserBookingsPage from './Pages/UserBookingsPage.jsx';
import AdminBookingsPage from './Pages/AdminBookingsPage.jsx';
import LanguageSwitcher from './components/LanguageSwitcher';
import Banner from './components/Banner';
import './dist/styles.css';
import i18n from 'i18next';


axios.defaults.withCredentials = true;




function AdminRoute({children, isAdmin}) {
  return isAdmin ? children : <Navigate to="/login" replace />
}

function UserRoute({ children, isLoggedIn }) {
  return isLoggedIn ? children : <Navigate to="/login" replace />
}


function App() {
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);
  const [user, setUser] = React.useState(null);
  const [isAdmin, setIsAdmin] = React.useState(false);
  const [loading, setLoading] = React.useState(true); 


    const checkUserStatus = async () => {
      try {
        const res = await axios.get('http://localhost:8000/api/verify', {withCredentials: true});
  
        if (res.status === 200 && res.data.isLoggedIn) {
          setIsLoggedIn(true);
          setIsAdmin(res.data.isAdmin);
          setUser(res.data.user);
        }
        setLoading(false);
      } catch (err) {
        console.error(err);
        setLoading(false);
      }
    };

    useEffect(() => {
      checkUserStatus();
    }, []);

  const handleLogout = async (onLogout) => {
    try {
      const res = await axios.post('http://localhost:8000/api/logout', {}, { withCredentials: true });

      if (res.status === 200) {
        setIsLoggedIn(false);
        setIsAdmin(false);
        setUser(null);
        onLogout();
      }
    } catch (err) {
      console.error(err);
    }
  };



  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <BrowserRouter>
      <Navbar isLoggedIn={isLoggedIn} user={user} isAdmin={isAdmin} handleLogout={handleLogout} setIsLoggedIn={setIsLoggedIn} setUser={setUser} setIsAdmin={setIsAdmin}  />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="about" element={<About />} />
        <Route path="models" element={<Models isAdmin={isAdmin} />} />
        <Route path="/create-car" element={<AdminRoute isAdmin={isAdmin}><CarForm /></AdminRoute>} />
        <Route path="/edit-car/:id" element={<AdminRoute isAdmin={isAdmin}><EditCar /></AdminRoute>} />
        <Route path="/book/:carID" element={<BookCarPage />} />
        <Route path="/user-bookings" element={<UserRoute isLoggedIn={isLoggedIn}><UserBookingsPage user={user} /></UserRoute>} />
        <Route path="/admin-bookings" element={<AdminRoute isAdmin={isAdmin}><AdminBookingsPage isAdmin={isAdmin}/></AdminRoute>} />
        <Route path="testimonials" element={<TestimonialsPage />} />
        <Route path="team" element={<Team />} />
        <Route path="contact" element={<Contact />} />
        <Route path="login" element={<Login setIsLoggedIn={setIsLoggedIn} setUser={setUser} checkUserStatus={checkUserStatus}/>} />
        <Route path="register" element={<Register />} />
        <Route path="banner" element={<Banner />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
