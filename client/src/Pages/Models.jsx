import Footer from "../components/Footer";
import HeroPages from "../components/HeroPages";
import { Link } from "react-router-dom";
import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function Models() {
  const [cars, setCars] = useState([]);
  const [isAdmin, setIsAdmin] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get('http://localhost:8000/api/cars',{ withCredentials: true }) 
      .then((res) => {
        setCars(res.data.data);
      })
      .catch((err) => {     
        console.log(err);
      });
  
  axios.get('http://localhost:8000/api/verify',{ withCredentials: true })
      .then((res) => {
        setIsAdmin(res.data.user && res.data.user.isAdmin);
      })
      .catch((err) => {
        console.error(err);
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
        {isAdmin &&<Link to="/create-car" className="add-car-button">Add a car</Link>}
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
                {isAdmin &&<button onClick={() => handleEdit(car._id)}>Edit</button>}
                {isAdmin && <button onClick={() => handleDelete(car._id)}>Delete</button>}
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

























//   return (
//     <>
//       <section className="models-section">
//         <HeroPages name="Vehicle Models" />
//         <Link to="/create-car">Add a car</Link>
//         <div className="container">
//           <div className="models-div">
//             <div className="models-div__box">
//               <div className="models-div__box__img">
//                 <img src={CarImg1} alt="car_img" />
//                 <div className="models-div__box__descr">
//                   <div className="models-div__box__descr__name-price">
//                     <div className="models-div__box__descr__name-price__name">
//                       <p>Audi A1</p>
//                       <span>
//                         <i className="fa-solid fa-star"></i>
//                         <i className="fa-solid fa-star"></i>
//                         <i className="fa-solid fa-star"></i>
//                         <i className="fa-solid fa-star"></i>
//                         <i className="fa-solid fa-star"></i>
//                       </span>
//                     </div>
//                     <div className="models-div__box__descr__name-price__price">
//                       <h4>$45</h4>
//                       <p>ne dite</p>
//                     </div>
//                   </div>
//                   <div className="models-div__box__descr__name-price__details">
//                     <span>
//                       <i className="fa-solid fa-car-side"></i> &nbsp; Audi
//                     </span>
//                     <span style={{ textAlign: "right" }}>
//                       4/5 &nbsp; <i className="fa-solid fa-car-side"></i>
//                     </span>
//                     <span>
//                       <i className="fa-solid fa-car-side"></i> &nbsp; Manual
//                     </span>
//                     <span style={{ textAlign: "right" }}>
//                       Diesel &nbsp; <i className="fa-solid fa-car-side"></i>
//                     </span>
//                   </div>
//                   <div className="models-div__box__descr__name-price__btn">
//                     <Link onClick={() => window.scrollTo(0, 0)} to="/">
//                       Reservo mjetin
//                     </Link>
//                   </div>
//                 </div>
//               </div>
//             </div>

//             <div className="models-div__box">
//               <div className="models-div__box__img">
//                 <img src={CarImg2} alt="car_img" />
//                 <div className="models-div__box__descr">
//                   <div className="models-div__box__descr__name-price">
//                     <div className="models-div__box__descr__name-price__name">
//                       <p>Golf 6</p>
//                       <span>
//                         <i className="fa-solid fa-star"></i>
//                         <i className="fa-solid fa-star"></i>
//                         <i className="fa-solid fa-star"></i>
//                         <i className="fa-solid fa-star"></i>
//                         <i className="fa-solid fa-star"></i>
//                       </span>
//                     </div>
//                     <div className="models-div__box__descr__name-price__price">
//                       <h4>$37</h4>
//                       <p>ne dite</p>
//                     </div>
//                   </div>
//                   <div className="models-div__box__descr__name-price__details">
//                     <span>
//                       <i className="fa-solid fa-car-side"></i> &nbsp; VW
//                     </span>
//                     <span style={{ textAlign: "right" }}>
//                       4/5 &nbsp; <i className="fa-solid fa-car-side"></i>
//                     </span>
//                     <span>
//                       <i className="fa-solid fa-car-side"></i> &nbsp; Manual
//                     </span>
//                     <span style={{ textAlign: "right" }}>
//                       Diesel &nbsp; <i className="fa-solid fa-car-side"></i>
//                     </span>
//                   </div>
//                   <div className="models-div__box__descr__name-price__btn">
//                     <Link onClick={() => window.scrollTo(0, 0)} to="/">
//                     Reservo mjetin
//                     </Link>
//                   </div>
//                 </div>
//               </div>
//             </div>

//             <div className="models-div__box">
//               <div className="models-div__box__img">
//                 <img src={CarImg3} alt="car_img" />
//                 <div className="models-div__box__descr">
//                   <div className="models-div__box__descr__name-price">
//                     <div className="models-div__box__descr__name-price__name">
//                       <p>Toyota</p>
//                       <span>
//                         <i className="fa-solid fa-star"></i>
//                         <i className="fa-solid fa-star"></i>
//                         <i className="fa-solid fa-star"></i>
//                         <i className="fa-solid fa-star"></i>
//                         <i className="fa-solid fa-star"></i>
//                       </span>
//                     </div>
//                     <div className="models-div__box__descr__name-price__price">
//                       <h4>$30</h4>
//                       <p>ne dite</p>
//                     </div>
//                   </div>
//                   <div className="models-div__box__descr__name-price__details">
//                     <span>
//                       <i className="fa-solid fa-car-side"></i> &nbsp; Camry
//                     </span>
//                     <span style={{ textAlign: "right" }}>
//                       4/5 &nbsp; <i className="fa-solid fa-car-side"></i>
//                     </span>
//                     <span>
//                       <i className="fa-solid fa-car-side"></i> &nbsp; Manual
//                     </span>
//                     <span style={{ textAlign: "right" }}>
//                       Diesel &nbsp; <i className="fa-solid fa-car-side"></i>
//                     </span>
//                   </div>
//                   <div className="models-div__box__descr__name-price__btn">
//                     <Link onClick={() => window.scrollTo(0, 0)} to="/">
//                     Reservo mjetin
//                     </Link>
//                   </div>
//                 </div>
//               </div>
//             </div>

//             <div className="models-div__box">
//               <div className="models-div__box__img">
//                 <img src={CarImg4} alt="car_img" />
//                 <div className="models-div__box__descr">
//                   <div className="models-div__box__descr__name-price">
//                     <div className="models-div__box__descr__name-price__name">
//                       <p>BMW 320</p>
//                       <span>
//                         <i className="fa-solid fa-star"></i>
//                         <i className="fa-solid fa-star"></i>
//                         <i className="fa-solid fa-star"></i>
//                         <i className="fa-solid fa-star"></i>
//                         <i className="fa-solid fa-star"></i>
//                       </span>
//                     </div>
//                     <div className="models-div__box__descr__name-price__price">
//                       <h4>$35</h4>
//                       <p>ne dite</p>
//                     </div>
//                   </div>
//                   <div className="models-div__box__descr__name-price__details">
//                     <span>
//                       <i className="fa-solid fa-car-side"></i> &nbsp; ModernLine
//                     </span>
//                     <span style={{ textAlign: "right" }}>
//                       4/5 &nbsp; <i className="fa-solid fa-car-side"></i>
//                     </span>
//                     <span>
//                       <i className="fa-solid fa-car-side"></i> &nbsp; Manual
//                     </span>
//                     <span style={{ textAlign: "right" }}>
//                       Diesel &nbsp; <i className="fa-solid fa-car-side"></i>
//                     </span>
//                   </div>
//                   <div className="models-div__box__descr__name-price__btn">
//                     <Link onClick={() => window.scrollTo(0, 0)} to="/">
//                     Reservo mjetin
//                     </Link>
//                   </div>
//                 </div>
//               </div>
//             </div>

//             <div className="models-div__box">
//               <div className="models-div__box__img">
//                 <img src={CarImg5} alt="car_img" />
//                 <div className="models-div__box__descr">
//                   <div className="models-div__box__descr__name-price">
//                     <div className="models-div__box__descr__name-price__name">
//                       <p>Mercedes</p>
//                       <span>
//                         <i className="fa-solid fa-star"></i>
//                         <i className="fa-solid fa-star"></i>
//                         <i className="fa-solid fa-star"></i>
//                         <i className="fa-solid fa-star"></i>
//                         <i className="fa-solid fa-star"></i>
//                       </span>
//                     </div>
//                     <div className="models-div__box__descr__name-price__price">
//                       <h4>$50</h4>
//                       <p>ne dite</p>
//                     </div>
//                   </div>
//                   <div className="models-div__box__descr__name-price__details">
//                     <span>
//                       <i className="fa-solid fa-car-side"></i> &nbsp; Benz GLK
//                     </span>
//                     <span style={{ textAlign: "right" }}>
//                       4/5 &nbsp; <i className="fa-solid fa-car-side"></i>
//                     </span>
//                     <span>
//                       <i className="fa-solid fa-car-side"></i> &nbsp; Manual
//                     </span>
//                     <span style={{ textAlign: "right" }}>
//                       Diesel &nbsp; <i className="fa-solid fa-car-side"></i>
//                     </span>
//                   </div>
//                   <div className="models-div__box__descr__name-price__btn">
//                     <Link onClick={() => window.scrollTo(0, 0)} to="/">
//                     Reservo mjetin
//                     </Link>
//                   </div>
//                 </div>
//               </div>
//             </div>

//             <div className="models-div__box">
//               <div className="models-div__box__img">
//                 <img src={CarImg6} alt="car_img" />
//                 <div className="models-div__box__descr">
//                   <div className="models-div__box__descr__name-price">
//                     <div className="models-div__box__descr__name-price__name">
//                       <p>VW Passat</p>
//                       <span>
//                         <i className="fa-solid fa-star"></i>
//                         <i className="fa-solid fa-star"></i>
//                         <i className="fa-solid fa-star"></i>
//                         <i className="fa-solid fa-star"></i>
//                         <i className="fa-solid fa-star"></i>
//                       </span>
//                     </div>
//                     <div className="models-div__box__descr__name-price__price">
//                       <h4>$25</h4>
//                       <p>ne dite</p>
//                     </div>
//                   </div>
//                   <div className="models-div__box__descr__name-price__details">
//                     <span>
//                       <i className="fa-solid fa-car-side"></i> &nbsp; CC
//                     </span>
//                     <span style={{ textAlign: "right" }}>
//                       4/5 &nbsp; <i className="fa-solid fa-car-side"></i>
//                     </span>
//                     <span>
//                       <i className="fa-solid fa-car-side"></i> &nbsp; Manual
//                     </span>
//                     <span style={{ textAlign: "right" }}>
//                       Diesel &nbsp; <i className="fa-solid fa-car-side"></i>
//                     </span>
//                   </div>
//                   <div className="models-div__box__descr__name-price__btn">
//                     <Link onClick={() => window.scrollTo(0, 0)} to="/">
//                     Reservo mjetin
//                     </Link>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//         <div className="book-banner">
//           <div className="book-banner__overlay"></div>
//           <div className="container">
//             <div className="text-content">
//               <h2>Rezervoni një makinë duke na kontaktuar</h2>
//               <span>
//                 <i className="fa-solid fa-phone"></i>
//                 <h3>(355) 692-000-009</h3>
//               </span>
//             </div>
//           </div>
//         </div>
//         <Footer />
//       </section>
//     </>
//   );
// }


