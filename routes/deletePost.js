const User = require("../models/User");
const Post = require("../models/Post");

exports.deletePost = async (req, res) => {
    try {
        let user = await User.findById(req.user.id);
        let post = await Post.findById(req.params.id);

        let a = post.by;
        let aa = JSON.stringify(a);
        let b = user._id;
        let bb = JSON.stringify(b);

        if (aa === bb) {
            await post.deleteOne({ _id: post._id });
            await user.updateOne({
                $pull: { posts: post._id, likes: post._id, dislikes: post._id },
            });
            await User.updateMany({
                $pull: { likes: post._id, dislikes: post._id },
            });
            let u = await User.findById(req.user.id).populate(
                "posts followers following"
            );

            let p = await Post.find({ by: user._id });

            return res.json(p);
        } else {
            return res.json({ status: "Not authorized to delete this post." });
        }
    } catch (err) {
        console.error(err.message);
        return res.json({ status: "Can't find post." });
    }
};
