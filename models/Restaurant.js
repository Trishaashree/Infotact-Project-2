const mongoose = require('mongoose');

const MenuItemSchema = new mongoose.Schema({
    name: { type: String, required: true },
    price: { type: Number, required: true },
    description: { type: String },
    isAvailable: { type: Boolean, default: true }
});

const RestaurantSchema = new mongoose.Schema({
    name: { type: String, required: true },
    cuisineType: { type: String, required: true },
    rating: { type: Number, default: 4.0 },
    // Critical GeoJSON Format for 2dsphere indexing
    location: {
        type: { type: String, enum: ['Point'], required: true },
        coordinates: { type: [Number], required: true } // [Longitude, Latitude]
    },
    menu: [MenuItemSchema]
});

// Create the 2dsphere spatial index for geospatial pipelines
RestaurantSchema.index({ location: "2dsphere" });

module.exports = mongoose.model('Restaurant', RestaurantSchema);