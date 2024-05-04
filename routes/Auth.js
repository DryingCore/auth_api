// Needed imports
const router = require("express").Router();
const User = require("../models/User.js"); // Importing User Schema
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { registerValidation, loginValidation } = require("../utils/Validation.js");

// Register
router.post("/register", async (req, res) => {
	// Validating user input
	const { error } = registerValidation(req.body); // Passing the req.body as a parameter to our function
	if (error) return res.status(400).send(error.details[0].message); // Returning error if has one

	// Checking if the user is already in the database
	const emailExist = await User.findOne({ email: req.body.email });
	if (emailExist) return res.status(400).send("The email already exists... try login");

	// Password Hashing
	const salt = await bcrypt.genSalt();
	const hashPassword = await bcrypt.hash(req.body.password, salt);

	// Create a new User instance with name, email, password, and date (all we define at User model)
	const user = new User({
		name: req.body.name,
		email: req.body.email,
		password: hashPassword,
	});

	// Error handling
	try {
		const savedUser = await user.save(); // Save the user to the database
		res.status(200).send({ user: savedUser._id }); // Feedback
	} catch (error) {
		res.status(400).send(error);
	}
});

// Login
router.post("/login", async (req, res) => {
	const { error } = loginValidation(req.body);
	if (error) return res.status(400).send(error.details[0].message);

	try {
		// Check if the user exists
		const user = await User.findOne({ email: req.body.email });
		if (!user) return res.status(400).send("Email or password is incorrect.");

		// Check if the password is correct
		const passwordMatch = await bcrypt.compare(req.body.password, user.password);
		if (!passwordMatch) return res.status(400).send("Email or password is incorrect.");

		const token = jwt.sign({ _id: user._id }, process.env.TOKEN_SECRET);
		res.header("Auth-Token", token).send(token);
	} catch (err) {
		console.error("Error during login:", err);
		res.status(500).send("Internal Server Error");
	}
});

module.exports = router;
