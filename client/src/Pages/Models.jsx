import Footer from "../components/Footer";
import HeroPages from "../components/HeroPages";
import { Link } from "react-router-dom";
import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function Models({ isAdmin }) {
  const [cars, setCars] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get('http://localhost:8000/api/cars', { withCredentials: true })
      .then((res) => {
        setCars(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  function handleEdit(id) {
    navigate(`/edit-car/${id}`);
  }

  function handleDelete(id) {
    const confirmDelete = window.confirm("Are you sure you want to delete this car?");

    if (confirmDelete) {
      axios
        .delete(`http://localhost:8000/api/cars/${id}`, { withCredentials: true })
        .then(res => {
          setCars(cars.filter(car => car._id !== id));
        });
    }
  }

  return (
    <>
      <section className="models-section">
        <HeroPages name="Vehicle Models" />
        {isAdmin && <Link to="/create-car" className="add-car-button">Add a car</Link>}
        <div className="container">
          <div className="models-div">

            {cars.map((car, index) => (

              <div key={index} className="models-div__box">
                <div className="models-div__box__img">
                  <img src={`http://localhost:8000/${car.img.replace('\\', '/')}`} alt="car_img" />
                  <div className="models-div__box__descr">
                    <div className="models-div__box__descr__name-price">
                      <div className="models-div__box__descr__name-price__name">
                        <p>{car.name}</p>
                        <span>
                          {Array(car.rating).fill().map((_, i) => (
                            <i key={i} className="fa-solid fa-star"></i>
                          ))}
                        </span>
                      </div>
                      <div className="models-div__box__descr__name-price__price">
                        <h4>${car.price}</h4>
                        <p>ne dite</p>
                      </div>
                    </div>
                    <div className="models-div__box__descr__name-price__details">
                      <span>
                        <i className="fa-solid fa-car-side"></i> &nbsp; {car.mark}
                      </span>
                      <span style={{ textAlign: "right" }}>
                        {car.doors} &nbsp; <i className="fa-solid fa-car-side"></i>
                      </span>
                      <span>
                        <i className="fa-solid fa-car-side"></i> &nbsp; {car.transmission}
                      </span>
                      <span style={{ textAlign: "right" }}>
                        {car.fuel} &nbsp; <i className="fa-solid fa-car-side"></i>
                      </span>
                    </div>
                    <div className="models-div__box__descr__name-price__btn">
                      <Link to={`/book/${car._id}`} onClick={() => navigate(`/book/${car._id}`)}>
                        Reservo mjetin
                      </Link>
                    </div>
                  </div>
                </div>
                {isAdmin && (
                <>
                  <button onClick={() => handleEdit(car._id)}>Edit</button>
                  <button onClick={() => handleDelete(car._id)}>Delete</button>
                </>
              )}
              </div>
            ))}
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
}

export default Models;


