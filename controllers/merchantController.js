const Restaurant = require('../models/Restaurant');

exports.getNearbyRestaurants = async (req, res) => {
    try {
        const { lng, lat, maxDistanceInMeters, cuisineType } = req.query;
        if (!lng || !lat) return res.status(400).json({ msg: 'Coordinates (lng, lat) are required.' });

        const matchStage = {};
        if (cuisineType) {
            matchStage.cuisineType = { $regex: cuisineType, $options: 'i' };
        }

        // MongoDB Aggregation Pipeline optimizing 2dsphere index lookup
        const restaurants = await Restaurant.aggregate([
            {
                $geoNear: {
                    near: { type: "Point", coordinates: [parseFloat(lng), parseFloat(lat)] },
                    distanceField: "distanceInMeters",
                    maxDistance: parseInt(maxDistanceInMeters) || 5000, // Default 5km radius
                    spherical: true
                }
            },
            { $match: matchStage },
            { $sort: { distanceInMeters: 1, rating: -1 } }
        ]);

        res.json(restaurants);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.createRestaurant = async (req, res) => {
    try {
        const { name, cuisineType, coordinates, menu } = req.body;
        const newMerchant = new Restaurant({
            name,
            cuisineType,
            location: { type: 'Point', coordinates },
            menu
        });
        await newMerchant.save();
        res.status(201).json(newMerchant);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};