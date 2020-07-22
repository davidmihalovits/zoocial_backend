const User = require("../models/User");

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

        return res.json(au);
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Server error");
    }
};
