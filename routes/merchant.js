const express = require('express');
const router = express.Router();
const merchantController = require('../controllers/merchantController');
const auth = require('../middleware/auth');

router.post('/create', auth, merchantController.createRestaurant);
router.get('/search', merchantController.getNearbyRestaurants);

module.exports = router;