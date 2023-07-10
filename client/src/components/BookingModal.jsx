import React from "react";


const BookingModal = ({
  carType,
  car,
  pickUp,
  dropOff,
  pickTime,
  dropTime,
  img,
  user,
  name,
  setName,
  lastName,
  setLastName,
  phone,
  setPhone,
  age,
  setAge,
  email,
  setEmail,
  address,
  setAddress,
  city,
  setCity,
  zipcode,
  setZipCode,
  confirmBooking,
  modal,
  openModal
}) => {

  const handlePhone = (e) => {
    setPhone(e.target.value);
  };

  const handleAge = (e) => {
    setAge(e.target.value);
  };


  const handleAddress = (e) => {
    setAddress(e.target.value);
  };

  const handleCity = (e) => {
    setCity(e.target.value);
  };

  const handleZip = (e) => {
    setZipCode(e.target.value);
  };

  const imgUrl = car ? `http://localhost:8000/${car.img.replace('\\', '/')}` : '';

//   console.log(imgUrl);

  return (
    <div className={`booking-modal ${modal ? "active-modal" : ""}`}>
      <div className="booking-modal__title">
        <h2>Complete Reservation</h2>
        <i onClick={openModal} className="fa-solid fa-xmark"></i>
      </div>
      <div className="booking-modal__message">
        <h4>
          <i className="fa-solid fa-circle-info"></i> Upon completing this reservation enquiry, you will receive:
        </h4>
        <p>Your rental voucher to produce on arrival at the rental desk and a toll-free customer support number.</p>
      </div>

      <div className="booking-modal__car-info">
      <div className="dates-div">
            <div className="booking-modal__car-info__dates">
              <h5>Location & Date</h5>
              <span>
                <i className="fa-solid fa-location-dot"></i>
                <div>
                  <h6>Pick-Up Date & Time</h6>
                  <p>
                    {pickTime} /{" "}
                    <input type="time" className="input-time"></input>
                  </p>
                </div>
              </span>
            </div>

            <div className="booking-modal__car-info__dates">
              <span>
                <i className="fa-solid fa-location-dot"></i>
                <div>
                  <h6>Drop-Off Date & Time</h6>
                  <p>
                    {dropTime} /{" "}
                    <input type="time" className="input-time"></input>
                  </p>
                </div>
              </span>
            </div>

            <div className="booking-modal__car-info__dates">
              <span>
                <i className="fa-solid fa-calendar-days"></i>
                <div>
                  <h6>Pick-Up Location</h6>
                  <p>{pickUp}</p>
                </div>
              </span>
            </div>

            <div className="booking-modal__car-info__dates">
              <span>
                <i className="fa-solid fa-calendar-days"></i>
                <div>
                  <h6>Drop-Off Location</h6>
                  <p>{dropOff}</p>
                </div>
              </span>
            </div>
          </div>
          <div className="booking-modal__car-info__model">
                <h5>
                <span>Car -</span> {`${car?.mark} ${car?.model}`}

                </h5>
                {car && <img src={`http://localhost:8000/${(car.img ?? '').replace('\\', '/')}`} alt="car_img" />}

            </div>
      </div>

      <div className="booking-modal__person-info">
        <h4>Personal Information</h4>
        <form className="info-form">
        <div className="info-form__2col">
              <span>
                <label>
                  First Name <b>*</b>
                </label>
                <input
                  value={name}
                  readOnly
                  type="text"
                ></input>
              </span>

              <span>
                <label>
                  Last Name <b>*</b>
                </label>
                <input
                  value={lastName}
                  readOnly
                  type="text"
                ></input>
              </span>

              <span>
                <label>
                  Phone Number <b>*</b>
                </label>
                <input
                  value={phone}
                  onChange={handlePhone}
                  type="tel"
                  placeholder="Enter your phone number"
                ></input>
                <p className="error-modal">This field is required.</p>
              </span>

              <span>
                <label>
                  Age <b>*</b>
                </label>
                <input
                  value={age}
                  onChange={handleAge}
                  type="number"
                  placeholder="18+"
                ></input>
                <p className="error-modal ">This field is required.</p>
              </span>
            </div>

            <div className="info-form__1col">
              <span>
                <label>
                  Email <b>*</b>
                </label>
                <input
                  value={email}
                  readOnly
                  type="email"
                ></input>
              </span>

              <span>
                <label>
                  Address <b>*</b>
                </label>
                <input
                  value={address}
                  onChange={handleAddress}
                  type="text"
                  placeholder="Enter your street address"
                ></input>
                <p className="error-modal ">This field is required.</p>
              </span>
            </div>

            <div className="info-form__2col">
              <span>
                <label>
                  City <b>*</b>
                </label>
                <input
                  value={city}
                  onChange={handleCity}
                  type="text"
                  placeholder="Enter your city"
                ></input>
                <p className="error-modal">This field is required.</p>
              </span>

              <span>
                <label>
                  Zip Code <b>*</b>
                </label>
                <input
                  value={zipcode}
                  onChange={handleZip}
                  type="text"
                  placeholder="Enter your zip code"
                ></input>
                <p className="error-modal ">This field is required.</p>
              </span>
            </div>
        </form>
      </div>
      <span className="info-form__checkbox">
              <input type="checkbox"></input>
              <p>Please send me latest news and updates</p>
            </span>


      <div className="reserve-button">
        <button onClick={confirmBooking}>Reserve Now</button>
      </div>
    </div>
  );
};

export default BookingModal;
