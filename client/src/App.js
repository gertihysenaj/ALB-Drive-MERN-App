import React from 'react';
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
import LanguageSwitcher from './components/LanguageSwitcher';
import Banner from './components/Banner';
import './dist/styles.css';
import i18n from 'i18next';

function App() {
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);
  const [user, setUser] = React.useState(null);

  React.useEffect(() => {
    const checkUserStatus = async () => {
      try {
        const res = await axios.get('http://localhost:8000/api/verify', {
          withCredentials: true
        });
        if (res.status === 200) {
          setIsLoggedIn(true);
          setUser(res.data.user);
        }
      } catch (err) {
        console.error(err);
      }
    };

    checkUserStatus();
  }, []);

  const handleLogout = async () => {
    try {
      const res = await axios.post(
        'http://localhost:8000/api/logout',
        {},
        { withCredentials: true }
      );

      if (res.status === 200) {
        setIsLoggedIn(false);
        setUser(null);
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <BrowserRouter>
      <LanguageSwitcher />
      <Navbar
        isLoggedIn={isLoggedIn}
        user={user}
        handleLogout={handleLogout}
        setIsLoggedIn={setIsLoggedIn}
        setUser={setUser}
      />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="about" element={<About />} />
        <Route path="models" element={<Models />} />
        <Route
          path="/create-car"
          element={user && user.isAdmin ? <CarForm /> : <Navigate to="/login" />}
        />
        <Route
          path="/edit-car/:id"
          element={user && user.isAdmin ? <EditCar /> : <Navigate to="/login" />}
        />
        <Route path="/book/:carID" element={<BookCarPage />} />
        <Route path="testimonials" element={<TestimonialsPage />} />
        <Route path="team" element={<Team />} />
        <Route path="contact" element={<Contact />} />
        <Route
          path="login"
          element={<Login setIsLoggedIn={setIsLoggedIn} setUser={setUser} />}
        />
        <Route path="register" element={<Register />} />
        {/* Add the route for the Banner component */}
        <Route path="banner" element={<Banner />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;


