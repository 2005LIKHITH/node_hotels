// db.js
const mongoose = require('mongoose');

const mongoURL = 'mongodb://localhost:27017/hotels';
mongoose.connect(mongoURL, { useNewUrlParser: true, useUnifiedTopology: true });

const db = mongoose.connection;

db.on('connected', () => {
    console.log("Connected to MongoDB server");
});

db.on('error', (error) => {
    console.error("Could not connect to MongoDB server:", error);
});

db.on('disconnected', () => {
    console.log("Disconnected from MongoDB server");
});

module.exports = db; // Export the connection
