const mongoose = require('mongoose');

const carSchema = new mongoose.Schema({
  name: { type: String, required: true },
  img: { type: String, required: true },
  price: { type: Number, required: true },
  model: { type: String, required: true },
  mark: { type: String, required: true },
  year: { type: Number, required: true },
  doors: { type: String, required: true },
  air: { type: Boolean, required: true },
  transmission: { type: String, required: true },
  fuel: { type: String, required: true },
  rating: { type: Number, required: true, min: 0, max: 5 }
});

module.exports = mongoose.model('Car', carSchema);


