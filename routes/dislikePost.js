const User = require("../models/User");
const Post = require("../models/Post");

exports.dislikePost = async (req, res) => {
    try {
        let user = await User.findById(req.user.id);
        let post = await Post.findById(req.params.id);

        if (post.likedBy.includes(user._id)) {
            await post.updateOne({ $inc: { likes: -1 } });
            await post.updateOne({ $pull: { likedBy: user._id } });
            await user.updateOne({ $pull: { likes: post._id } });
        }

        if (post.dislikedBy.includes(user._id)) {
            await post.updateOne({ $inc: { dislikes: -1 } });
            await post.updateOne({ $pull: { dislikedBy: user._id } });
            await user.updateOne({ $pull: { dislikes: post._id } });

            /*let u = await User.findById(req.user.id).populate(
                "posts followers following"
            );*/

            let p = await Post.findById(req.params.id).populate("by");

            return res.json(p);
        }

        await post.updateOne({ $inc: { dislikes: +1 } });
        await post.updateOne({ $push: { dislikedBy: user._id } });
        await user.updateOne({ $push: { dislikes: post._id } });

        /*let u = await User.findById(req.user.id).populate(
            "posts followers following"
        );*/

        let p = await Post.findById(req.params.id).populate("by");

        return res.json(p);
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server error");
    }
};
