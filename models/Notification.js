const mongoose = require("mongoose");

const NotificationSchema = mongoose.Schema(
    {
        notification: String,
        sender: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
        recipient: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
        read: false,
        post: { type: mongoose.Schema.Types.ObjectId, ref: "Post" },
    },
    { timestamps: true }
);

module.exports = mongoose.model("Notification", NotificationSchema);
