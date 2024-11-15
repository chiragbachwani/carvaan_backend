const express = require('express');
const router = express.Router();
const auth = require('../middlewares/authMiddleware');
const upload = require('../middlewares/uploadMiddleware');
const {
    createCar,
    viewCars,
    viewCar,
    updateCar,
    deleteCar,
    searchCars
} = require('../controllers/car_controller');



// const upload = require('../middleware/multer');



router.post('/', auth, upload.array('images', 10), createCar);       // Create car
router.get('/', auth, viewCars);                                     // View all user's cars
router.get('/search', auth, searchCars);                             // Search user's cars
router.get('/:id', auth, viewCar);                                   // View single car
router.put('/:id', auth, upload.array('images', 10), updateCar);     // Update car
router.delete('/:id', auth, deleteCar);                              // Delete car

module.exports = router;

