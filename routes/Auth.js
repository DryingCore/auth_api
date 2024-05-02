// Needed imports
const router = require("express").Router();
const User = require("../models/User.js"); // Importing User Schema
const bcrypt = require("bcryptjs")
const { registerValidation } = require("../utils/Validation.js")

// Routes
router.post("/register", async (req, res) => {
    // Validating user input
    const { error } = registerValidation(req.body) // Passing the req.body as a parameter to our function
    if (error) return res.status(400).send(error.details[0].message); // Returning error if has one

    // Checking if the user is already in the database
    const emailExist = await User.findOne({ email: req.body.email })
    if (emailExist) return res.status(400).send("The email already exist... try login")

    // Password Hashing
    const salt = await bcrypt.genSalt()
    const hashPassword = await bcrypt.hash(req.body.password, salt)

    // Create a new User instance with name, email, password and date (all we define at User model)
    const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: hashPassword
    });

    // Error handling
    try {
        const savedUser = await user.save(); // Save the user to the database
        res.status(200).send("Saved new user..."); // Feedback
        console.log(savedUser); // Log the saved user
    } catch (error) {
        res.status(400).send(error);
        console.log(error)
    }
});

module.exports = router;
