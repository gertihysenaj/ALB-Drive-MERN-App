const carController = require('../controllers/car.controller');
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });
const {verifyAdmin} = require('../middleware/isAdmin.js');


module.exports = app => {
app.post('/api/cars', verifyAdmin, upload.single('image'), carController.createCar);
app.get('/api/cars', carController.getAllCars);
app.put('/api/cars/:id', verifyAdmin, upload.single('image'), carController.updateCar);
app.delete('/api/cars/:id', verifyAdmin, carController.deleteCar);
app.get('/api/cars/:id', carController.getCarById);


};
