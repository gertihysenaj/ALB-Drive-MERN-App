import React from 'react';
import BookCar from '../components/BookCar';
import HeroPages from "../components/HeroPages";
import { useParams } from 'react-router-dom';


function BookCarPage() {
  const { carID } = useParams();
  
  return (
    <div>
      <HeroPages name="Book a Car" />
      <div className="container mt-5">
        <BookCar carID={carID} />
      </div>
    </div>
  );
}

export default BookCarPage;