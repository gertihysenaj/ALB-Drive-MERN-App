import { useState, useEffect } from "react";
import CarBox from "./CarBox";
import axios from 'axios';

function PickCar() {
  const [active, setActive] = useState("");
  const [colorBtn, setColorBtn] = useState("");
  const [cars, setCars] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:8000/api/cars', { withCredentials: true })
      .then(res => {
        setCars(res.data.data);
      })
      .catch(err => console.error(err));
  }, []);

  const btnID = (id) => {
    setColorBtn(colorBtn === id ? "" : id);
  };

  const coloringButton = (id) => {
    return colorBtn === id ? "colored-button" : "";
  };

  const handleCarSelection = (carID) => {
    setActive(carID);
    btnID(`btn${carID}`);
  };

  useEffect(() => {
    if (cars.length > 0) {
      const firstCarID = cars[0]._id;
      setActive(firstCarID);
      setColorBtn(`btn${firstCarID}`);
    }
  }, [cars]);

  return (
    <>
      <section className="pick-section">
        <div className="container">
          <div className="pick-container">
            <div className="pick-container__title">
              <h3>Modelet e automjeteve</h3>
              <h2>Makinat tona me qira</h2>
              <p>
                Zgjidhni nga një shumëllojshmëri e automjeteve tona të mahnitshme për t'u marrë me qira për ju
                aventura ose udhëtimi i ardhshëm i biznesit
              </p>
            </div>
            <div className="pick-container__car-content">
              <div className="pick-box">
                {cars.map((car) => (
                  <button
                    key={car._id}
                    className={`${coloringButton(`btn${car._id}`)}`}
                    onClick={() => handleCarSelection(car._id)}
                  >
                    {car.name}
                  </button>
                ))}
              </div>
              {active && <CarBox carID={active} />}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default PickCar;


