// Needed imports
const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv").config();

// Connect to Database
mongoose
	.connect(process.env.DATABASE)
	.then(() => console.log("Connected to MongoDb"))
	.catch(err => console.log(err));

// Create Express app
const app = express();

// Middlewares
app.use(express.json());

// Routes
const authRoute = require("./routes/Auth");
const postsRoute = require("./routes/AuthTestRoute");
app.use("/api/user", authRoute);
app.use("/api/posts", postsRoute);

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
