const Car = require('../models/car.model');

// Create a new car
exports.createCar = async (req, res) => {
    try {
        
        // File handling
        if (req.file) {
            // Here you would typically upload the file to your storage service and get the URL
            // For this example, we're just using the local path
            req.body.img = req.file.path;
        }


        if (req.body.air === 'Yes' || req.body.air === 'yes') {
            req.body.air = true;
        } else if (req.body.air === 'No' || req.body.air === 'no') {
            req.body.air = false;
        }

        const car = new Car(req.body);
        await car.save();
        res.status(201).json({
            success: true,
            data: car
        });
    } catch (err) {
        console.error(err); 
        res.status(400).json({
            success: false,
            error: err.message
        });
    }
};

// Get all cars
exports.getAllCars = async (req, res) => {
    try {
        const cars = await Car.find({});
        res.status(200).json({
            success: true,
            data: cars
        });
    } catch (err) {
        res.status(400).json({
            success: false,
            error: err.message
        });
    }
};

// Get Car by id

exports.getCarById = async (req, res) => {
    try {
        const car = await Car.findById(req.params.id);
        if (!car) {
            return res.status(404).json({
                success: false,
                error: 'Car not found'
            });
        }
        res.status(200).json({
            success: true,
            data: car
        });
    } catch (err) {
        res.status(400).json({
            success: false,
            error: err.message
        });
    }
};

// Update a car by id
exports.updateCar = async (req, res) => {
    try {

        // File handling
        if (req.file) {
            // Update the img field if a new file is uploaded
            req.body.img = req.file.path;
        }

        let car = await Car.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });

        if (!car) {
            return res.status(404).json({
                success: false,
                error: 'Car not found'
            });
        }

        // Find the updated car again
        car = await Car.findById(req.params.id);

        res.status(200).json({
            success: true,
            data: car
        });
    } catch (err) {
        console.error(err);
        res.status(400).json({
            success: false,
            error: err.toString()
        });
    }
};

// Delete a car by id
exports.deleteCar = async (req, res) => {
    try {
        const car = await Car.findByIdAndDelete(req.params.id);
        if (!car) {
            return res.status(404).json({
                success: false,
                error: 'Car not found'
            });
        }
        res.status(200).json({
            success: true,
            data: {}
        });
    } catch (err) {
        res.status(400).json({
            success: false,
            error: err.message
        });
    }
};

