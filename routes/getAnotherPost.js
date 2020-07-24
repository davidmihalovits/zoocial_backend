const Post = require("../models/Post");

exports.getAnotherPost = async (req, res) => {
    try {
        const post = await Post.findById(req.params.id).populate(" by");

        res.json(post);
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server error");
    }
};
