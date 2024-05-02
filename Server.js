// Needed imports
const express = require("express")
const app = express()
const mongoose = require('mongoose')
const dotenv = require("dotenv").config()

// Connect to Database
mongoose.connect(process.env.DATABASE).then(() => console.log("Connected to MongoDb")).catch(err => console.log(err))

// Routes
const authRoute = require('./routes/Auth')

// Middlewares
app.use(express.json())
app.use("/api/user", authRoute) // Route Middleware

app.listen(3000, () => console.log("Server is on...")) // Listening at port 3000