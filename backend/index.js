const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const app = express();
const pinRoute = require("./routes/pins");
const userRoute = require("./routes/users");
const bcrypt = require('bcrypt'); // Make sure to import bcrypt

dotenv.config();

app.use(express.json());

mongoose.connect(
    process.env.MONGO_URL, {
        useNewUrlParser: true, 
        useUnifiedTopology: true,
    })
    .then(() => {
        console.log("MongoDB connected");
    })
    .catch(err => {
        console.error("Error connecting to MongoDB:", err);
    });

app.use("/api/pins/", pinRoute);
app.use("/api/users/", userRoute);

app.listen(8000, () => {
    console.log("1derer backend server is running");
});
