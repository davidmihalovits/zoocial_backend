const User = require("../models/User");
const Post = require("../models/Post");

exports.postPost = async (req, res) => {
    try {
        let user = await User.findById(req.user.id);

        let newPost = new Post({
            post: req.body.post,
            by: user._id,
            likes: 0,
            dislikes: 0,
        });

        await newPost
            .save()
            .then((newPost) => newPost.populate("by").execPopulate());

        await user.updateOne({ $push: { posts: newPost._id } });

        let u = await User.findById(req.user.id).populate(
            "posts followers following"
        );

        let p = newPost;

        return res.json(p);
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server error");
    }
};
