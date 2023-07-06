import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


function CreateCar() {

    const [carData, setCarData] = useState({
        name: '',
        img: '',
        price: '',
        model: '',
        mark: '',
        year: '',
        doors: '2/3',
        air: 'Yes',
        transmission: '',
        fuel: '',
        rating: ''
    });

    const [selectedFile, setSelectedFile] = useState(null);
    const navigate = useNavigate();


    const handleChange = (event) => {
        let value = event.target.value;

        if(event.target.name === 'air') {
            value = value === 'Yes' ? true : false;
        }
        if(event.target.name === 'doors') {
            value = value === '2/3' ? "2/3" : "4/5";
        }
        if(event.target.name === 'rating') {
          value = value ? Number(value) : '';
        }
      
        setCarData({
            ...carData,
            [event.target.name]: value
        });
    };

    const handleImageChange = (event) => {
      setSelectedFile(event.target.files[0]);
  };

    const handleSubmit = (event) => {
      event.preventDefault();
      const formData = new FormData();
      Object.keys(carData).forEach(key => formData.append(key, carData[key]));
      if (selectedFile) {
          formData.append('image', selectedFile);
      }
      axios.post('http://localhost:8000/api/cars', formData,{ withCredentials: true })
          .then(res => {
            navigate(`/models`);
        })
          
          .catch(err => console.error(err));
  };


  

  return (
    <div className="createCar__container">
      <form className="createCar__form" onSubmit={handleSubmit}>
        <h2 className="createCar__title">Add New Car</h2>
        {carData.img && <img className="createCar__preview-image" src={carData.img} alt="Car Preview" />}
        <label>Name</label>
        <input className="createCar__form-control" type="text" name="name" value={carData.name} onChange={handleChange} />
        <label>Image</label>
        <input className="createCar__form-control" type="file" name="img" onChange={handleImageChange} />
        <label>Price</label>
        <input className="createCar__form-control" type="number" name="price" value={carData.price} onChange={handleChange} />
        <label>Model</label>
        <input className="createCar__form-control" type="text" name="model" value={carData.model} onChange={handleChange} />
        <label>Mark</label>
        <input className="createCar__form-control" type="text" name="mark" value={carData.mark} onChange={handleChange} />
        <label>Year</label>
        <input className="createCar__form-control" type="number" name="year" value={carData.year} onChange={handleChange} />
        <label>Doors</label>
        <select className="createCar__form-control" name="doors" value={carData.doors} onChange={handleChange}>
          <option value="2/3">2/3</option>
          <option value="4/5">4/5</option>
        </select>
        <label>AC</label>
        <select className="createCar__form-control" name="air" value={carData.air} onChange={handleChange}>
          <option value="true">Yes</option>
          <option value="false">No</option>
        </select>
        <label>Transmission</label>
        <select className="createCar__form-control" name="transmission" value={carData.transmission} onChange={handleChange}>
          <option value="">Select Transmission</option>
          <option value="Automatic">Automatic</option>
          <option value="Manual">Manual</option>
        </select>
        <label>Fuel Type</label>
        <select className="createCar__form-control" name="fuel" value={carData.fuel} onChange={handleChange}>
          <option value="">Select Fuel Type</option>
          <option value="Gasoline">Gasoline</option>
          <option value="Diesel">Diesel</option>
          <option value="Electric">Electric</option>
          <option value="Hybrid">Hybrid</option>
        </select>
        <label>Rating</label>
        <select className="createCar__form-control" name="rating" value={carData.rating} onChange={handleChange}>
          <option value="">Select a Rating</option>
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
        </select>
        <button className="createCar__btn-submit" type="submit">Add Car</button>
      </form>
    </div>
  );
}

export default CreateCar;
