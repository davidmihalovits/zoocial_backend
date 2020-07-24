const Post = require("../models/Post");
const User = require("../models/User");
const Comment = require("../models/Comment");

exports.getComments = async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);

        let comments = await Comment.find({ for: post._id }).populate("by");

        return res.json(comments);
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server error");
    }
};
