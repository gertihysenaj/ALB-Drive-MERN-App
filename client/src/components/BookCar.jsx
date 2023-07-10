import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from 'react-router-dom';
import jwtDecode from 'jwt-decode';
import Cookies from 'js-cookie';
import BookingForm from "./BookingForm";
import BookingModal from "./BookingModal";

const BookCar = () => {
  const [modal, setModal] = useState(false);
  const [selectedCar, setSelectedCar] = useState(null);
  const [clientSecret, setClientSecret] = useState(null);
  const [carType, setCarType] = useState("");
  const [pickUp, setPickUp] = useState("");
  const [dropOff, setDropOff] = useState("");
  const [pickTime, setPickTime] = useState("");
  const [dropTime, setDropTime] = useState("");
  const [name, setName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [age, setAge] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [zipcode, setZipCode] = useState("");
  const [user, setUser] = useState(null);


  const { carID } = useParams();
  // console.log(carID);

  useEffect(() => {
    axios.get(`http://localhost:8000/api/cars/${carID}`, { withCredentials: true })
      .then((res) => {
        setSelectedCar(res.data.data);
        setCarType(res.data.data.mark + " " + res.data.data.model);
      })
      .catch((err) => console.error(err));
  }, [carID]);
  

  useEffect(() => {
    const fetchUser = async () => {
      try {
        // Call to the new endpoint that verifies the token and returns the user data.
        const response = await axios.get('http://localhost:8000/api/verify', {
          withCredentials: true,
        });
  
        // Check if the response includes user data.
        if (response.data.isLoggedIn) {
          console.log(response.data.user)
          const user = response.data.user;
          setUser(user);
          setName(user.firstName);
          setLastName(user.lastName);
          setEmail(user.email);
        }
      } catch (err) {
        console.error(err);
      }
    }
  
    fetchUser();
  }, []);
  
  

  const openModal = (e) => {
    e.preventDefault();
    const errorMsg = document.querySelector(".error-message");
    if (
      pickUp === "" ||
      dropOff === "" ||
      pickTime === "" ||
      dropTime === "" ||
      carType === ""
    ) {
      errorMsg.style.display = "flex";
    } else {
      setModal(!modal);
      const modalDiv = document.querySelector(".booking-modal");
      modalDiv && modalDiv.scroll(0, 0);
      errorMsg.style.display = "none";
    }
  };

  const hideMessage = () => {
    const doneMsg = document.querySelector(".booking-done");
    doneMsg.style.display = "none";
  };

  const confirmBooking = async (e) => {
    e.preventDefault();
  
    if (!selectedCar || !user) {
      console.log('Selected car or user data is not available. Aborting booking.');
      return;
    }
  
    const totalPrice = selectedCar.price;
  
    const bookingDetails = {
      userId: user.id,
      carId: selectedCar._id,
      totalPrice: totalPrice,
      carType: carType,
      pickUp: pickUp,
      dropOff: dropOff,
      startDate: pickTime,
      endDate: dropTime,
      name: name,
      lastName: lastName,
      phone: phone,
      age: age,
      email: email,
      address: address,
      city: city,
      zipcode: zipcode,
    };
  
    try {
      const response = await axios.post(
        'http://localhost:8000/api/bookings',
        bookingDetails,
        { withCredentials: true }
      );
  
      if (response.data.success) {
        setModal(false);
        const doneMsg = document.querySelector('.booking-done');
        doneMsg.style.display = 'flex';
        setClientSecret(response.data.client_secret);
      } else {
        alert('Booking failed');
      }
    } catch (error) {
      console.error(error);
      alert('An error occurred while confirming the booking');
    }
  };
  

  return (
    <>
      <section id="booking-section" className="book-section">
        <div className={`modal-overlay ${modal ? "active-modal" : ""}`} onClick={openModal}></div>
        <div className="container">
          <div className="book-content">
            <div className="book-content__box">
              <h2>Reservo nje makine</h2>
              <p className="error-message">All fields required! <i className="fa-solid fa-xmark"></i></p>
              <p className="booking-done">Check your email to confirm an order. <i onClick={hideMessage} className="fa-solid fa-xmark"></i></p>
              <BookingForm
                selectedCar={selectedCar}
                carType={carType}
                pickUp={pickUp}
                dropOff={dropOff}
                pickTime={pickTime}
                dropTime={dropTime}
                setCarType={setCarType}
                setPickUp={setPickUp}
                setDropOff={setDropOff}
                setPickTime={setPickTime}
                setDropTime={setDropTime}
                openModal={openModal}
              />
            </div>
          </div>
        </div>
      </section>
      {modal && selectedCar &&(
          // console.log(`Image URL: http://localhost:8000/${selectedCar.img.replace('\\', '/')}`),

        <BookingModal
          carType={carType}
          pickUp={pickUp}
          dropOff={dropOff}
          pickTime={pickTime}
          dropTime={dropTime}
          car={selectedCar}
          img={selectedCar.img ? `http://localhost:8000/${selectedCar.img.replace('\\', '/')}` : ''}
          name={name}
          setName={setName}
          lastName={lastName}
          setLastName={setLastName}
          phone={phone}
          setPhone={setPhone}
          age={age}
          setAge={setAge}
          email={email}
          setEmail={setEmail}
          address={address}
          setAddress={setAddress}
          city={city}
          setCity={setCity}
          zipcode={zipcode}
          setZipCode={setZipCode}
          confirmBooking={confirmBooking}
          clientSecret={clientSecret}
          modal={modal}   
          openModal={openModal}    
        />
      )}
    </>
  );
};

export default BookCar;

