import React from 'react';
import BookCar from '../components/BookCar';
import HeroPages from "../components/HeroPages";

function BookCarPage() {
  return (
    <div>
      <HeroPages name="Book a Car" />
      <div className="container mt-5">
        <BookCar />
      </div>
    </div>
  );
}

export default BookCarPage;