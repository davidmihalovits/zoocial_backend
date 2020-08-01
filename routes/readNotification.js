const Notification = require("../models/Notification");
const User = require("../models/User");

exports.readNotification = async (req, res) => {
    try {
        const user = await User.findById(req.user.id);

        await Notification.updateMany(
            {
                recipient: user._id,
            },
            {
                read: true,
            }
        );

        let notifications = await Notification.find({
            recipient: user._id,
        });

        return res.json(notifications);
    } catch (err) {
        console.error(err.message);
        res.status(500).send("server error");
    }
};
