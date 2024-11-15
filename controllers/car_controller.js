const Car = require('../models/car');
const { uploadFile } = require('../utils/s3');

// Create a new car
exports.createCar = async (req, res) => {
    try {
        const { title, description, tags } = req.body;
        const images = [];

        for (const file of req.files) {
            const imageUrl = await uploadFile(file);
            images.push(imageUrl);
        }

        const car = new Car({
            title,
            description,
            tags,
            images,
            user: req.user.id,
        });

        await car.save();
        res.status(201).json({ message: 'Car created successfully', car });
    } catch (err) {
        res.status(400).json({ message: 'Error creating car', error: err.message });
    }
};

// View all cars of the logged-in user
exports.viewCars = async (req, res) => {
    try {
        const cars = await Car.find({ user: req.user.id });
        res.status(200).json(cars);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching cars', error });
    }
};

// View a particular car's details
exports.viewCar = async (req, res) => {
    try {
        const car = await Car.findOne({ _id: req.params.id, user: req.user.id });
        if (!car) return res.status(404).json({ message: 'Car not found' });
        res.status(200).json(car);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching car', error });
    }
};

// Update a car's details
exports.updateCar = async (req, res) => {
    try {
        const updates = { title: req.body.title, description: req.body.description, tags: req.body.tags };
        if (req.files) {
            updates.images = req.files.map(file => file.path);
        }

        const car = await Car.findOneAndUpdate(
            { _id: req.params.id, user: req.user.id },
            updates,
            { new: true }
        );

        if (!car) return res.status(404).json({ message: 'Car not found' });
        res.status(200).json({ message: 'Car updated successfully', car });
    } catch (error) {
        res.status(500).json({ message: 'Error updating car', error });
    }
};

// Delete a car
const { deleteFile } = require('../utils/s3');

exports.deleteCar = async (req, res) => {
    try {
        const car = await Car.findById(req.params.id);

        if (!car) return res.status(404).json({ message: 'Car not found' });

        // Delete images from S3
        for (const imageUrl of car.images) {
            const fileKey = imageUrl.split('.com/')[1];
            await deleteFile(fileKey);
        }

        await car.remove();
        res.status(200).json({ message: 'Car deleted successfully' });
    } catch (err) {
        res.status(400).json({ message: 'Error deleting car', error: err.message });
    }
};

// Search for cars by title, description, or tags
exports.searchCars = async (req, res) => {
    const { keyword } = req.query;
    try {
        const cars = await Car.find({
            user: req.user.id,
            $or: [
                { title: { $regex: keyword, $options: 'i' } },
                { description: { $regex: keyword, $options: 'i' } },
                { 'tags.car_type': { $regex: keyword, $options: 'i' } },
                { 'tags.company': { $regex: keyword, $options: 'i' } },
                { 'tags.dealer': { $regex: keyword, $options: 'i' } },
            ]
        });
        res.status(200).json(cars);
    } catch (error) {
        res.status(500).json({ message: 'Error searching cars', error });
    }
};
