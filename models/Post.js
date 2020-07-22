const mongoose = require("mongoose");

const PostSchema = mongoose.Schema(
    {
        post: String,
        likes: 0,
        dislikes: 0,
        commentCount: 0,
        likedBy: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
        dislikedBy: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
        by: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    },
    { timestamps: true }
);

module.exports = mongoose.model("Post", PostSchema);
