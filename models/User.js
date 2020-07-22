const mongoose = require("mongoose");

const UserSchema = mongoose.Schema(
    {
        username: {
            type: String,
            required: true,
            unique: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
        },
        password: {
            type: String,
            required: true,
        },
        image: String,
        age: String,
        gender: String,
        bio: String,
        location: String,
        website: String,
        posts: [{ type: mongoose.Schema.Types.ObjectId, ref: "Post" }],
        following: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
        followers: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
        likes: [{ type: mongoose.Schema.Types.ObjectId, ref: "Post" }],
        dislikes: [{ type: mongoose.Schema.Types.ObjectId, ref: "Post" }],
    },
    { timestamps: true }
);

module.exports = mongoose.model("User", UserSchema);
