const User = require("../models/User");

exports.users = async (req, res) => {
    try {
        const users = await User.find().sort({ createdAt: -1 });

        res.json(users);
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server error");
    }
};
