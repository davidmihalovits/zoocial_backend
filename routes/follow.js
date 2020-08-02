const User = require("../models/User");
const Notification = require("../models/Notification");

exports.follow = async (req, res) => {
    try {
        let user = await User.findById(req.user.id);
        let followedUser = await User.findById(req.params.id);

        if (user.following.includes(followedUser._id)) {
            await user.updateOne({
                $pull: { following: followedUser._id },
            });
            await followedUser.updateOne({
                $pull: { followers: user._id },
            });

            let au = await User.findById(req.params.id).populate(
                "following followers posts"
            );

            return res.json(au);
        }

        await user.updateOne({ $push: { following: followedUser._id } });
        await followedUser.updateOne({ $push: { followers: user._id } });

        let au = await User.findById(req.params.id).populate(
            "following followers posts"
        );

        let newNotification = new Notification({
            notification: `${user.username} started following you!`,
            sender: user._id,
            recipient: au._id,
            read: false,
            post: null,
        });

        await newNotification.save();

        return res.json(au);
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Server error");
    }
};
