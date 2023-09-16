const router = require("express").Router();
const User = require("../models/user");
const bcrypt = require('bcrypt');
 
// Register a new user
router.post("/register", async (req, res) => {
    try {
        // Generate a new password hash
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(req.body.password, salt);

        // Create a new user
        const newUser = new User({
            username: req.body.username,
            email: req.body.email,
            password: hashedPassword,
        });

        // Save the user and send a response
        const user = await newUser.save();
        res.status(200).json(user._id);

    } catch (err) {
        res.status(500).json(err);
    }
});






//Login

router.post("/login", async (req, res) => {
    try {
        // Find user
        const user = await User.findOne({ username: req.body.username });

        // If user doesn't exist, return an error
        if (!user) {
            return res.status(400).json("Wrong username or password");
        }

        // Validate password
        const validPassword = await bcrypt.compare(req.body.password, user.password);

        // If password is invalid, return an error
        if (!validPassword) {
            return res.status(400).json("Wrong username or password");
        }

        // Send response
        res.status(200).json({ _id: user._id, username: user.username });

    } catch (err) {
        res.status(500).json(err);
    }
});









module.exports = router