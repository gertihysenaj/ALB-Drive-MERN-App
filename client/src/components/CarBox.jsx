import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";


function CarBox({ carID }) {
  const [carLoad, setCarLoad] = useState(true);
  const [car, setCar] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchCar(carID);
  }, [carID]);

  const fetchCar = (id) => {
    axios.get(`http://localhost:8000/api/cars/${id}`, { withCredentials: true })
      .then(res => {
        setCar(res.data.data);
        setCarLoad(false);
      })
      .catch(err => console.error(err));
  };


  return (
    <>
      {carLoad ? <div>Loading...</div> :
        <div className="box-cars" >
          {/* car */}
          <div className="pick-car">
            <img
              src={`http://localhost:8000/${car.img.replace('\\', '/')}`}
              alt="car_img"
            />
          </div>
          {/* description */}
          <div className="pick-description">
            <div className="pick-description__price">
              <span>${car.price}</span>/ qeraja ne dite
            </div>
            <div className="pick-description__table">
              <div className="pick-description__table__col">
                <span>Model</span>
                <span>{car.model}</span>
              </div>

              <div className="pick-description__table__col">
                <span>Mark</span>
                <span>{car.mark}</span>
              </div>

              <div className="pick-description__table__col">
                <span>Year</span>
                <span>{car.year}</span>
              </div>

              <div className="pick-description__table__col">
                <span>Doors</span>
                <span>{car.doors}</span>
              </div>

              <div className="pick-description__table__col">
                <span>AC</span>
                <span>{car.air ? "Yes" : "No"}</span>
              </div>

              <div className="pick-description__table__col">
                <span>Transmission</span>
                <span>{car.transmission}</span>
              </div>

              <div className="pick-description__table__col">
                <span>Fuel</span>
                <span>{car.fuel}</span>
              </div>
            </div>
            {/* btn cta */}
            <button className="cta-btn" onClick={() => navigate('/book/' + car._id)}>
                Reserve a Car
              </button>
          </div>
        </div>
      }
    </>
  );
}

export default CarBox;



