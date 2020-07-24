const mongoose = require("mongoose");

const CommentSchema = mongoose.Schema(
    {
        comment: String,
        for: { type: mongoose.Schema.Types.ObjectId, ref: "Post" },
        by: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    },
    { timestamps: true }
);

module.exports = mongoose.model("Comment", CommentSchema);
