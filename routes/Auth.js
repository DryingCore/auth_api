// Needed imports
// -------------------------------------
const router = require("express").Router();
const User = require("../models/User.js"); // Importing User Schema
const Joi = require("joi")
// -------------------------------------

// Validation Schema
// -----------------------------------------------
const schema = Joi.object({
    name: Joi.string().min(6).required(),
    email: Joi.string().min(6).email().required(),
    password: Joi.string().min(6).required()
});
// -----------------------------------------------


// Routes
// -------------------------------------------------------------
router.post("/register", async (req, res) => {
    // Validate user input
    // -----------------------------------------------------------
    const { error } = schema.validate(req.body);
    if (error) {
        return res.status(400).send(error.details[0].message);
    }
    // -----------------------------------------------------------


    // Create a new User instance
    // -------------------------------
    const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        date: req.body.date
    });
    // -------------------------------


    // Error handling
    // ---------------------------------------
    try {
        // Save the user to the database
        const savedUser = await user.save();
        res.status(200).send("Success");
        console.log(savedUser);
    } catch (error) {
        res.status(400).send(error);
    }
    // ---------------------------------------
});
// -------------------------------------------------------------

module.exports = router;
