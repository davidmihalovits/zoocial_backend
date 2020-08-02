const User = require("../models/User");
const Post = require("../models/Post");
const Comment = require("../models/Comment");
const Notification = require("../models/Notification");

exports.comment = async (req, res) => {
    try {
        let user = await User.findById(req.user.id);
        let post = await Post.findById(req.params.id);

        let newComment = new Comment({
            comment: req.body.comment,
            for: post._id,
            by: user._id,
        });

        await newComment
            .save()
            .then((newComment) => newComment.populate("by").execPopulate());

        await post.updateOne({ $inc: { commentCount: +1 } });

        if (JSON.stringify(user._id) === JSON.stringify(post.by._id)) {
            return res.json(newComment);
        } else {
            let newNotification = new Notification({
                notification: `${user.username} commented on your post!`,
                sender: user._id,
                recipient: post.by._id,
                read: false,
                post: post,
            });
            await newNotification.save();
            return res.json(newComment);
        }
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server error");
    }
};
