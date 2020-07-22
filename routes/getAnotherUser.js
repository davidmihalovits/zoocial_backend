const User = require("../models/User");

exports.getAnotherUser = async (req, res) => {
    try {
        const user = await User.findById(req.params.id).populate(
            "following followers posts"
        );

        res.json(user);
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server error");
    }
};
