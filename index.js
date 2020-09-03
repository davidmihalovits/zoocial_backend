const express = require("express");
const mongoDB = require("./config/db");
const cors = require("cors");
const auth = require("./auth");
const bodyParser = require("body-parser");
const http = require("http");
const { signup } = require("./routes/signup");
const { login } = require("./routes/login");
const { profile } = require("./routes/profile");
const { users } = require("./routes/users");
const { getAnotherUser } = require("./routes/getAnotherUser");
const { getAnotherUserPosts } = require("./routes/getAnotherUserPosts");
const { postPost } = require("./routes/postPost");
const { deletePost } = require("./routes/deletePost");
const { getMyPosts } = require("./routes/getMyPosts");
const { getAnotherPost } = require("./routes/getAnotherPost");
const { likePost } = require("./routes/likePost");
const { dislikePost } = require("./routes/dislikePost");
const { updateProfile } = require("./routes/updateProfile");
const { follow } = require("./routes/follow");
const { feed } = require("./routes/feed");
const { comment } = require("./routes/comment");
const { getComments } = require("./routes/getComments");
const { search } = require("./routes/search");
const { getNotifications } = require("./routes/getNotifications");
const { readNotification } = require("./routes/readNotification");

const app = express();
const server = http.createServer(app);
mongoDB();
const io = require("socket.io")(server);

app.use(cors());
app.use(express.json({ extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.post("/signup", signup);
app.post("/login", login);
app.post("/postPost", auth, postPost);
app.post("/comment/:id", auth, comment);
app.post("/search", auth, search);
app.get("/profile", auth, profile);
app.get("/users", auth, users);
app.get("/getAnotherUser/user/:id", auth, getAnotherUser);
app.get("/getAnotherUserPosts/:id", auth, getAnotherUserPosts);
app.get("/getMyPosts", auth, getMyPosts);
app.get("/getAnotherPost/:id", auth, getAnotherPost);
app.get("/feed", auth, feed);
app.get("/getNotifications", auth, getNotifications);
app.get("/getComments/:id", auth, getComments);
app.put("/likePost/:id", auth, likePost);
app.put("/dislikePost/:id", auth, dislikePost);
app.put("/updateProfile", auth, updateProfile);
app.put("/follow/:id", auth, follow);
app.put("/readNotification", auth, readNotification);
app.delete("/deletePost/:id", auth, deletePost);

const socketUsers = {};
io.on("connection", (socket) => {
    socket.on("user", (user) => {
        const aUser = { socket: socket, user: user };
        socketUsers[socket.id] = aUser;
    });

    socket.on("disconnect", () => {
        delete socketUsers[socket.id];
    });

    socket.on("like", async (id) => {
        let recipients = Object.values(socketUsers).map((u) => u);

        let recipient = await recipients.find(
            (u) => u.user._id == id.anotherUser.by._id
        );

        if (!recipient) {
            return;
        }

        if (recipient.user._id === id.anotherUser.by._id) {
            recipient.socket.emit("notification");
        }
    });

    socket.on("dislike", async (id) => {
        let recipients = Object.values(socketUsers).map((u) => u);

        let recipient = await recipients.find(
            (u) => u.user._id == id.anotherUser.by._id
        );

        if (!recipient) {
            return;
        }

        if (recipient.user._id === id.anotherUser.by._id) {
            recipient.socket.emit("notification");
        }
    });

    socket.on("comment", async (id) => {
        let recipients = Object.values(socketUsers).map((u) => u);

        let recipient = await recipients.find(
            (u) => u.user._id == id.anotherUser._id
        );

        if (!recipient) {
            return;
        }

        if (recipient.user._id !== id.user._id) {
            recipient.socket.emit("notification");
        }
    });

    socket.on("follow", async (id) => {
        let recipients = Object.values(socketUsers).map((u) => u);

        let recipient = await recipients.find(
            (u) => u.user._id == id.anotherUser._id
        );

        let followers = await id.anotherUser.followers.map((a) => a._id);

        if (!recipient) {
            return;
        }

        if (!followers.includes(id.user._id)) {
            recipient.socket.emit("notification");
        }
    });
});

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => console.log(`Server started on port ${PORT}.`));
