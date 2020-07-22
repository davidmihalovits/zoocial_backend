const Post = require("../models/Post");
const User = require("../models/User");

exports.feed = async (req, res) => {
    try {
        let user = await User.findById(req.user.id);

        let feed = await Post.find({
            $or: [{ by: { $in: user.following } }, { by: user._id }],
        }).populate("by");

        return res.json(feed);
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server error");
    }
};
