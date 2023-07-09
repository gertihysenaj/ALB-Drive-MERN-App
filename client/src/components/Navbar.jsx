import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';
import { useState, useEffect } from "react";
import Logo from "../images/logo/logo.png";
import LanguageSwitcher from './LanguageSwitcher';

function Navbar({ isLoggedIn, user, setIsLoggedIn, setUser, isAdmin, handleLogout }) {
  const [nav, setNav] = useState(false);
  const navigate = useNavigate();
  const [showDropdown, setShowDropdown] = useState(false);

  const openNav = () => {
    setNav(!nav);
  };

  const onLogoutClick = () => {
    handleLogout(() => navigate('/login'));
  };

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  return (
    <>
      <nav>
        {/* mobile */}
        <div className={`mobile-navbar ${nav ? "open-nav" : ""}`}>
          <div onClick={openNav} className="mobile-navbar__close">
            <i className="fa-solid fa-xmark"></i>
          </div>
          <ul className="mobile-navbar__links">
            <li>
              <Link onClick={openNav} to="/">
                Home
              </Link>
            </li>
            <li>
              <Link onClick={openNav} to="/about">
                About
              </Link>
            </li>
            <li>
              <Link onClick={openNav} to="/models">
                Models
              </Link>
            </li>
            <li>
              <Link onClick={openNav} to="/testimonials">
                Testimonials
              </Link>
            </li>
            <li>
              <Link onClick={openNav} to="/team">
                Our Team
              </Link>
            </li>
            <li>
              <Link onClick={openNav} to="/contact">
                Contact
              </Link>
            </li>
            {isLoggedIn && user ? (
              <div className="dropdown">
                <button onClick={toggleDropdown} className="dropdown-button">Profile</button>
                {showDropdown && (
                  <div className="dropdown-content">
                    <div>
                      <span>Logged in as </span>
                      <span>
                        {user.firstName} {user.lastName}
                        {isAdmin && <span>(Admin)</span>}
                      </span>
                    </div>
                    <Link onClick={onLogoutClick} className="logout">
                      Logout
                    </Link>
                  </div>
                )}
              </div>
            ) : (
              <>
                <li>
                  <Link onClick={openNav} to="/login">
                    Sign In
                  </Link>
                </li>
                <li>
                  <Link onClick={openNav} to="/register">
                    Register
                  </Link>
                </li>
              </>
            )}
          </ul>

        </div>

        {/* desktop */}

        <div className="navbar">
          <div className="navbar__img">
            <Link to="/" onClick={() => window.scrollTo(0, 0)}>
              <img src={Logo} alt="logo-img" />
            </Link>
          </div>
          <ul className="navbar__links">
            <li>
              <Link className="home-link" to="/">
                Home
              </Link>
            </li>
            <li>
              {" "}
              <Link className="about-link" to="/about">
                About
              </Link>
            </li>
            <li>
              {" "}
              <Link className="models-link" to="/models">
                Vehicle Models
              </Link>
            </li>
            <li>
              {" "}
              <Link className="testi-link" to="/testimonials">
                Testimonials
              </Link>
            </li>
            <li>
              {" "}
              <Link className="team-link" to="/team">
                Our Team
              </Link>
            </li>
            <li>
              {" "}
              <Link className="contact-link" to="/contact">
                Contact
              </Link>
            </li>
          </ul>
          <div className="navbar__buttons">

            {isLoggedIn && user ? (
              <div className="dropdown">
                <button onClick={toggleDropdown} className="dropdown-button">Profile</button>
                {showDropdown && (
                  <div className="dropdown-content">
                    <div>
                      <span>Logged in as </span>
                      <span>
                        {user.firstName} {user.lastName}
                        {isAdmin && <span>(Admin)</span>}
                      </span>
                    </div>
                    <Link onClick={onLogoutClick} className="logout">
                      Logout
                    </Link>
                  </div>
                )}
              </div>
            ) : (
              <>
                <Link className="navbar__buttons__sign-in" to="/login">
                  Sign In
                </Link>
                <Link className="navbar__buttons__register" to="/register">
                  Register
                </Link>
                <LanguageSwitcher />
              </>
            )}
          </div>

          {/* mobile */}
          <div className="mobile-hamb" onClick={openNav}>
            <i className="fa-solid fa-bars"></i>
          </div>
        </div>
      </nav>
    </>
  );
}

export default Navbar;
