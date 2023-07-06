import React from 'react';
import CreateCar from '../components/CreateCar';
import HeroPages from "../components/HeroPages";

function CarForm() {
  return (
    <div>
      <HeroPages name="Add a new Car" />
      <div className="container mt-5">
        <CreateCar />
      </div>
    </div>
  );
}

export default CarForm;

