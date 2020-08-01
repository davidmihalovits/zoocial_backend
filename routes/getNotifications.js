const Notification = require("../models/Notification");
const User = require("../models/User");

exports.getNotifications = async (req, res) => {
    try {
        const user = await User.findById(req.user.id);
        const notification = await Notification.find({
            recipient: user._id,
        }).populate("sender");

        res.json(notification);
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server error");
    }
};
