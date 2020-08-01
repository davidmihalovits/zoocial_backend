const User = require("../models/User");
const Post = require("../models/Post");

exports.search = async (req, res) => {
    try {
        const { search } = req.body;

        if (!search) {
            return res.json({ status: "Enter some text." });
        }

        let searchUser = await User.find({
            username: { $regex: search, $options: "i" },
        }).select("username image createdAt");

        let searchPost = await Post.find({
            post: { $regex: search, $options: "i" },
        })
            .populate("by")
            .select("post createdAt");

        return res.json({
            users: searchUser,
            posts: searchPost,
        });
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server error.");
    }
};
