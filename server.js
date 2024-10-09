// server.js
const express = require("express");
const bodyParser = require("body-parser");
const db = require('./db'); // Import the database connection

const passport = require('./auth');


const app = express();

app.use(bodyParser.json());

// Middleware Function to log requests
const logRequest = (req, res, next) => {
    console.log(`[${new Date().toLocaleString()}] Request made to ${req.url}`);
    next();
};

app.use(logRequest);

// Passport configuration


app.use(passport.initialize());


const localAuthMiddleware = passport.authenticate('local', { session: false });
app.get("/",  async (req, res) => {
    res.send("Hello World!");
});

// Use your existing routes
const personRoutes = require('./routes/personRoutes');
app.use('/person' ,localAuthMiddleware,personRoutes);

const menuRoutes = require('./routes/menuRoutes');
app.use('/menu',localAuthMiddleware, menuRoutes);

// Start the server
app.listen(3000, () => {
    console.log("Server started on port 3000");
});
