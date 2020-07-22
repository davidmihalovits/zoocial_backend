const Post = require("../models/Post");
const User = require("../models/User");

exports.getMyPosts = async (req, res) => {
    try {
        const user = await User.findById(req.user.id);

        let posts = await Post.find({ by: user._id });

        return res.json(posts);
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server error");
    }
};
