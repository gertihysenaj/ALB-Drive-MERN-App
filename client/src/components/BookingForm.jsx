import { useState, useEffect } from "react";
import { useLocation, useNavigate } from 'react-router-dom';

const BookingForm = ({
  pickUp,
  dropOff,
  pickTime,
  dropTime,
  setCarType,
  setPickUp,
  setDropOff,
  setPickTime,
  setDropTime,
  openModal,
}) => {

  const location = useLocation();
  const car = location.state ? location.state.car : null;
  const navigate = useNavigate();

  useEffect(() => {
    if (car) {
      setCarType(car); // set the entire car object
    }
  }, [car, setCarType]);

  const handlePickUpChange = (e) => {
    setPickUp(e.target.value);
  };

  const handleDropOffChange = (e) => {
    setDropOff(e.target.value);
  };

  const handlePickTimeChange = (e) => {
    setPickTime(e.target.value);
  };

  const handleDropTimeChange = (e) => {
    setDropTime(e.target.value);
  };

  return (
    <form className="box-form">
      <div className="box-form__car-type">
        <label>
          <i className="fa-solid fa-car"></i> &nbsp; You have selected <b>*</b>
        </label>
        {car ?
          <>
            <div>{car.mark} {car.model}</div>
            <img src={`http://localhost:8000/${(car.img ?? '').replace('\\', '/')}`} alt={car.model} />
            <button onClick={() => navigate('/models')}>
              Select another car
            </button>
          </>
          :
          <div>No car selected</div>
        }
      </div>

      <div className="box-form__car-type">
        <label>
          <i className="fa-solid fa-location-dot"></i> &nbsp; Pick-up <b>*</b>
        </label>
        <select value={pickUp} onChange={handlePickUpChange}>
          <option>Select pick up location</option>
          <option>Tirane</option>
          <option>Durres</option>
          <option>Vlore</option>
          <option>Kukes</option>
          <option>Elbasan</option>
        </select>
      </div>

      <div className="box-form__car-type">
        <label>
          <i className="fa-solid fa-location-dot"></i> &nbsp; Drop-off <b>*</b>
        </label>
        <select value={dropOff} onChange={handleDropOffChange}>
          <option>Select drop off location</option>
          <option>Tirane</option>
          <option>Durres</option>
          <option>Vlore</option>
          <option>Kukes</option>
          <option>Elbasan</option>
        </select>
      </div>

      <div className="box-form__car-time">
        <label htmlFor="picktime">
          <i className="fa-regular fa-calendar-days "></i> &nbsp; Pick-up <b>*</b>
        </label>
        <input
          id="picktime"
          value={pickTime}
          onChange={handlePickTimeChange}
          type="date"
        ></input>
      </div>

      <div className="box-form__car-time">
        <label htmlFor="droptime">
          <i className="fa-regular fa-calendar-days "></i> &nbsp; Drop-off <b>*</b>
        </label>
        <input
          id="droptime"
          value={dropTime}
          onChange={handleDropTimeChange}
          type="date"
        ></input>
      </div>

      <button onClick={openModal} type="submit">
        Vazhdo me reservimin
      </button>
    </form>
  );
};

export default BookingForm;
