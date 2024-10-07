// server.js
const express = require("express");
const bodyParser = require("body-parser");
const db = require('./db'); // Import the database connection
const Person = require('./Models/Person'); // Import the Person model
const Menu = require('./Models/Menu'); // Import the Menu model
const Task = require('./Models/Task'); // Import the Task model
const app = express();
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

app.use(bodyParser.json());

//Middle Ware Function
const logRequest = (req,res,next)=>{
    console.log(`[${new Date().toLocaleString()} Request made to ${req.url}]`);
    next();
}



// Home route
app.get("/task",async (req, res) => {
    try {
        const data = await Task.find();
        console.log("Task data fetched successfully");
        res.status(200).send(data);
    } catch (err) {
        console.error(err);
        res.status(500).json({ err: "Internal Server Error" });
    }
})
app.post("/task", async (req, res) => {
    try {
        const newTask = new Task(req.body);
        const response = await newTask.save();
        console.log("Task data saved successfully");
        res.status(201).send(response);
    } catch (err) {
        console.error(err);
        res.status(500).json({ err: "Internal Server Error" });
    }
})

app.use(logRequest);
app.get("/", async (req, res) => {
    res.send("Hello World!");
});

// POST route for Person


// POST route for Menu

const personRoutes = require('./routes/personRoutes');
app.use('/person', personRoutes);
const menuRoutes = require('./routes/menuRoutes');
const router = require("./routes/personRoutes");
const { log } = require("console");
app.use('/menu', menuRoutes);
// Start the server
app.listen(3000, () => {
    console.log("Server started on port 3000");
});
