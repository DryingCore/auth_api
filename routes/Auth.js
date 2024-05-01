// Needed imports
const router = require("express").Router();
const User = require("../models/User.js"); // Importing User Schema
const { registerValidation } = require("../utils/Validation.js")

// Routes
router.post("/register", async (req, res) => {
    // Validating user input
    const { error } = registerValidation(req.body)
    if (error) return res.status(400).send(error.details[0].message);

    // Create a new User instance
    const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        date: req.body.date
    });

    // Error handling
    try {
        const savedUser = await user.save(); // Save the user to the database
        res.status(200).send("Saved new user...");
        console.log(savedUser);
    } catch (error) {
        res.status(400).send(error);
        console.log(error)
    }
});

module.exports = router;
