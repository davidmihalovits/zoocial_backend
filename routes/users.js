const User = require("../models/User");

exports.users = async (req, res) => {
    try {
        /*const pagination = req.query.pagination
            ? parseInt(req.query.pagination)
            : 4;

        const page = req.query.page ? parseInt(req.query.page) : 1;

        const users = await User.find()
            .skip((page - 1) * pagination)
            .limit(pagination)
            .sort({ createdAt: -1 });*/

        const users = await User.find().sort({ createdAt: -1 });

        res.json(users);
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server error");
    }
};
